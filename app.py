import os
import logging
import requests
from flask import Flask, render_template, request, jsonify
from pathlib import Path
from dotenv import load_dotenv
from google import genai

# 1. 환경변수 절대 경로 로드 (실행 위치와 무관하게 .env를 안정적으로 탐색)
BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=ENV_PATH)

def get_gemini_key():
    key = os.getenv("GEMINI_API_KEY")
    if not key and ENV_PATH.exists():
        load_dotenv(dotenv_path=ENV_PATH, override=True)
        key = os.getenv("GEMINI_API_KEY")
    return key

def get_serper_key():
    key = os.getenv("SERPER_API_KEY")
    if not key and ENV_PATH.exists():
        load_dotenv(dotenv_path=ENV_PATH, override=True)
        key = os.getenv("SERPER_API_KEY")
    return key

# 2. 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

app = Flask(__name__)

def search_web(query):
    """필요시 Serper API를 활용한 실시간 웹 검색"""
    serper_key = get_serper_key()
    if not serper_key:
        logging.warning("SERPER_API_KEY가 설정되지 않아 웹 검색을 건너뜁니다.")
        return ""
    
    try:
        url = "https://google.serper.dev/search"
        headers = {
            "X-API-KEY": serper_key,
            "Content-Type": "application/json"
        }
        payload = {"q": query, "gl": "kr", "hl": "ko"}
        response = requests.post(url, headers=headers, json=payload, timeout=5)
        
        if response.status_code == 200:
            data = response.json()
            snippets = []
            for item in data.get("organic", [])[:3]:
                snippets.append(f"- {item.get('title')}: {item.get('snippet')}")
            return "\n".join(snippets)
        else:
            logging.error(f"Serper API 오류: Status {response.status_code}")
            return ""
    except Exception as e:
        logging.error(f"Serper API 요청 중 예외 발생: {str(e)}")
        return ""

@app.route("/")
def index():
    """메인 페이지 렌더링"""
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    """타로 & 운세 종합 분석 요청 처리"""
    try:
        data = request.get_json() or {}
        
        user_name = data.get("name", "").strip()
        birth_info = data.get("birth_info", "").strip()
        category = data.get("category", "종합 운세 / 사주").strip()
        questions = data.get("questions", [])
        selected_cards = data.get("cards", [])
        tone = data.get("tone", "신비롭고 다정한")
        prompt_type = data.get("prompt_type", "A") # A: 일반, B: 전문가
        use_search = data.get("use_search", False)
        
        logging.info(f"[요청 수신] 사용자: {user_name}, 카테고리: {category}, 질문 개수: {len(questions)}, 카드 개수: {len(selected_cards)}, 검색 사용여부: {use_search}")

        # 백엔드 입력 검증
        if not user_name:
            return jsonify({"error": "이름(닉네임)을 입력해 주세요."}), 400
            
        if not questions or not isinstance(questions, list):
            return jsonify({"error": "최소 1개 이상의 질문을 작성해 주세요."}), 400

        # 질문 개수 제한 (10개 이하)
        if len(questions) > 10:
            return jsonify({"error": "질문은 최대 10개까지만 입력할 수 있습니다."}), 400

        gemini_key = get_gemini_key()
        if not gemini_key:
            return jsonify({"error": "서버에 GEMINI_API_KEY가 설정되지 않았습니다."}), 500

        genai_client = genai.Client(api_key=gemini_key)

        # 선택한 타로 카드 포맷팅 (5장 중 사용자가 직접 선택한 3장의 카드)
        cards_context = ""
        if selected_cards and isinstance(selected_cards, list):
            cards_lines = []
            for c in selected_cards:
                pos = c.get("position", "운명의 카드")
                name = c.get("name", "")
                direction = c.get("direction", "정방향")
                keywords = c.get("keywords", "")
                cards_lines.append(f"- [{pos}] {name} ({direction}) | 상징 키워드: {keywords}")
            cards_context = "\n".join(cards_lines)

        # 웹 검색 필요시 Serper API 수행
        search_context = ""
        if use_search:
            combined_query = f"{category} {user_name} 운세 " + " ".join(questions[:2])
            logging.info(f"[Serper 검색 시작] 쿼리: {combined_query}")
            search_context = search_web(combined_query)

        # 프롬프트 구성
        questions_formatted = "\n".join([f"{idx+1}. {q}" for idx, q in enumerate(questions)])
        
        system_instruction = f"""
당신은 타로 점술과 사주/운세 종합 분석에 뛰어난 지혜로운 운세 마스터입니다.
선택된 운세 테마: [{category}]
답변 톤앤매너: {tone} 말투로 작성하세요.

[핵심 리딩 원칙 및 구성]
1. 사용자가 질문을 던지고, 질문의 기운에 따라 나타난 6장의 카드 중 직관으로 고른 '3장의 운명 카드(1. 과거·원인, 2. 현재·상황, 3. 미래·조언)'를 정밀하게 분석합니다.
2. [★ 엄격한 현실적 균형]: 무조건적인 낙관이나 뜬구름 잡는 위로는 금지합니다.
   - 뽑힌 카드 중 시련, 손실, 이별, 갈등, 배신, 사기, 번아웃, 정체(예: 검 3, 검 5, 검 7, 검 8, 검 9, 검 10, 펜타클 4, 펜타클 5, 펜타클 7, 지팡이 5, 지팡이 9, 지팡이 10 등)나 역방향 카드가 포함되어 있다면, **현실에서 닥칠 수 있는 냉혹한 위기와 장애물, 인간관계의 갈등이나 손실 가능성을 가감 없이 날카롭고 솔직하게 경고**하세요.
   - 단, 절망에 머무르지 않고 '이 위기를 어떻게 방어하고 피해를 최소화할 것인가'에 대한 실질적인 대처 방안과 행동 요령을 명확하게 짚어주세요.
3. [{category}] 테마에 특화된 실질적 조언(시기, 심리적 태도, 행동 요령, 주의해야 할 점)을 포함하세요.
4. 마치 유튜브 유명 타로 마스터나 프라이빗 타로 살롱에서 1:1 심층 상담을 받는 듯한 신뢰감 있고 몰입도 높은 구성을 갖추세요:
   - 🌙 **마스터의 에너지 스캔**: 상담자의 질문과 고민에 흐르는 기운 요약 (빛과 그림자 분석)
   - 🃏 **3장 운명 카드 심층 해설**: (과거/원인 ➔ 현재/상황 ➔ 미래/조언)
   - 🔮 **질문에 대한 솔루션 & 현실적 경고/대처법**
   - 🍀 **행운을 부르는 마스터의 조언**: (주의해야 할 인물/시기, 마음가짐, 행운 팁)
5. 마크다운(Markdown) 서식(소제목, 인용구, 볼드, 이모지)을 정갈하게 적용하세요.
"""

        if prompt_type == "B":
            system_instruction += "\n6. [전문가 모드] 아르카나의 상징학적 심층 의미, 융(Jung) 심리학적 그림자(Shadow) 및 무의식 원형 분석, 그리고 현실적인 액션 플랜을 상세히 포함하세요."

        user_prompt = f"""
[상담자 프로필]
- 이름/닉네임: {user_name}
- 생년월일 및 사주 정보: {birth_info if birth_info else '미입력 (순수 타로 및 질문 중심 리딩)'}
- 운세 테마: {category}

[사용자가 직관으로 선택한 3장의 운명 카드]
{cards_context if cards_context else '카드 정보 없음'}

[사용자의 질문 및 고민]
{questions_formatted}
"""

        if search_context:
            user_prompt += f"\n[실시간 참고 정보 (웹 검색 결과)]\n{search_context}\n"

        logging.info("[Gemini API 호출 시작] 모델: gemini-3.5-flash-lite")
        
        # Gemini 3.5 Flash-Lite 모델 호출
        response = genai_client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=user_prompt,
            config={
                "system_instruction": system_instruction,
                "temperature": 0.7,
            }
        )

        result_text = response.text
        logging.info("[Gemini API 응답 완료]")

        return jsonify({
            "result": result_text,
            "status": "success"
        })

    except Exception as e:
        logging.error(f"[서버 오류 발생] {str(e)}", exc_info=True)
        return jsonify({"error": f"운세를 보는 도중 오류가 발생했습니다: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

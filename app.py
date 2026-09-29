import os
import logging
import requests
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from google import genai

# 1. 환경변수 로드
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY")

# 2. 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

app = Flask(__name__)

# 3. Gemini 클라이언트 초기화
genai_client = None
if GEMINI_API_KEY:
    genai_client = genai.Client(api_key=GEMINI_API_KEY)

def search_web(query):
    """필요시 Serper API를 활용한 실시간 웹 검색"""
    if not SERPER_API_KEY:
        logging.warning("SERPER_API_KEY가 설정되지 않아 웹 검색을 건너뜁니다.")
        return ""
    
    try:
        url = "https://google.serper.dev/search"
        headers = {
            "X-API-KEY": SERPER_API_KEY,
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
        questions = data.get("questions", [])
        selected_cards = data.get("cards", [])
        tone = data.get("tone", "신비롭고 다정한")
        prompt_type = data.get("prompt_type", "A") # A: 일반, B: 전문가
        use_search = data.get("use_search", False)
        
        logging.info(f"[요청 수신] 사용자: {user_name}, 질문 개수: {len(questions)}, 카드 개수: {len(selected_cards)}, 검색 사용여부: {use_search}")

        # 백엔드 입력 검증
        if not user_name:
            return jsonify({"error": "이름(닉네임)을 입력해 주세요."}), 400
            
        if not questions or not isinstance(questions, list):
            return jsonify({"error": "최소 1개 이상의 질문을 작성해 주세요."}), 400

        # 질문 개수 제한 (10개 이하)
        if len(questions) > 10:
            return jsonify({"error": "질문은 최대 10개까지만 입력할 수 있습니다."}), 400

        if not GEMINI_API_KEY or not genai_client:
            return jsonify({"error": "서버에 GEMINI_API_KEY가 설정되지 않았습니다."}), 500

        # 선택한 타로 카드 포맷팅
        cards_context = ""
        if selected_cards and isinstance(selected_cards, list):
            cards_lines = []
            for c in selected_cards:
                pos = c.get("position", "카드")
                name = c.get("name", "")
                direction = c.get("direction", "정방향")
                keywords = c.get("keywords", "")
                cards_lines.append(f"- [{pos}] {name} ({direction}) - 핵심 상징: {keywords}")
            cards_context = "\n".join(cards_lines)

        # 웹 검색 필요시 Serper API 수행
        search_context = ""
        if use_search:
            combined_query = f"{user_name} 운세 " + " ".join(questions[:2])
            logging.info(f"[Serper 검색 시작] 쿼리: {combined_query}")
            search_context = search_web(combined_query)

        # 프롬프트 구성
        questions_formatted = "\n".join([f"{idx+1}. {q}" for idx, q in enumerate(questions)])
        
        system_instruction = f"""
당신은 타로 점술과 사주/운세 종합 분석에 뛰어난 지혜로운 운세 마스터입니다.
답변 톤앤매너: {tone} 말투로 작성하세요.

[지침 및 제약사항]
1. 사용자가 제출한 질문들을 종합적으로 분석하여 점을 봐주세요.
2. 사용자가 직접 뽑은 타로 카드가 있다면, 각 카드의 명칭과 방향(정방향/역방향), 상징과 은유를 사용자의 상황과 질문에 유기적으로 연결하여 아름답고 설득력 있는 문장으로 해석하세요.
3. 타로 카드의 괘와 사주/운세의 흐름을 조화롭게 엮어서 마크다운(Markdown) 형식으로 정갈하고 매력적으로 작성하세요.
"""

        if prompt_type == "B":
            system_instruction += "\n4. [전문가 모드] 깊이 있는 타로 아르카나 해석, 심리적 무의식 분석, 그리고 현실적인 조언과 실천 가이드를 상세히 포함하세요."

        user_prompt = f"""
[사용자 정보]
- 이름/닉네임: {user_name}
- 생년월일 및 사주 정보: {birth_info if birth_info else '미입력'}
"""

        if cards_context:
            user_prompt += f"\n[사용자가 직접 뽑은 타로 카드 스프레드]\n{cards_context}\n"

        user_prompt += f"""
[사용자 질문 목록]
{questions_formatted}
"""

        if search_context:
            user_prompt += f"\n\n[실시간 참고 정보 (웹 검색 결과)]\n{search_context}\n"

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

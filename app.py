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

STEMS = ["갑(甲)", "을(乙)", "병(丙)", "정(丁)", "무(戊)", "기(己)", "경(庚)", "신(辛)", "임(壬)", "계(癸)"]
STEM_ELEMENTS = ["목(木 - 청색/성장)", "목(木 - 청색/성장)", "화(火 - 적색/열정)", "화(火 - 적색/열정)", "토(土 - 황색/신뢰)", "토(土 - 황색/신뢰)", "금(金 - 백색/결단)", "금(金 - 백색/결단)", "수(水 - 흑색/지혜)", "수(水 - 흑색/지혜)"]
BRANCHES = ["자(子 - 쥐)", "축(丑 - 소)", "인(寅 - 호랑이)", "묘(卯 - 토끼)", "진(辰 - 용)", "사(巳 - 뱀)", "오(午 - 말)", "미(未 - 양)", "신(申 - 원숭이)", "유(酉 - 닭)", "술(戌 - 개)", "해(亥 - 돼지)"]
BRANCH_ANIMALS = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"]
BRANCH_ELEMENTS = ["수(水)", "토(土)", "목(木)", "목(木)", "토(土)", "화(火)", "화(火)", "토(土)", "금(金)", "금(金)", "토(土)", "수(水)"]

def calculate_saju(birth_str):
    """생년월일 텍스트에서 연도, 월, 일, 시를 추출하여 사주 기본 간지와 오행 기운을 분석"""
    if not birth_str:
        return None
    
    import re
    nums = re.findall(r'\d+', birth_str)
    if not nums:
        return None
    
    year = int(nums[0])
    if year < 100:
        year += 1900 if year > 30 else 2000
    
    month = int(nums[1]) if len(nums) > 1 else None
    day = int(nums[2]) if len(nums) > 2 else None
    
    stem_idx = (year - 4) % 10
    branch_idx = (year - 4) % 12
    
    stem_name = STEMS[stem_idx]
    stem_elem = STEM_ELEMENTS[stem_idx]
    branch_name = BRANCHES[branch_idx]
    animal = BRANCH_ANIMALS[branch_idx]
    branch_elem = BRANCH_ELEMENTS[branch_idx]
    
    ganji_year = f"{stem_name[:1]}{branch_name[:1]}년({year}년생)"
    
    # 계절 및 월지 오행
    season = "사계절의 기운"
    season_elem = "조화로운 오행"
    if month:
        if month in [3, 4, 5]:
            season = "봄 (만물이 생동하는 기운)"
            season_elem = "목(木 - 발산과 성장)"
        elif month in [6, 7, 8]:
            season = "여름 (열정과 결실을 향한 기운)"
            season_elem = "화(火 - 확산과 뜨거운 열정)"
        elif month in [9, 10, 11]:
            season = "가을 (숙성과 수확, 결단의 기운)"
            season_elem = "금(金 - 결실과 냉철한 판단력)"
        else:
            season = "겨울 (지혜를 응축하고 휴식하는 기운)"
            season_elem = "수(水 - 깊은 통찰과 유연성)"
            
    return {
        "birth_raw": birth_str,
        "year": year,
        "ganji_year": ganji_year,
        "animal": f"{animal}띠",
        "heavenly_stem": stem_name,
        "earthly_branch": branch_name,
        "year_element": f"천간 {stem_elem} + 지지 {branch_elem}",
        "season": season,
        "season_element": season_elem
    }

@app.route("/")
def index():
    """메인 페이지 렌더링"""
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    """타로 & 사주 명리 융합 분석 요청 처리"""
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
        
        logging.info(f"[요청 수신] 사용자: {user_name}, 생년월일: {birth_info}, 카테고리: {category}, 질문 개수: {len(questions)}, 카드 개수: {len(selected_cards)}")

        # 백엔드 입력 검증
        if not user_name:
            return jsonify({"error": "성함 또는 닉네임을 입력해 주세요."}), 400
            
        if not questions or not isinstance(questions, list):
            return jsonify({"error": "최소 1개 이상의 질문을 작성해 주세요."}), 400

        # 질문 개수 제한 (10개 이하)
        if len(questions) > 10:
            return jsonify({"error": "질문은 최대 10개까지만 입력할 수 있습니다."}), 400

        gemini_key = get_gemini_key()
        if not gemini_key:
            return jsonify({"error": "서버에 GEMINI_API_KEY가 설정되지 않았습니다."}), 500

        genai_client = genai.Client(api_key=gemini_key)

        # 1. 사주 명리학 분석 데이터 도출
        saju_info = calculate_saju(birth_info)
        saju_text = "미입력 (순수 타로 중심 리딩)"
        if saju_info:
            saju_text = f"""
- 상담자 출생 정보: {saju_info['birth_raw']}
- 사주 년주 명식: {saju_info['ganji_year']} ({saju_info['animal']})
- 타고난 천간과 지지: {saju_info['heavenly_stem']} / {saju_info['earthly_branch']}
- 본성 오행 에너지: {saju_info['year_element']}
- 출생 계절과 기운: {saju_info['season']} [{saju_info['season_element']}]
"""

        # 2. 선택한 타로 카드 포맷팅 (6장 중 사용자가 직접 선택한 3장의 카드)
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

        # 3. 웹 검색 필요시 Serper API 수행
        search_context = ""
        if use_search:
            combined_query = f"{category} {user_name} 운세 " + " ".join(questions[:2])
            logging.info(f"[Serper 검색 시작] 쿼리: {combined_query}")
            search_context = search_web(combined_query)

        # 4. 프롬프트 구성
        questions_formatted = "\n".join([f"{idx+1}. {q}" for idx, q in enumerate(questions)])
        
        system_instruction = f"""
당신은 사주 명리학(四柱命理學)과 타로 점술의 상생·상극 조화에 통달한 최고 권위의 정통 운세 마스터입니다.
선택된 운세 테마: [{category}]
답변 톤앤매너: {tone} 말투로 작성하세요.

[★ 핵심 리딩 원칙: 사주와 타로의 조화로운 융합 리딩]
단순히 타로 카드만 해석하는 것을 지양하고, **상담자의 사주 명리학적 기운(오행 목·화·토·금·수, 띠, 출생 계절)을 타로 카드 3장과 유기적으로 결합**하여 풀이해야 합니다.
반드시 아래 4단계 목차 구조로 깊이 있고 품격 있게 작성하세요:

### ☯️ 1. 사주 명리학 심층 분석: 타고난 천성과 현재 운의 흐름
- 상담자의 사주 정보(간지, 띠, 본성 오행, 출생 계절)를 바탕으로, 타고난 기질과 강점/약점, 그리고 현재 시점에 마주한 대운/세운의 전반적인 에너지 흐름을 명쾌하게 짚어주세요.

### 🃏 2. 사주 ✕ 타로 3장 융합 리딩: 오행(五行)과 카드의 상생·상극 풀이
- 상담자가 직관으로 선택한 3장의 카드(1. 과거·원인 / 2. 현재·상황 / 3. 미래·조언)가 **상담자의 사주 기운과 어떻게 상생(도움)하거나 상극(충돌/주의)하는지**를 카드의 방향(정방향/역방향)과 함께 직접 엮어서 해석하세요!
  * 예: "상담자님의 사주에 있는 불(火)의 기운이 타로의 [전차]와 만나 폭발적인 추진력을 발휘하고 있습니다...", "사주의 차가운 금(金) 기운과 타로의 [검 3]이 마찰을 빚어 인간관계의 이별과 상처를 주의해야 합니다..." 등.
- [엄격한 현실적 균형]: 카드 중 시련, 손실, 갈등, 이별, 번아웃, 배신, 사기(예: 검 3, 검 5, 검 7, 검 8, 검 9, 검 10, 펜타클 4, 펜타클 5, 펜타클 7, 지팡이 5, 지팡이 9, 지팡이 10 등)나 역방향 카드가 포함되어 있다면, 사주와 카드가 함께 가리키는 냉혹한 현실의 위험을 거짓 없이 솔직하게 경고하세요.

### 🔮 3. 질문에 대한 명쾌한 솔루션 & 현실적 대처 방안
- 상담자의 질문들에 대해 사주와 타로의 괘를 통합하여 구체적이고 현실적인 해답을 제시하고, 닥쳐올 위기를 방어할 실천 요령을 전하세요.

### 🍀 4. 사주 맞춤 개운법 (開運法)
- 상담자의 사주에서 부족하거나 보완해야 할 오행 기운을 돋워줄 실천 팁: 행운의 색상, 숫자, 방향, 마음가짐 조언.
"""

        if prompt_type == "B":
            system_instruction += "\n5. [전문가 모드] 사주 십신(十神) 및 신살(神殺) 기운과 타로 아르카나의 융(Jung) 무의식 원형을 학술적·철학적 깊이로 융합하여 상세히 서술하세요."

        user_prompt = f"""
[상담자 프로필 및 사주 데이터]
- 성함/닉네임: {user_name}
- 운세 테마: {category}
{saju_text}

[사용자가 직관으로 선택한 3장의 운명 카드]
{cards_context if cards_context else '카드 정보 없음'}

[사용자의 질문 및 고민 목록]
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
            "status": "success",
            "saju": saju_info
        })

    except Exception as e:
        logging.error(f"[서버 오류 발생] {str(e)}", exc_info=True)
        return jsonify({"error": f"운세를 보는 도중 오류가 발생했습니다: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

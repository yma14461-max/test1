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
    """타로 6장 스토리텔링 & 사주 맞춤 조언 분석 요청 처리"""
    try:
        data = request.get_json() or {}
        
        user_name = data.get("name", "").strip()
        birth_info = data.get("birth_info", "").strip()
        category = data.get("category", "종합 운세 / 사주").strip()
        questions = data.get("questions", [])
        selected_cards = data.get("cards", [])
        bundle_info = data.get("bundle", {})
        tone = data.get("tone", "신비롭고 다정한")
        prompt_type = data.get("prompt_type", "A") # A: 일반, B: 전문가
        use_search = data.get("use_search", False)
        
        bundle_name = bundle_info.get("name", "선택된 운명 묶음")
        stone_name = bundle_info.get("stoneName", "원석")
        stone_meaning = bundle_info.get("stoneMeaning", "")

        logging.info(f"[요청 수신] 사용자: {user_name}, 묶음: {bundle_name}({stone_name}), 카테고리: {category}, 질문 수: {len(questions)}, 카드 수: {len(selected_cards)}")

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

        # 1. 사주 명리학 분석 데이터 도출 (마지막 조언 단계에서만 융합)
        saju_info = calculate_saju(birth_info)
        saju_text = "미입력 (순수 타로 중심 조언)"
        if saju_info:
            saju_text = f"""
- 상담자 출생 정보: {saju_info['birth_raw']}
- 사주 년주 명식: {saju_info['ganji_year']} ({saju_info['animal']})
- 타고난 천간과 지지: {saju_info['heavenly_stem']} / {saju_info['earthly_branch']}
- 본성 오행 에너지: {saju_info['year_element']}
- 출생 계절과 기운: {saju_info['season']} [{saju_info['season_element']}]
"""

        # 2. 선택한 묶음의 6장 타로 카드 포맷팅
        cards_context = ""
        if selected_cards and isinstance(selected_cards, list):
            cards_lines = []
            for idx, c in enumerate(selected_cards):
                pos = c.get("position", f"{idx+1}번 카드")
                name = c.get("name", "")
                direction = c.get("direction", "정방향")
                keywords = c.get("keywords", "")
                cards_lines.append(f"{idx+1}. [{pos}] {name} ({direction}) | 상징: {keywords}")
            cards_context = "\n".join(cards_lines)

        # 3. 웹 검색 필요시 Serper API 수행
        search_context = ""
        if use_search:
            combined_query = f"{category} {user_name} 운세 " + " ".join(questions[:2])
            logging.info(f"[Serper 검색 시작] 쿼리: {combined_query}")
            search_context = search_web(combined_query)

        # 4. 프롬프트 구성
        questions_formatted = "\n".join([f"Q{idx+1}. {q}" for idx, q in enumerate(questions)])
        
        system_instruction = f"""
당신은 오랜 세월 수많은 사람들의 마음을 치유하고 운명의 이정표를 짚어온 최고 권위의 정통 타로 마스터입니다.
선택된 운세 테마: [{category}]
상담자가 선택한 원석 묶음: [{bundle_name} - {stone_name} ({stone_meaning})]
답변 톤앤매너: {tone} 말투로 작성하세요.

[★ 최우선 리딩 원칙: 작위적이지 않은 자연스러운 서사적 연결 (주작감 탈피)]
1. **단편적인 카드 나열 금지**:
   - 카드를 하나씩 따로 떼어놓고 "1번 카드는 대박입니다. 그런데 2번 카드는 망했습니다" 식으로 급격하게 단절되거나 손바닥 뒤집듯 꺾이는 해석을 절대 하지 마십시오.
   - 6장의 카드가 원인과 결과, 겉모습과 내면 심리, 빛과 그림자처럼 유기적으로 맞물려 흘러가는 **'하나의 완성된 흐름과 서사(Storyline)'**로 입체감 있게 해석하십시오.
2. **긍정 카드와 경고 카드의 자연스러운 조화**:
   - 밝은 카드(예: 태양, 컵 에이스)와 어두운/시련의 카드(예: 검 3, 탑, 펜타클 5)가 함께 나왔다면, 모순이나 억지스러운 반전으로 처리하지 마십시오.
   - "현재 표면적으로는 긍정적인 추진력과 기회가 찾아오고 있으나, 그 이면에는 소모된 에너지나 과거의 상처가 여전히 작용하고 있어 무리한 확신보다는 정서적 안정이 먼저 필요함"과 같이, 현실에서 실제로 일어나는 복합적인 심리와 상황을 설득력 있게 풀어내십시오.
3. **[★ 핵심 분리 원칙: 타로 본문과 사주 조언의 역할 분리]**:
   - **본문 (1, 2, 3단계)**: 사주 명리학을 억지로 타로 카드 본문에 섞지 마십시오! 오직 **'6장의 타로 카드'와 '상담자의 구체적인 고민/질문'**에 온전히 집중하여 진솔하고 날카로운 심리·상황 분석을 제공하십시오.
   - **마지막 조언 (4단계)**: 사주 정보는 맨 마지막 4단계에서만 다룹니다. 상담자의 사주 기운(간지, 오행, 계절)을 이번 타로 카드의 최종 메시지와 결합하여, 삶에 실질적인 힘이 되는 현실적 인생 조언과 맞춤 개운법으로 정리하십시오.

반드시 아래 4단계 목차 구조로 깊이 있고 유려하게 작성하세요:

### 🔮 1. 운명의 흐름: 6장의 카드가 그리는 하나의 여정
- 상담자가 직관으로 선택한 [{stone_name}] 묶음에서 펼쳐진 6장의 카드가 고민과 어떻게 맞물려 있는지, 전체적인 에너지의 큰 흐름과 핵심 맥락을 서사적으로 조망하세요.

### 🃏 2. 카드 심층 입체 리딩: 현실과 내면의 거울
- 6장의 카드(현재 상황 → 숨겨진 원인 → 마주한 시련/주의점 → 주변 환경 → 해결의 열쇠 → 최종 결실)를 자연스럽게 이어가며, 상담자의 고민과 상황을 거울처럼 비추어 해석하세요.
- 카드 하나하나의 키워드를 기계적으로 나열하지 말고, 각 카드가 다음 카드로 어떻게 연결되고 영향을 주는지 자연스러운 스토리텔링으로 서술하세요.

### 💡 3. 질문에 대한 명쾌한 솔루션 & 현실적 대처 방안
- 상담자가 남긴 질문들에 대해 6장의 카드가 가리키는 현실적인 해답과 실천 요령을 명쾌하게 답변하세요.

### ☯️ 4. 사주 ✕ 타로 조화로운 맞춤 조언 & 개운법 (開運法)
- [여기서만 사주 명리학 결합!] 상담자의 사주 명식(천간/지지, 오행 기운, 출생 계절)을 이번 타로 카드의 핵심 교훈과 조화롭게 엮어 인생의 나침반이 될 맞춤 조언을 전하세요.
- 부족한 기운을 채워줄 일상 실천 팁(마음가짐, 행운의 색상, 행동 지침 등).
"""

        if prompt_type == "B":
            system_instruction += "\n5. [전문가 모드] 융(Carl Jung)의 분석심리학적 원형(Archetype)과 동양 명리학의 음양 조화를 심도 깊게 고찰하여 철학적 깊이를 더하세요."

        user_prompt = f"""
[상담자 프로필]
- 성함/닉네임: {user_name}
- 운세 테마: {category}
- 선택한 원석 묶음: {bundle_name} - {stone_name} ({stone_meaning})

[상담자 사주 명리 데이터 (마지막 4단계 조언에서만 참고)]
{saju_text}

[선택된 묶음에서 펼쳐진 6장의 타로 카드]
{cards_context if cards_context else '카드 정보 없음'}

[상담자의 질문 및 고민 목록]
{questions_formatted}
"""

        if search_context:
            user_prompt += f"\n[실시간 참고 정보 (웹 검색 결과)]\n{search_context}\n"

        logging.info("[Gemini API 호출 시작] 모델: gemini-3.5-flash-lite")
        
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
            "saju": saju_info,
            "bundle": bundle_info
        })

    except Exception as e:
        logging.error(f"[서버 오류 발생] {str(e)}", exc_info=True)
        return jsonify({"error": f"운세를 보는 도중 오류가 발생했습니다: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

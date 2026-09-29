import os
import sys
from dotenv import load_dotenv
import requests

# Windows 콘솔 UTF-8 출력 설정
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

def test_serper():
    print("--- [1] Serper API 테스트 ---")
    serper_key = os.getenv("SERPER_API_KEY")
    if not serper_key:
        print("[FAIL] SERPER_API_KEY 가 설정되지 않았습니다.")
        return False
    
    url = "https://google.serper.dev/search"
    headers = {
        "X-API-KEY": serper_key,
        "Content-Type": "application/json"
    }
    payload = {"q": "Python", "num": 1}
    
    try:
        res = requests.post(url, headers=headers, json=payload, timeout=10)
        if res.status_code == 200:
            data = res.json()
            title = data.get("organic", [{}])[0].get("title", "No title")
            print(f"[SUCCESS] Serper API 정상 작동! 검색 첫 번째 결과: {title}")
            return True
        else:
            print(f"[FAIL] Serper API 호출 실패 (Status: {res.status_code}): {res.text}")
            return False
    except Exception as e:
        print(f"[ERROR] Serper 요청 중 오류: {e}")
        return False

def test_gemini():
    print("\n--- [2] Gemini API 테스트 ---")
    gemini_key = os.getenv("GEMINI_API_KEY")
    if not gemini_key:
        print("[FAIL] GEMINI_API_KEY 가 설정되지 않았습니다.")
        return False
    
    try:
        from google import genai
        client = genai.Client(api_key=gemini_key)
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents="Say 'Gemini API is working!' in one sentence."
        )
        print(f"[SUCCESS] Gemini API 정상 작동 (모델: gemini-3.5-flash-lite)!\n응답 내용: {response.text.strip()}")
        return True
    except Exception as e:
        print(f"[FAIL] Gemini API 호출 실패: {e}")
        return False

if __name__ == "__main__":
    s_ok = test_serper()
    g_ok = test_gemini()
    print("\n===============================")
    print(f"Serper API 결과: {'[성공]' if s_ok else '[실패]'}")
    print(f"Gemini API 결과: {'[성공]' if g_ok else '[실패]'}")
    print("===============================")

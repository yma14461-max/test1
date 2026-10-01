@echo off
chcp 65001 > nul
title AI Tarot & Fortune Teller
echo ========================================================
echo  🔮 AI 타로 & 운세 마스터를 실행합니다...
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/2] Flask 백엔드 서버를 시작합니다...
start /b "" venv\Scripts\python.exe app.py

echo [2/2] 서버 초기화 대기 중...
timeout /t 2 /nobreak > nul

echo 브라우저를 연결합니다: http://127.0.0.1:5000
start http://127.0.0.1:5000

echo.
echo ========================================================
echo  서버가 정상 실행 중입니다!
echo  웹 브라우저에서 운세를 확인해 보세요.
echo  종료하시려면 이 창을 닫으시면 됩니다.
echo ========================================================
pause

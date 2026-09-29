document.addEventListener('DOMContentLoaded', () => {
    // 1. 타로 메이저 아르카나 22장 데이터베이스
    const TAROT_DECK = [
        { id: 0, name: "바보", nameEn: "The Fool", icon: "🎒", uprightKeywords: "새로운 시작, 모험, 무한한 잠재력, 순수", reversedKeywords: "무모함, 위험 감수, 경솔함, 방향 상실" },
        { id: 1, name: "마법사", nameEn: "The Magician", icon: "✨", uprightKeywords: "창조력, 독창성, 자신감, 실현 능력", reversedKeywords: "속임수, 미숙함, 재능 낭비, 불안정" },
        { id: 2, name: "여사제", nameEn: "The High Priestess", icon: "🌙", uprightKeywords: "직관, 신비, 내면의 지혜, 통찰력", reversedKeywords: "비밀, 차가움, 직관 무시, 표면적 판단" },
        { id: 3, name: "여황제", nameEn: "The Empress", icon: "👑", uprightKeywords: "풍요, 모성, 감성, 번영, 자연스러운 성장", reversedKeywords: "과잉보호, 나태, 창작의 정체, 감정 과잉" },
        { id: 4, name: "황제", nameEn: "The Emperor", icon: "🏛️", uprightKeywords: "권위, 안정, 규율, 리더십, 체계", reversedKeywords: "독단, 통제욕, 완고함, 융통성 부족" },
        { id: 5, name: "교황", nameEn: "The Hierophant", icon: "📜", uprightKeywords: "조언, 전통, 가르침, 신뢰, 멘토", reversedKeywords: "고루한 규칙, 편협함, 잘못된 조언, 반항" },
        { id: 6, name: "연인", nameEn: "The Lovers", icon: "❤️", uprightKeywords: "사랑, 조화, 가치관의 일치, 중요한 선택", reversedKeywords: "불화, 잘못된 선택, 갈등, 유혹에 흔들림" },
        { id: 7, name: "전차", nameEn: "The Chariot", icon: "🛡️", uprightKeywords: "의지, 극복, 추진력, 승리, 빠른 전개", reversedKeywords: "통제력 상실, 충동, 장애물에 부딪힘, 패배감" },
        { id: 8, name: "힘", nameEn: "Strength", icon: "🦁", uprightKeywords: "용기, 부드러운 설득, 내면의 강인함, 인내", reversedKeywords: "자기의심, 무기력, 분노 표출, 통제 실패" },
        { id: 9, name: "은둔자", nameEn: "The Hermit", icon: "🏮", uprightKeywords: "성찰, 탐구, 내면의 길잡이, 고독 속 지혜", reversedKeywords: "고립, 외로움, 현실 도피, 편협한 생각" },
        { id: 10, name: "운명의 수레바퀴", nameEn: "Wheel of Fortune", icon: "🎡", uprightKeywords: "운명적 전환, 새로운 기회, 행운, 변화", reversedKeywords: "불운, 예기치 못한 지연, 저항, 통제 불능" },
        { id: 11, name: "정의", nameEn: "Justice", icon: "⚖️", uprightKeywords: "공정, 진실, 인과응보, 합리적 결단", reversedKeywords: "불공정, 편견, 책임 회피, 부정직" },
        { id: 12, name: "매달린 사람", nameEn: "The Hanged Man", icon: "🕯️", uprightKeywords: "관점의 전환, 기다림, 자발적 희생, 깨달음", reversedKeywords: "헛된 희생, 고집, 무의미한 지연, 결단 지체" },
        { id: 13, name: "죽음", nameEn: "Death", icon: "🦋", uprightKeywords: "한 단계의 종결, 근본적 탈바꿈, 새로운 시작", reversedKeywords: "변화에 대한 저항, 과거에 대한 집착, 정체" },
        { id: 14, name: "절제", nameEn: "Temperance", icon: "🏺", uprightKeywords: "조화, 균형, 인내와 중용, 감정 치유", reversedKeywords: "불균형, 과도함, 성급함, 조율 실패" },
        { id: 15, name: "악마", nameEn: "The Devil", icon: "⛓️", uprightKeywords: "물질적 집착, 그림자, 유혹, 얽매임 직시", reversedKeywords: "구속에서의 해방, 회복, 유혹 극복, 자각" },
        { id: 16, name: "탑", nameEn: "The Tower", icon: "⚡", uprightKeywords: "급격한 변화, 낡은 틀의 파괴, 진실의 각성", reversedKeywords: "재앙의 회피, 불안의 지속, 변화를 향한 두려움" },
        { id: 17, name: "별", nameEn: "The Star", icon: "⭐", uprightKeywords: "희망, 영감, 치유, 낙관과 신뢰, 비전", reversedKeywords: "낙담, 절망감, 현실과 이상의 괴리, 회의감" },
        { id: 18, name: "달", nameEn: "The Moon", icon: "🔮", uprightKeywords: "무의식, 환상, 직관 탐색, 불안 속 통찰", reversedKeywords: "두려움 해소, 진실의 드러남, 오해 풀림" },
        { id: 19, name: "태양", nameEn: "The Sun", icon: "☀️", uprightKeywords: "성공, 활력, 기쁨, 명료함, 긍정의 결실", reversedKeywords: "일시적 먹구름, 과도한 낙관, 서두름" },
        { id: 20, name: "심판", nameEn: "Judgement", icon: "🎺", uprightKeywords: "부활, 중요한 결단, 소명의식, 과거의 청산", reversedKeywords: "자기비판, 결단 유예, 후회와 미련" },
        { id: 21, name: "세계", nameEn: "The World", icon: "🌐", uprightKeywords: "완성, 성취, 완벽한 조화, 새로운 차원의 여행", reversedKeywords: "미완성, 마지막 문턱의 지연, 미련" }
    ];

    const POSITIONS = [
        { label: "1. 과거 · 원인", desc: "고민의 시작과 배경" },
        { label: "2. 현재 · 상황", desc: "지금 당면한 에너지" },
        { label: "3. 미래 · 조언", desc: "나아갈 방향과 해답" }
    ];

    // 현재 활성화된 3장의 카드 상태
    let activeCards = [];

    // DOM 요소
    const fortuneForm = document.getElementById('fortuneForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const questionCountBadge = document.getElementById('questionCount');
    
    const tarotCardsContainer = document.getElementById('tarotCardsContainer');
    const shuffleCardsBtn = document.getElementById('shuffleCardsBtn');
    const flipAllCardsBtn = document.getElementById('flipAllCardsBtn');
    const tarotStatus = document.getElementById('tarotStatus');

    const loadingEl = document.getElementById('loading');
    const errorMessageEl = document.getElementById('errorMessage');
    const resultContainer = document.getElementById('resultContainer');
    const resultContent = document.getElementById('resultContent');
    
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    let questionCount = 1;
    const MAX_QUESTIONS = 10;
    let generatedMarkdown = '';

    // ==========================================
    // 타로 카드 랜덤 셔플 및 생성 함수
    // ==========================================
    function dealRandomTarotCards() {
        // 22장 중 중복 없이 3장 추출
        const shuffledDeck = [...TAROT_DECK].sort(() => 0.5 - Math.random());
        const selected = shuffledDeck.slice(0, 3);

        activeCards = selected.map((card, idx) => {
            // 70% 확률로 정방향, 30% 확률로 역방향
            const isUpright = Math.random() > 0.3;
            return {
                data: card,
                position: POSITIONS[idx].label,
                positionDesc: POSITIONS[idx].desc,
                direction: isUpright ? "정방향" : "역방향",
                isFlipped: false
            };
        });

        renderTarotCards();
        tarotStatus.textContent = "카드를 클릭하여 한 장씩 뒤집어보세요.";
    }

    // 타로 카드 DOM 렌더링
    function renderTarotCards() {
        tarotCardsContainer.innerHTML = '';

        activeCards.forEach((cardObj, idx) => {
            const cardItem = document.createElement('div');
            cardItem.className = 'tarot-card-item';
            cardItem.dataset.index = idx;

            const isUpright = cardObj.direction === "정방향";
            const dirClass = isUpright ? "upright" : "reversed";
            const dirText = isUpright ? "정방향 (Upright)" : "역방향 (Reversed)";
            const keywords = isUpright ? cardObj.data.uprightKeywords : cardObj.data.reversedKeywords;

            cardItem.innerHTML = `
                <div class="tarot-card-inner ${cardObj.isFlipped ? 'flipped' : ''}">
                    <!-- 뒷면 (초기 상태) -->
                    <div class="tarot-card-back">
                        <span class="card-pos-label">${cardObj.position}</span>
                        <div class="card-back-pattern">
                            <span class="card-back-icon">🔮</span>
                            <span class="card-back-hint">터치하여 오픈</span>
                        </div>
                    </div>

                    <!-- 앞면 (뒤집힌 후) -->
                    <div class="tarot-card-front">
                        <div class="card-front-top">
                            <span class="card-pos-tag">${cardObj.position}</span>
                            <span class="card-dir-tag ${dirClass}">${dirText}</span>
                        </div>
                        <div class="card-front-body">
                            <div class="card-front-icon">${cardObj.data.icon}</div>
                            <div class="card-front-name">${cardObj.data.id}. ${cardObj.data.name}</div>
                            <div class="card-front-name-en">${cardObj.data.nameEn}</div>
                        </div>
                        <div class="card-front-footer">
                            <div class="card-front-keywords">${keywords}</div>
                        </div>
                    </div>
                </div>
            `;

            // 개별 카드 클릭 이벤트 (뒤집기)
            cardItem.addEventListener('click', (e) => {
                e.preventDefault();
                const inner = cardItem.querySelector('.tarot-card-inner');
                cardObj.isFlipped = !cardObj.isFlipped;
                inner.classList.toggle('flipped', cardObj.isFlipped);
                checkCardsFlippedStatus();
            });

            tarotCardsContainer.appendChild(cardItem);
        });
    }

    // 카드 확인 상태 점검
    function checkCardsFlippedStatus() {
        const flippedCount = activeCards.filter(c => c.isFlipped).length;
        if (flippedCount === activeCards.length) {
            tarotStatus.textContent = "✨ 3장의 카드가 확인되었습니다. 이제 아래 질문을 작성해 주세요 👇";
            tarotStatus.style.color = "#86efac";
        } else {
            tarotStatus.textContent = `카드를 클릭하여 뒤집어주세요 (${flippedCount} / ${activeCards.length}장 확인됨)`;
            tarotStatus.style.color = "#c4b5fd";
        }
    }

    // 카드 섞기 버튼 이벤트
    shuffleCardsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dealRandomTarotCards();
    });

    // 모두 뒤집기 버튼 이벤트
    flipAllCardsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const inners = tarotCardsContainer.querySelectorAll('.tarot-card-inner');
        const shouldFlip = activeCards.some(c => !c.isFlipped);

        activeCards.forEach((c, i) => {
            c.isFlipped = shouldFlip;
            if (shouldFlip) {
                inners[i].classList.add('flipped');
            } else {
                inners[i].classList.remove('flipped');
            }
        });
        checkCardsFlippedStatus();
        if (shouldFlip) {
            const firstQInput = document.querySelector('.question-input');
            if (firstQInput) {
                firstQInput.focus({ preventScroll: true });
            }
        }
    });

    // ==========================================
    // 질문 추가 및 인덱스 관리
    // ==========================================
    function updateQuestionCountUI() {
        questionCountBadge.textContent = `${questionCount} / ${MAX_QUESTIONS}`;
        addQuestionBtn.style.display = (questionCount >= MAX_QUESTIONS) ? 'none' : 'block';
    }

    addQuestionBtn.addEventListener('click', () => {
        if (questionCount >= MAX_QUESTIONS) {
            alert('질문은 최대 10개까지만 추가할 수 있습니다.');
            return;
        }

        questionCount++;
        const row = document.createElement('div');
        row.className = 'question-input-row';
        row.innerHTML = `
            <input type="text" class="question-input" placeholder="질문 ${questionCount}: 궁금한 내용을 적어주세요." required>
            <button type="button" class="btn-remove" title="삭제">✕</button>
        `;

        row.querySelector('.btn-remove').addEventListener('click', () => {
            row.remove();
            questionCount--;
            reindexQuestions();
            updateQuestionCountUI();
        });

        questionsContainer.appendChild(row);
        updateQuestionCountUI();
    });

    function reindexQuestions() {
        const rows = questionsContainer.querySelectorAll('.question-input-row');
        rows.forEach((row, idx) => {
            const input = row.querySelector('.question-input');
            input.placeholder = `질문 ${idx + 1}: 궁금한 내용을 적어주세요.`;
        });
    }

    // ==========================================
    // 폼 제출 이벤트
    // ==========================================
    fortuneForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        errorMessageEl.classList.add('hidden');
        errorMessageEl.textContent = '';
        resultContainer.classList.add('hidden');

        const userName = document.getElementById('userName').value.trim();
        const birthInfo = document.getElementById('birthInfo').value.trim();
        const toneSelect = document.getElementById('toneSelect').value;
        const promptType = document.getElementById('promptType').value;
        const useSearch = document.getElementById('useSearch').checked;

        const questionInputs = document.querySelectorAll('.question-input');
        const questions = Array.from(questionInputs)
            .map(input => input.value.trim())
            .filter(q => q.length > 0);

        if (!userName) {
            showError('이름 또는 닉네임을 입력해 주세요.', document.getElementById('userName'));
            return;
        }

        if (questions.length === 0) {
            const firstQInput = document.querySelector('.question-input');
            showError('최소 1개 이상의 질문을 작성해 주세요.', firstQInput);
            return;
        }

        if (questions.length > MAX_QUESTIONS) {
            showError('질문은 최대 10개까지만 가능합니다.');
            return;
        }

        // 제출 시 아직 뒤집지 않은 카드가 있다면 모두 오픈
        activeCards.forEach(c => c.isFlipped = true);
        const inners = tarotCardsContainer.querySelectorAll('.tarot-card-inner');
        inners.forEach(el => el.classList.add('flipped'));
        checkCardsFlippedStatus();

        // 선택한 카드 데이터 포맷팅
        const cardsPayload = activeCards.map(c => ({
            position: c.position,
            name: `${c.data.id}. ${c.data.name} (${c.data.nameEn})`,
            direction: c.direction,
            keywords: c.direction === "정방향" ? c.data.uprightKeywords : c.data.reversedKeywords
        }));

        loadingEl.classList.remove('hidden');
        submitBtn.disabled = true;

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    birth_info: birthInfo,
                    tone: toneSelect,
                    prompt_type: promptType,
                    use_search: useSearch,
                    questions: questions,
                    cards: cardsPayload
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '운세를 불러오는 데 실패했습니다.');
            }

            generatedMarkdown = data.result;
            if (typeof marked !== 'undefined') {
                resultContent.innerHTML = marked.parse(generatedMarkdown);
            } else {
                resultContent.innerText = generatedMarkdown;
            }

            resultContainer.classList.remove('hidden');
            resultContainer.scrollIntoView({ behavior: 'smooth' });

        } catch (err) {
            showError(err.message);
        } finally {
            loadingEl.classList.add('hidden');
            submitBtn.disabled = false;
        }
    });

    // 에러 표시 및 해당 요소로 포커스 (화면 튕김 방지)
    function showError(message, targetElement = null) {
        errorMessageEl.textContent = message;
        errorMessageEl.classList.remove('hidden');
        if (targetElement) {
            targetElement.focus();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // 결과 복사 기능
    copyBtn.addEventListener('click', () => {
        if (!generatedMarkdown) return;
        navigator.clipboard.writeText(generatedMarkdown)
            .then(() => alert('리딩 결과가 클립보드에 복사되었습니다.'))
            .catch(() => alert('복사에 실패했습니다.'));
    });

    // Markdown 다운로드 기능
    downloadBtn.addEventListener('click', () => {
        if (!generatedMarkdown) return;
        const blob = new Blob([generatedMarkdown], { type: 'text/markdown;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${document.getElementById('userName').value || 'fortune'}_tarot_result.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // 초기화: 페이지 접속 시 자동으로 3장의 카드 딜링
    dealRandomTarotCards();
});

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 타로 덱 데이터베이스 (메이저 + 주요 마이너 37장)
    // ==========================================
    const TAROT_DECK = [
        // --- 메이저 아르카나 (22장) ---
        { 
            id: 0, 
            name: "바보", 
            nameEn: "The Fool", 
            icon: "🎒", 
            uprightKeywords: "새로운 시작, 모험, 무한한 잠재력, 순수", 
            reversedKeywords: "무모함, 위험 감수, 경솔함, 방향 상실",
            categories: ["종합 운세 / 사주", "취업 / 진로 / 이직", "멘탈 / 마음 치유"]
        },
        { 
            id: 1, 
            name: "마법사", 
            nameEn: "The Magician", 
            icon: "✨", 
            uprightKeywords: "창조력, 독창성, 자신감, 실현 능력", 
            reversedKeywords: "속임수, 미숙함, 재능 낭비, 불안정",
            categories: ["취업 / 진로 / 이직", "재물 / 금전 / 사업", "학업 / 시험 / 합격"]
        },
        { 
            id: 2, 
            name: "여사제", 
            nameEn: "The High Priestess", 
            icon: "🌙", 
            uprightKeywords: "직관, 신비, 내면의 지혜, 통찰력", 
            reversedKeywords: "비밀, 차가움, 직관 무시, 표면적 판단",
            categories: ["연애 / 애정운", "멘탈 / 마음 치유", "학업 / 시험 / 합격"]
        },
        { 
            id: 3, 
            name: "여황제", 
            nameEn: "The Empress", 
            icon: "👑", 
            uprightKeywords: "풍요, 모성, 감성, 번영, 자연스러운 성장", 
            reversedKeywords: "과잉보호, 나태, 창작의 정체, 감정 과잉",
            categories: ["연애 / 애정운", "재물 / 금전 / 사업", "인간관계 / 대인운"]
        },
        { 
            id: 4, 
            name: "황제", 
            nameEn: "The Emperor", 
            icon: "🏛️", 
            uprightKeywords: "권위, 안정, 규율, 리더십, 체계", 
            reversedKeywords: "독단, 통제욕, 완고함, 융통성 부족",
            categories: ["취업 / 진로 / 이직", "재물 / 금전 / 사업", "종합 운세 / 사주"]
        },
        { 
            id: 5, 
            name: "교황", 
            nameEn: "The Hierophant", 
            icon: "📜", 
            uprightKeywords: "조언, 전통, 가르침, 신뢰, 멘토", 
            reversedKeywords: "고루한 규칙, 편협함, 잘못된 조언, 반항",
            categories: ["학업 / 시험 / 합격", "인간관계 / 대인운", "종합 운세 / 사주"]
        },
        { 
            id: 6, 
            name: "연인", 
            nameEn: "The Lovers", 
            icon: "❤️", 
            uprightKeywords: "사랑, 조화, 가치관의 일치, 중요한 선택", 
            reversedKeywords: "불화, 잘못된 선택, 갈등, 유혹에 흔들림",
            categories: ["연애 / 애정운", "인간관계 / 대인운", "종합 운세 / 사주"]
        },
        { 
            id: 7, 
            name: "전차", 
            nameEn: "The Chariot", 
            icon: "🛡️", 
            uprightKeywords: "의지, 극복, 추진력, 승리, 빠른 전개", 
            reversedKeywords: "통제력 상실, 충동, 장애물에 부딪힘, 패배감",
            categories: ["취업 / 진로 / 이직", "학업 / 시험 / 합격", "재물 / 금전 / 사업"]
        },
        { 
            id: 8, 
            name: "힘", 
            nameEn: "Strength", 
            icon: "🦁", 
            uprightKeywords: "용기, 부드러운 설득, 내면의 강인함, 인내", 
            reversedKeywords: "자기의심, 무기력, 분노 표출, 통제 실패",
            categories: ["멘탈 / 마음 치유", "연애 / 애정운", "인간관계 / 대인운"]
        },
        { 
            id: 9, 
            name: "은둔자", 
            nameEn: "The Hermit", 
            icon: "🏮", 
            uprightKeywords: "성찰, 탐구, 내면의 길잡이, 고독 속 지혜", 
            reversedKeywords: "고립, 외로움, 현실 도피, 편협한 생각",
            categories: ["학업 / 시험 / 합격", "멘탈 / 마음 치유", "종합 운세 / 사주"]
        },
        { 
            id: 10, 
            name: "운명의 수레바퀴", 
            nameEn: "Wheel of Fortune", 
            icon: "🎡", 
            uprightKeywords: "운명적 전환, 새로운 기회, 행운, 변화", 
            reversedKeywords: "불운, 예기치 못한 지연, 저항, 통제 불능",
            categories: ["종합 운세 / 사주", "재물 / 금전 / 사업", "취업 / 진로 / 이직", "연애 / 애정운"]
        },
        { 
            id: 11, 
            name: "정의", 
            nameEn: "Justice", 
            icon: "⚖️", 
            uprightKeywords: "공정, 진실, 인과응보, 합리적 결단", 
            reversedKeywords: "불공정, 편견, 책임 회피, 부정직",
            categories: ["학업 / 시험 / 합격", "인간관계 / 대인운", "취업 / 진로 / 이직"]
        },
        { 
            id: 12, 
            name: "매달린 사람", 
            nameEn: "The Hanged Man", 
            icon: "🕯️", 
            uprightKeywords: "관점의 전환, 기다림, 자발적 희생, 깨달음", 
            reversedKeywords: "헛된 희생, 고집, 무의미한 지연, 결단 지체",
            categories: ["멘탈 / 마음 치유", "인간관계 / 대인운", "종합 운세 / 사주"]
        },
        { 
            id: 13, 
            name: "죽음", 
            nameEn: "Death", 
            icon: "🦋", 
            uprightKeywords: "한 단계의 종결, 근본적 탈바꿈, 새로운 시작", 
            reversedKeywords: "변화에 대한 저항, 과거에 대한 집착, 정체",
            categories: ["종합 운세 / 사주", "취업 / 진로 / 이직", "연애 / 애정운"]
        },
        { 
            id: 14, 
            name: "절제", 
            nameEn: "Temperance", 
            icon: "🏺", 
            uprightKeywords: "조화, 균형, 인내와 중용, 감정 치유", 
            reversedKeywords: "불균형, 과도함, 성급함, 조율 실패",
            categories: ["멘탈 / 마음 치유", "인간관계 / 대인운", "연애 / 애정운"]
        },
        { 
            id: 15, 
            name: "악마", 
            nameEn: "The Devil", 
            icon: "⛓️", 
            uprightKeywords: "물질적 집착, 그림자, 유혹, 얽매임 직시", 
            reversedKeywords: "구속에서의 해방, 회복, 유혹 극복, 자각",
            categories: ["재물 / 금전 / 사업", "연애 / 애정운", "멘탈 / 마음 치유"]
        },
        { 
            id: 16, 
            name: "탑", 
            nameEn: "The Tower", 
            icon: "⚡", 
            uprightKeywords: "급격한 변화, 낡은 틀의 파괴, 진실의 각성", 
            reversedKeywords: "재앙의 회피, 불안의 지속, 변화를 향한 두려움",
            categories: ["종합 운세 / 사주", "재물 / 금전 / 사업", "취업 / 진로 / 이직"]
        },
        { 
            id: 17, 
            name: "별", 
            nameEn: "The Star", 
            icon: "⭐", 
            uprightKeywords: "희망, 영감, 치유, 낙관과 신뢰, 비전", 
            reversedKeywords: "낙담, 절망감, 현실과 이상의 괴리, 회의감",
            categories: ["멘탈 / 마음 치유", "연애 / 애정운", "학업 / 시험 / 합격"]
        },
        { 
            id: 18, 
            name: "달", 
            nameEn: "The Moon", 
            icon: "🔮", 
            uprightKeywords: "무의식, 환상, 직관 탐색, 불안 속 통찰", 
            reversedKeywords: "두려움 해소, 진실의 드러남, 오해 풀림",
            categories: ["연애 / 애정운", "멘탈 / 마음 치유", "인간관계 / 대인운"]
        },
        { 
            id: 19, 
            name: "태양", 
            nameEn: "The Sun", 
            icon: "☀️", 
            uprightKeywords: "성공, 활력, 기쁨, 명료함, 긍정의 결실", 
            reversedKeywords: "일시적 먹구름, 과도한 낙관, 서두름",
            categories: ["취업 / 진로 / 이직", "재물 / 금전 / 사업", "학업 / 시험 / 합격", "연애 / 애정운"]
        },
        { 
            id: 20, 
            name: "심판", 
            nameEn: "Judgement", 
            icon: "🎺", 
            uprightKeywords: "부활, 중요한 결단, 소명의식, 과거의 청산", 
            reversedKeywords: "자기비판, 결단 유예, 후회와 미련",
            categories: ["취업 / 진로 / 이직", "종합 운세 / 사주", "학업 / 시험 / 합격"]
        },
        { 
            id: 21, 
            name: "세계", 
            nameEn: "The World", 
            icon: "🌐", 
            uprightKeywords: "완성, 성취, 완벽한 조화, 새로운 차원의 여행", 
            reversedKeywords: "미완성, 마지막 문턱의 지연, 미련",
            categories: ["종합 운세 / 사주", "취업 / 진로 / 이직", "학업 / 시험 / 합격", "연애 / 애정운"]
        },

        // --- 마이너 아르카나 인기 테마 카드 (15장 추가) ---
        {
            id: "C1",
            name: "컵 에이스",
            nameEn: "Ace of Cups",
            icon: "🏆",
            uprightKeywords: "새로운 사랑의 태동, 벅차오르는 감정, 기쁨, 영적 충만",
            reversedKeywords: "감정의 메마름, 닫힌 마음, 실연의 상처",
            categories: ["연애 / 애정운", "멘탈 / 마음 치유"]
        },
        {
            id: "C2",
            name: "컵 2",
            nameEn: "Two of Cups",
            icon: "🥂",
            uprightKeywords: "소울메이트, 운명적 교감, 연인의 결합, 상호 존중과 화합",
            reversedKeywords: "소통 단절, 오해, 불화, 일방적인 짝사랑",
            categories: ["연애 / 애정운", "인간관계 / 대인운"]
        },
        {
            id: "C3",
            name: "컵 3",
            nameEn: "Three of Cups",
            icon: "🎉",
            uprightKeywords: "기쁜 축하, 축배, 친구들과의 우정, 경사스러운 모임",
            reversedKeywords: "삼각관계, 지나친 방종, 소외감과 험담",
            categories: ["인간관계 / 대인운", "연애 / 애정운"]
        },
        {
            id: "C4",
            name: "컵 4",
            nameEn: "Four of Cups",
            icon: "🪷",
            uprightKeywords: "내면 성찰, 권태기, 조용한 휴식, 새로운 기회 직전의 고요",
            reversedKeywords: "새로운 동기부여, 슬럼프 탈출, 주변의 호의 포착",
            categories: ["멘탈 / 마음 치유", "종합 운세 / 사주"]
        },
        {
            id: "C9",
            name: "컵 9",
            nameEn: "Nine of Cups",
            icon: "🌈",
            uprightKeywords: "소원 성취(위시 카드), 꿈의 실현, 정서적 풍요, 만족감",
            reversedKeywords: "과식과 탐닉, 물질적 허세, 내면의 공허",
            categories: ["종합 운세 / 사주", "연애 / 애정운", "재물 / 금전 / 사업"]
        },
        {
            id: "W1",
            name: "지팡이 에이스",
            nameEn: "Ace of Wands",
            icon: "🔥",
            uprightKeywords: "새로운 열정의 불꽃, 사업/이직의 기회, 창의적 영감, 돌파구",
            reversedKeywords: "의지박약, 시작의 지연, 무기력함, 번아웃",
            categories: ["취업 / 진로 / 이직", "재물 / 금전 / 사업"]
        },
        {
            id: "W4",
            name: "지팡이 4",
            nameEn: "Four of Wands",
            icon: "🏰",
            uprightKeywords: "안정과 평화, 축제, 결혼, 화목한 가정, 확고한 보금자리",
            reversedKeywords: "가정 내 갈등, 불안정한 터전, 늦어지는 축하",
            categories: ["연애 / 애정운", "종합 운세 / 사주", "인간관계 / 대인운"]
        },
        {
            id: "W8",
            name: "지팡이 8",
            nameEn: "Eight of Wands",
            icon: "🚀",
            uprightKeywords: "신속한 급물살, 빠른 합격 통보, 성과의 급성장, 순조로운 여정",
            reversedKeywords: "의사소통 장애, 성급한 실수, 패닉, 계획 지연",
            categories: ["취업 / 진로 / 이직", "학업 / 시험 / 합격"]
        },
        {
            id: "S1",
            name: "검 에이스",
            nameEn: "Ace of Swords",
            icon: "🗡️",
            uprightKeywords: "명쾌한 지혜, 합격의 검, 단호한 결단력, 진실의 승리",
            reversedKeywords: "가혹한 언행, 판단 착오, 혼란과 불확실성",
            categories: ["학업 / 시험 / 합격", "취업 / 진로 / 이직"]
        },
        {
            id: "S4",
            name: "검 4",
            nameEn: "Four of Swords",
            icon: "🕊️",
            uprightKeywords: "치유의 안식, 마인드 리셋, 충분한 휴식, 폭풍 전의 평온",
            reversedKeywords: "재충전 완료, 활동 재개, 고립 탈출과 용기",
            categories: ["멘탈 / 마음 치유", "종합 운세 / 사주"]
        },
        {
            id: "S6",
            name: "검 6",
            nameEn: "Six of Swords",
            icon: "⛵",
            uprightKeywords: "난관 탈출, 잔잔한 물가로 이동, 치유와 회복의 여정, 이사",
            reversedKeywords: "과거에 얽매임, 벗어나지 못하는 불안, 정체",
            categories: ["멘탈 / 마음 치유", "인간관계 / 대인운"]
        },
        {
            id: "P1",
            name: "펜타클 에이스",
            nameEn: "Ace of Pentacles",
            icon: "🪙",
            uprightKeywords: "새로운 재물의 기회, 황금빛 수입, 확실한 투자처, 번영의 씨앗",
            reversedKeywords: "재정적 기회 놓침, 과소비, 불안정한 계약",
            categories: ["재물 / 금전 / 사업", "취업 / 진로 / 이직"]
        },
        {
            id: "P3",
            name: "펜타클 3",
            nameEn: "Three of Pentacles",
            icon: "📐",
            uprightKeywords: "전문성 인정, 마스터의 협업, 장인 정신, 기술적 성취, 승진",
            reversedKeywords: "동료 간 불화, 실력 부족, 퀄리티 저하",
            categories: ["취업 / 진로 / 이직", "학업 / 시험 / 합격"]
        },
        {
            id: "P9",
            name: "펜타클 9",
            nameEn: "Nine of Pentacles",
            icon: "🍇",
            uprightKeywords: "우아한 풍요, 경제적 자립, 노력의 결실, 여유로운 삶",
            reversedKeywords: "낭비벽, 겉치레에 치중함, 재정적 고립",
            categories: ["재물 / 금전 / 사업", "종합 운세 / 사주"]
        },
        {
            id: "P10",
            name: "펜타클 10",
            nameEn: "Ten of Pentacles",
            icon: "🗝️",
            uprightKeywords: "영구적인 부의 축적, 가문의 번영, 부동산 성공, 평생의 안정",
            reversedKeywords: "상속 분쟁, 가족 간 금전 갈등, 갑작스러운 손실",
            categories: ["재물 / 금전 / 사업", "연애 / 애정운"]
        }
    ];

    // ==========================================
    // 2. 운세 테마 및 추천 질문 데이터
    // ==========================================
    const THEMES_CONFIG = {
        "💖 연애 / 애정운": {
            placeholder: "질문 1: 현재 관심 있는 사람과 앞으로 연인으로 발전할 수 있을까요?",
            suggestions: [
                "현재 마음에 두고 있는 사람과 연인으로 발전할 수 있을까요?",
                "앞으로 3개월 내에 운명적인 새로운 인연을 만날 수 있을까요?",
                "헤어진 연인과의 재회 가능성과 그 사람의 진심 어린 속마음은?",
                "현재 연인과의 관계에서 가장 주의해야 할 점과 앞으로의 흐름은?"
            ]
        },
        "💼 취업 / 진로 / 이직": {
            placeholder: "질문 1: 현재 준비 중인 시험/면접에 좋은 결과가 따를까요?",
            suggestions: [
                "지금 준비 중인 이직/취업에 가장 유리한 타이밍은 언제인가요?",
                "현재 직장을 계속 유지하는 것과 새로운 도전 중 어느 쪽이 좋을까요?",
                "나의 숨겨진 직업적 강점과 앞으로의 커리어 성장 방향은?",
                "상사나 동료와의 관계를 개선하고 인정을 받는 방법은 무엇인가요?"
            ]
        },
        "💰 재물 / 금전 / 사업": {
            placeholder: "질문 1: 올해 하반기 나의 금전 흐름과 재물운은 어떨까요?",
            suggestions: [
                "올해 전반적인 금전 흐름과 뜻밖의 재물운이 찾아올 시기는?",
                "계획 중인 투자나 부동산/자산 증식의 흐름이 순조로울까요?",
                "갑작스러운 금전 누수를 막기 위해 명심해야 할 조언은 무엇인가요?",
                "현재 추진 중인 프로젝트나 비즈니스가 큰 수익으로 이어질까요?"
            ]
        },
        "🌟 종합 운세 / 사주": {
            placeholder: "질문 1: 올해 전반적인 운의 흐름과 인생의 주요 전환점은 무엇인가요?",
            suggestions: [
                "올해 전반적인 운의 흐름과 인생의 가장 결정적인 전환점은?",
                "현재 나를 가로막고 있는 장애물과 이를 극복할 핵심 비결은?",
                "나에게 찾아올 가장 큰 행운과 귀인은 언제, 어떤 모습으로 올까요?",
                "내 운의 그릇을 넓히기 위해 지금 실천해야 할 습관이나 조언은?"
            ]
        },
        "🤝 인간관계 / 대인운": {
            placeholder: "질문 1: 직장 동료/친구와의 갈등을 지혜롭게 해결할 방법은 무엇일까요?",
            suggestions: [
                "특정 인물과의 관계를 지혜롭게 풀어갈 실질적 조언이 궁금합니다.",
                "내 곁에 진심으로 힘이 되어줄 소중한 귀인이 나타날까요?",
                "대인관계에서 내가 나도 모르게 취하고 있는 오해를 사는 태도가 있나요?",
                "가족 간의 서운함과 거리감을 좁히기 위해 내가 먼저 해야 할 일은?"
            ]
        },
        "🧘 멘탈 / 마음 치유": {
            placeholder: "질문 1: 요즘 겪는 무기력과 번아웃을 극복하고 에너지를 되찾으려면?",
            suggestions: [
                "요즘 겪는 무기력과 번아웃을 극복하고 마음의 에너지를 채우려면?",
                "마음속 깊은 불안과 스트레스의 근원은 무엇이고 어떻게 다스려야 할까요?",
                "나 자신을 온전히 신뢰하고 자존감을 회복하기 위한 타로의 메시지는?",
                "혼자만의 고립감에서 벗어나 마음의 평온을 찾기 위한 조언은?"
            ]
        },
        "🎓 학업 / 시험 / 합격": {
            placeholder: "질문 1: 목표로 하는 시험이나 자격증 취득에 합격운이 따를까요?",
            suggestions: [
                "목표로 하는 시험이나 자격증 취득에 합격운이 따를까요?",
                "학업 집중력을 높이고 슬럼프를 빠르게 탈출하는 비결은?",
                "나의 학업 적성과 공부 방식이 올바른 방향으로 가고 있는지 궁금합니다.",
                "시험 당일 최상의 컨디션과 긴장 완화를 위해 필요한 조언은?"
            ]
        }
    };

    const SPREAD_SLOTS = [
        { label: "1. 과거 · 원인", desc: "고민의 시작점 및 잠재된 원인" },
        { label: "2. 현재 · 상황", desc: "현재 당면한 핵심 에너지와 장애물" },
        { label: "3. 미래 · 조언", desc: "나아갈 방향 및 문제 해결의 실마리" }
    ];

    // ==========================================
    // 3. 상태 관리 변수
    // ==========================================
    let currentCategory = "💖 연애 / 애정운";
    let dealtSixCards = [];       // 질문 기반으로 웹이 제시한 6장의 카드
    let selectedIndices = [];     // 사용자가 선택한 카드 인덱스 목록 (최대 3개, 순서대로)
    let questionCount = 1;
    const MAX_QUESTIONS = 10;
    let generatedMarkdown = '';

    // ==========================================
    // 4. DOM 요소 캐싱
    // ==========================================
    // Step 1
    const step1Section = document.getElementById('step1Section');
    const categoryGrid = document.getElementById('categoryGrid');
    const recommendedQuestions = document.getElementById('recommendedQuestions');
    const userNameInput = document.getElementById('userName');
    const birthInfoInput = document.getElementById('birthInfo');
    const toneSelect = document.getElementById('toneSelect');
    const promptType = document.getElementById('promptType');
    const useSearch = document.getElementById('useSearch');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const questionCountBadge = document.getElementById('questionCount');
    const step1Error = document.getElementById('step1Error');
    const proceedToTarotBtn = document.getElementById('proceedToTarotBtn');

    // Step 2
    const step2Section = document.getElementById('step2Section');
    const backToStep1Btn = document.getElementById('backToStep1Btn');
    const summaryTheme = document.getElementById('summaryTheme');
    const summaryUser = document.getElementById('summaryUser');
    const summaryQuestionsList = document.getElementById('summaryQuestionsList');
    const selectionStatusText = document.getElementById('selectionStatusText');
    const slotBadge1 = document.getElementById('slotBadge1');
    const slotBadge2 = document.getElementById('slotBadge2');
    const slotBadge3 = document.getElementById('slotBadge3');
    const sixTarotCardsGrid = document.getElementById('sixTarotCardsGrid');
    const reshuffleBtn = document.getElementById('reshuffleBtn');
    const submitReadingBtn = document.getElementById('submitReadingBtn');
    const step2Error = document.getElementById('step2Error');

    // Step 3 / Result
    const loadingEl = document.getElementById('loading');
    const loadingText = document.getElementById('loadingText');
    const resultContainer = document.getElementById('resultContainer');
    const resultThemeBadge = document.getElementById('resultThemeBadge');
    const chosenCardsGrid = document.getElementById('chosenCardsGrid');
    const resultContent = document.getElementById('resultContent');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const restartBtn = document.getElementById('restartBtn');

    // ==========================================
    // 5. 카테고리 & 추천 질문 처리
    // ==========================================
    function updateCategoryUI(categoryKey) {
        currentCategory = categoryKey;
        const chips = categoryGrid.querySelectorAll('.category-chip');
        chips.forEach(chip => {
            chip.classList.toggle('active', chip.dataset.category === categoryKey);
        });

        const config = THEMES_CONFIG[categoryKey];
        if (!config) return;

        // 첫 번째 인풋 플레이스홀더 업데이트
        const firstInput = questionsContainer.querySelector('.question-input');
        if (firstInput && !firstInput.value.trim()) {
            firstInput.placeholder = config.placeholder;
        }

        // 추천 질문 칩 동적 렌더링
        recommendedQuestions.innerHTML = '';
        config.suggestions.forEach(text => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'recommend-chip';
            btn.textContent = text;
            btn.addEventListener('click', () => {
                applySuggestedQuestion(text);
            });
            recommendedQuestions.appendChild(btn);
        });
    }

    function applySuggestedQuestion(questionText) {
        const inputs = Array.from(questionsContainer.querySelectorAll('.question-input'));
        const emptyInput = inputs.find(inp => inp.value.trim() === '');
        if (emptyInput) {
            emptyInput.value = questionText;
            emptyInput.focus();
        } else if (inputs.length < MAX_QUESTIONS) {
            addQuestionRow(questionText);
        } else {
            inputs[0].value = questionText;
            inputs[0].focus();
        }
    }

    categoryGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-chip');
        if (!btn) return;
        const categoryKey = btn.dataset.category;
        updateCategoryUI(categoryKey);
    });

    // ==========================================
    // 6. 질문 추가/삭제 관리
    // ==========================================
    function updateQuestionCountUI() {
        const rows = questionsContainer.querySelectorAll('.question-input-row');
        questionCount = rows.length;
        questionCountBadge.textContent = `${questionCount} / ${MAX_QUESTIONS}`;
        addQuestionBtn.style.display = (questionCount >= MAX_QUESTIONS) ? 'none' : 'block';
    }

    function addQuestionRow(initialValue = '') {
        if (questionCount >= MAX_QUESTIONS) {
            alert('질문은 최대 10개까지만 등록할 수 있습니다.');
            return;
        }

        const row = document.createElement('div');
        row.className = 'question-input-row';
        const newIndex = questionsContainer.querySelectorAll('.question-input-row').length + 1;
        row.innerHTML = `
            <input type="text" class="question-input" placeholder="질문 ${newIndex}: 궁금한 점을 적어주세요." value="${initialValue}" required>
            <button type="button" class="btn-remove" title="삭제">✕</button>
        `;

        row.querySelector('.btn-remove').addEventListener('click', () => {
            row.remove();
            reindexQuestions();
            updateQuestionCountUI();
        });

        questionsContainer.appendChild(row);
        updateQuestionCountUI();
        row.querySelector('.question-input').focus();
    }

    function reindexQuestions() {
        const rows = questionsContainer.querySelectorAll('.question-input-row');
        rows.forEach((row, idx) => {
            const input = row.querySelector('.question-input');
            input.placeholder = `질문 ${idx + 1}: 궁금한 점을 적어주세요.`;
        });
    }

    addQuestionBtn.addEventListener('click', () => addQuestionRow());

    // ==========================================
    // 7. STEP 1 -> STEP 2 (질문 확인 후 6장 도출)
    // ==========================================
    proceedToTarotBtn.addEventListener('click', () => {
        step1Error.classList.add('hidden');
        step1Error.textContent = '';

        const userName = userNameInput.value.trim();
        const inputs = Array.from(questionsContainer.querySelectorAll('.question-input'));
        const questions = inputs.map(i => i.value.trim()).filter(Boolean);

        if (!userName) {
            showError(step1Error, '성함 또는 닉네임을 입력해 주세요.', userNameInput);
            return;
        }

        if (questions.length === 0) {
            showError(step1Error, '최소 1개 이상의 질문을 작성해 주세요.', inputs[0]);
            return;
        }

        // Step 2 요약 정보 업데이트
        summaryTheme.textContent = currentCategory;
        summaryUser.textContent = `${userName}님의 질문 접수`;
        summaryQuestionsList.innerHTML = '';
        questions.forEach((q, idx) => {
            const li = document.createElement('li');
            li.textContent = `Q${idx + 1}. ${q}`;
            summaryQuestionsList.appendChild(li);
        });

        // 질문과 테마에 맞는 6장의 카드 선별 및 딜링
        dealSixCardsForQuestion(currentCategory, questions);

        // 화면 전환: Step 1 숨김 -> Step 2 표시
        step1Section.classList.add('hidden');
        step2Section.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        step2Section.scrollIntoView({ behavior: 'smooth' });
    });

    backToStep1Btn.addEventListener('click', () => {
        step2Section.classList.add('hidden');
        step1Section.classList.remove('hidden');
        step1Section.scrollIntoView({ behavior: 'smooth' });
    });

    // ==========================================
    // 8. 질문에 맞는 6장의 타로 카드 도출 로직
    // ==========================================
    function dealSixCardsForQuestion(category, questions) {
        selectedIndices = [];
        updateSlotBadgesUI();

        // 1. 해당 카테고리와 강력한 친화성을 가진 카드 필터링
        const categoryCards = TAROT_DECK.filter(card => {
            return card.categories.some(c => category.includes(c) || c.includes(category));
        });

        // 2. 카테고리 특화 카드 중 랜덤하게 3~4장 선별
        const shuffledCategory = [...categoryCards].sort(() => 0.5 - Math.random());
        const primaryPicks = shuffledCategory.slice(0, 4);

        // 3. 나머지 카드는 전체 덱에서 중복 없이 보충하여 총 6장 완성
        const remainingDeck = TAROT_DECK.filter(c => !primaryPicks.some(p => p.id === c.id));
        const shuffledRemaining = [...remainingDeck].sort(() => 0.5 - Math.random());
        const secondaryPicks = shuffledRemaining.slice(0, 6 - primaryPicks.length);

        const sixCards = [...primaryPicks, ...secondaryPicks].sort(() => 0.5 - Math.random());

        // 각 카드에 정방향/역방향 지정 (70% 정방향, 30% 역방향)
        dealtSixCards = sixCards.map((card, idx) => {
            const isUpright = Math.random() > 0.3;
            return {
                cardIndex: idx,
                data: card,
                direction: isUpright ? "정방향" : "역방향",
                isFlipped: false
            };
        });

        renderSixCardsUI();
    }

    // 6장 카드 UI 렌더링
    function renderSixCardsUI() {
        sixTarotCardsGrid.innerHTML = '';

        dealtSixCards.forEach((cardObj, idx) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'six-tarot-card';
            cardEl.dataset.index = idx;

            const isUpright = cardObj.direction === "정방향";
            const dirClass = isUpright ? "upright" : "reversed";
            const dirText = isUpright ? "정방향 (Upright)" : "역방향 (Reversed)";
            const keywords = isUpright ? cardObj.data.uprightKeywords : cardObj.data.reversedKeywords;

            cardEl.innerHTML = `
                <div class="card-inner-3d">
                    <!-- 뒷면 (골드 오너먼트 벨벳 룬 디자인) -->
                    <div class="card-face card-back">
                        <div class="card-filigree-frame"></div>
                        <span class="selection-order-tag hidden"></span>
                        <div class="card-back-core">
                            <span class="celestial-symbol">☾ ✦ ☽</span>
                            <span class="mystic-orb">🔮</span>
                            <span class="card-num-watermark">VI</span>
                        </div>
                        <span class="card-tap-text">터치하여 선택</span>
                    </div>

                    <!-- 앞면 (카드 오픈 시 제자리 회전) -->
                    <div class="card-face card-front">
                        <div class="card-filigree-frame"></div>
                        <div class="card-front-header">
                            <span class="front-slot-tag"></span>
                            <span class="card-dir-tag ${dirClass}">${dirText}</span>
                        </div>
                        <div class="card-front-body">
                            <div class="card-front-icon">${cardObj.data.icon}</div>
                            <div class="card-front-title">${cardObj.data.id}. ${cardObj.data.name}</div>
                            <div class="card-front-en">${cardObj.data.nameEn}</div>
                        </div>
                        <div class="card-front-footer">
                            <div class="card-front-keywords">${keywords}</div>
                        </div>
                    </div>
                </div>
            `;

            // 카드 클릭 이벤트 (제자리 뒤집기)
            cardEl.addEventListener('click', (e) => {
                e.preventDefault();
                handleCardClick(idx, cardEl);
            });

            sixTarotCardsGrid.appendChild(cardEl);
        });

        updateSelectionStatusUI();
    }

    // ==========================================
    // 9. 카드 선택 및 3장 인터랙션 (제자리 Flip)
    // ==========================================
    function handleCardClick(clickedIdx, cardElement) {
        step2Error.classList.add('hidden');
        step2Error.textContent = '';

        const existingPos = selectedIndices.indexOf(clickedIdx);

        if (existingPos !== -1) {
            // 이미 선택된 카드 -> 선택 해제 및 뒷면으로 회전
            selectedIndices.splice(existingPos, 1);
        } else {
            // 새로 선택
            if (selectedIndices.length >= 3) {
                showError(step2Error, '이미 3장의 카드를 모두 선택하셨습니다. 변경하시려면 선택된 카드를 다시 터치해 취소 후 선택해 주세요.');
                return;
            }
            selectedIndices.push(clickedIdx);
        }

        // 6장의 카드 상태 제자리 회전 동기화
        const cardElements = sixTarotCardsGrid.querySelectorAll('.six-tarot-card');
        cardElements.forEach((el, idx) => {
            const orderIndex = selectedIndices.indexOf(idx);
            const inner = el.querySelector('.card-inner-3d');
            const orderTag = el.querySelector('.selection-order-tag');
            const frontSlotTag = el.querySelector('.front-slot-tag');

            if (orderIndex !== -1) {
                // 선택된 상태: 슬롯 태그 부여 및 그 자리에서 즉시 앞면 Flip
                el.classList.add('selected');
                const slotInfo = SPREAD_SLOTS[orderIndex];
                orderTag.textContent = slotInfo.label;
                orderTag.classList.remove('hidden');
                frontSlotTag.textContent = slotInfo.label;
                inner.classList.add('flipped');
            } else {
                // 미선택 상태: 뒷면 유지
                el.classList.remove('selected');
                orderTag.classList.add('hidden');
                frontSlotTag.textContent = '';
                inner.classList.remove('flipped');
            }
        });

        updateSlotBadgesUI();
        updateSelectionStatusUI();
    }

    function updateSlotBadgesUI() {
        const badges = [slotBadge1, slotBadge2, slotBadge3];
        SPREAD_SLOTS.forEach((slot, i) => {
            const badge = badges[i];
            if (selectedIndices[i] !== undefined) {
                const cardObj = dealtSixCards[selectedIndices[i]];
                badge.className = `slot-badge slot-${i + 1} active`;
                badge.innerHTML = `<strong>${slot.label}</strong>: ${cardObj.data.name}`;
            } else {
                badge.className = `slot-badge slot-${i + 1}`;
                badge.textContent = `${slot.label}`;
            }
        });
    }

    function updateSelectionStatusUI() {
        const count = selectedIndices.length;
        if (count === 0) {
            selectionStatusText.innerHTML = `마음을 집중하고 <strong>첫 번째 카드(1. 과거 · 원인)</strong>를 골라주세요. (0 / 3)`;
            submitReadingBtn.disabled = true;
            submitReadingBtn.classList.add('disabled-btn');
            submitReadingBtn.textContent = '✨ 선택한 3장으로 최종 운세 리딩 보기 (3장 필요)';
        } else if (count === 1) {
            selectionStatusText.innerHTML = `좋습니다! <strong>두 번째 카드(2. 현재 · 상황)</strong>를 골라주세요. (1 / 3)`;
            submitReadingBtn.disabled = true;
            submitReadingBtn.classList.add('disabled-btn');
            submitReadingBtn.textContent = '✨ 선택한 3장으로 최종 운세 리딩 보기 (2장 더 필요)';
        } else if (count === 2) {
            selectionStatusText.innerHTML = `마지막 <strong>세 번째 카드(3. 미래 · 조언)</strong>를 골라주세요. (2 / 3)`;
            submitReadingBtn.disabled = true;
            submitReadingBtn.classList.add('disabled-btn');
            submitReadingBtn.textContent = '✨ 선택한 3장으로 최종 운세 리딩 보기 (1장 더 필요)';
        } else if (count === 3) {
            selectionStatusText.innerHTML = `✨ <strong style="color:#fde047;">3장의 운명 카드가 모두 밝혀졌습니다!</strong> 아래 버튼을 눌러 리딩을 확인하세요. (3 / 3)`;
            submitReadingBtn.disabled = false;
            submitReadingBtn.classList.remove('disabled-btn');
            submitReadingBtn.textContent = '✨ 선택한 3장으로 최종 운세 & 타로 리딩 보기';
        }
    }

    // 다른 6장으로 다시 섞기
    reshuffleBtn.addEventListener('click', () => {
        const inputs = Array.from(questionsContainer.querySelectorAll('.question-input'));
        const questions = inputs.map(i => i.value.trim()).filter(Boolean);
        dealSixCardsForQuestion(currentCategory, questions);
    });

    // ==========================================
    // 10. 최종 운세 리딩 요청 (API 연동)
    // ==========================================
    submitReadingBtn.addEventListener('click', async () => {
        if (selectedIndices.length !== 3) {
            showError(step2Error, '타로 카드를 반드시 3장 선택해 주세요.');
            return;
        }

        const userName = userNameInput.value.trim();
        const birthInfo = birthInfoInput.value.trim();
        const toneVal = toneSelect.value;
        const promptTypeVal = promptType.value;
        const useSearchVal = useSearch.checked;

        const inputs = Array.from(questionsContainer.querySelectorAll('.question-input'));
        const questions = inputs.map(i => i.value.trim()).filter(Boolean);

        // 선택된 3장의 카드 데이터 페이로드 구성
        const chosenCardsPayload = selectedIndices.map((cardIdx, slotIdx) => {
            const cardObj = dealtSixCards[cardIdx];
            const isUpright = cardObj.direction === "정방향";
            return {
                position: SPREAD_SLOTS[slotIdx].label,
                name: `${cardObj.data.id}. ${cardObj.data.name} (${cardObj.data.nameEn})`,
                direction: cardObj.direction,
                keywords: isUpright ? cardObj.data.uprightKeywords : cardObj.data.reversedKeywords
            };
        });

        // UI 상태: 로딩 시작
        loadingEl.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        submitReadingBtn.disabled = true;
        reshuffleBtn.disabled = true;
        loadingEl.scrollIntoView({ behavior: 'smooth' });

        // 다이내믹 로딩 텍스트 회전
        const loadingQuotes = [
            "타로 마스터가 카드의 상징과 질문에 깃든 에너지를 조율하고 있습니다...",
            "과거의 실마리, 현재의 거울, 미래의 이정표를 정밀하게 직조하는 중입니다...",
            "Gemini AI가 당신의 무의식을 비추는 진실된 조언을 빚어내고 있습니다..."
        ];
        let quoteIdx = 0;
        const quoteInterval = setInterval(() => {
            quoteIdx = (quoteIdx + 1) % loadingQuotes.length;
            loadingText.textContent = loadingQuotes[quoteIdx];
        }, 2200);

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    birth_info: birthInfo,
                    category: currentCategory,
                    tone: toneVal,
                    prompt_type: promptTypeVal,
                    use_search: useSearchVal,
                    questions: questions,
                    cards: chosenCardsPayload
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '운세 리딩을 불러오지 못했습니다.');
            }

            // 결과 렌더링
            generatedMarkdown = data.result;
            resultThemeBadge.textContent = currentCategory;

            // 상단 선택 카드 3장 요약 배너 렌더링
            renderChosenCardsBanner(chosenCardsPayload);

            // 마크다운 파싱 및 렌더링
            if (typeof marked !== 'undefined') {
                resultContent.innerHTML = marked.parse(generatedMarkdown);
            } else {
                resultContent.innerText = generatedMarkdown;
            }

            resultContainer.classList.remove('hidden');
            resultContainer.scrollIntoView({ behavior: 'smooth' });

        } catch (err) {
            showError(step2Error, err.message);
        } finally {
            clearInterval(quoteInterval);
            loadingEl.classList.add('hidden');
            submitReadingBtn.disabled = false;
            reshuffleBtn.disabled = false;
        }
    });

    // 결과 화면 상단 3장의 카드 요약 배너
    function renderChosenCardsBanner(cards) {
        chosenCardsGrid.innerHTML = '';
        cards.forEach((c, idx) => {
            const cardObj = dealtSixCards[selectedIndices[idx]];
            const isUpright = c.direction === "정방향";
            const dirClass = isUpright ? "upright" : "reversed";

            const div = document.createElement('div');
            div.className = 'mini-chosen-card';
            div.innerHTML = `
                <div class="mini-pos-badge">${c.position}</div>
                <div class="mini-icon">${cardObj.data.icon}</div>
                <div class="mini-name">${c.name}</div>
                <div class="mini-dir ${dirClass}">${c.direction}</div>
                <div class="mini-keywords">${c.keywords}</div>
            `;
            chosenCardsGrid.appendChild(div);
        });
    }

    // ==========================================
    // 11. 유틸리티 (복사, 다운로드, 재시작, 에러)
    // ==========================================
    function showError(errorContainer, message, targetElement = null) {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
        if (targetElement) {
            targetElement.focus();
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    copyBtn.addEventListener('click', () => {
        if (!generatedMarkdown) return;
        navigator.clipboard.writeText(generatedMarkdown)
            .then(() => alert('리딩 결과가 클립보드에 복사되었습니다.'))
            .catch(() => alert('복사에 실패했습니다.'));
    });

    downloadBtn.addEventListener('click', () => {
        if (!generatedMarkdown) return;
        const blob = new Blob([generatedMarkdown], { type: 'text/markdown;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const userName = userNameInput.value.trim() || 'fortune';
        a.download = `${userName}_tarot_result.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    restartBtn.addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        step2Section.classList.add('hidden');
        step1Section.classList.remove('hidden');
        selectedIndices = [];
        updateSlotBadgesUI();
        step1Section.scrollIntoView({ behavior: 'smooth' });
    });

    // 초기화: 첫 번째 카테고리 설정
    updateCategoryUI(currentCategory);
});

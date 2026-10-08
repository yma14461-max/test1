document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 78장 정통 타로 덱 데이터베이스 (메이저 22장 + 마이너 56장)
    // ==========================================
    const TAROT_DECK = [
  {
    "id": "M0",
    "name": "바보",
    "nameEn": "The Fool",
    "suit": "Major",
    "icon": "🎒",
    "uprightKeywords": "새로운 시작, 순수한 모험, 무한한 잠재력, 자유로운 여정",
    "reversedKeywords": "무모함, 충동적 위험, 방향 상실, 경솔한 판단"
  },
  {
    "id": "M1",
    "name": "마법사",
    "nameEn": "The Magician",
    "suit": "Major",
    "icon": "✨",
    "uprightKeywords": "창조력, 독창적 재능, 자신감, 주도적 실현 능력",
    "reversedKeywords": "속임수, 미숙함, 재능 낭비, 사기성 유혹"
  },
  {
    "id": "M2",
    "name": "여사제",
    "nameEn": "The High Priestess",
    "suit": "Major",
    "icon": "🌙",
    "uprightKeywords": "깊은 직관, 비밀, 내면의 지혜, 통찰력, 신비",
    "reversedKeywords": "냉담함, 직관 무시, 표면적 판단, 비밀 누설"
  },
  {
    "id": "M3",
    "name": "여황제",
    "nameEn": "The Empress",
    "suit": "Major",
    "icon": "👑",
    "uprightKeywords": "풍요로움, 번영, 따뜻한 모성, 결실, 창의적 영감",
    "reversedKeywords": "과잉보호, 나태, 창의력 정체, 사치와 낭비"
  },
  {
    "id": "M4",
    "name": "황제",
    "nameEn": "The Emperor",
    "suit": "Major",
    "icon": "🏛️",
    "uprightKeywords": "확고한 권위, 질서, 안정된 통제력, 현실적 리더십",
    "reversedKeywords": "독단, 통제욕, 완고함, 융통성 부족, 억압"
  },
  {
    "id": "M5",
    "name": "교황",
    "nameEn": "The Hierophant",
    "suit": "Major",
    "icon": "📜",
    "uprightKeywords": "현명한 조언, 전통과 원칙, 신뢰, 멘토의 가르침",
    "reversedKeywords": "편협한 도덕주의, 잘못된 조언, 고루한 규칙, 반항"
  },
  {
    "id": "M6",
    "name": "연인",
    "nameEn": "The Lovers",
    "suit": "Major",
    "icon": "❤️",
    "uprightKeywords": "깊은 사랑, 조화로운 교감, 가치관의 일치, 중요한 선택",
    "reversedKeywords": "불화, 유혹에 흔들림, 잘못된 선택, 결단 회피"
  },
  {
    "id": "M7",
    "name": "전차",
    "nameEn": "The Chariot",
    "suit": "Major",
    "icon": "🛡️",
    "uprightKeywords": "강력한 추진력, 승리와 극복, 의지력, 빠른 진전",
    "reversedKeywords": "통제력 상실, 충동적 폭주, 장애물과의 충돌, 패배감"
  },
  {
    "id": "M8",
    "name": "힘",
    "nameEn": "Strength",
    "suit": "Major",
    "icon": "🦁",
    "uprightKeywords": "부드러운 인내, 내면의 강인함, 용기, 현명한 자기통제",
    "reversedKeywords": "자기의심, 무기력, 분노 폭발, 인내심 고갈"
  },
  {
    "id": "M9",
    "name": "은둔자",
    "nameEn": "The Hermit",
    "suit": "Major",
    "icon": "🏮",
    "uprightKeywords": "내면 성찰, 진리 탐구, 고독 속 지혜, 신중한 숙고",
    "reversedKeywords": "고립감, 외로움, 현실 도피, 폐쇄적 고집"
  },
  {
    "id": "M10",
    "name": "운명의 수레바퀴",
    "nameEn": "Wheel of Fortune",
    "suit": "Major",
    "icon": "🎡",
    "uprightKeywords": "운명적 전환점, 새로운 기회, 행운의 순환, 변화",
    "reversedKeywords": "불운의 시기, 통제할 수 없는 지연, 변화에 대한 저항"
  },
  {
    "id": "M11",
    "name": "정의",
    "nameEn": "Justice",
    "suit": "Major",
    "icon": "⚖️",
    "uprightKeywords": "공정한 판단, 객관적 진실, 합리적 결단, 인과응보",
    "reversedKeywords": "불공정, 편견, 책임 회피, 가혹한 판결"
  },
  {
    "id": "M12",
    "name": "매달린 사람",
    "nameEn": "The Hanged Man",
    "suit": "Major",
    "icon": "🕯️",
    "uprightKeywords": "관점의 전환, 기다림 속 깨달음, 자발적 희생, 인내",
    "reversedKeywords": "헛된 희생, 고집스러운 지체, 무의미한 지연, 결단 결여"
  },
  {
    "id": "M13",
    "name": "죽음",
    "nameEn": "Death",
    "suit": "Major",
    "icon": "🦋",
    "uprightKeywords": "한 챕터의 필연적 종결, 낡은 틀의 탈바꿈, 재생의 시작",
    "reversedKeywords": "과거에 대한 집착, 변화를 거부함, 고통스러운 정체"
  },
  {
    "id": "M14",
    "name": "절제",
    "nameEn": "Temperance",
    "suit": "Major",
    "icon": "🏺",
    "uprightKeywords": "조화와 균형, 감정 치유, 중용의 미덕, 원활한 소통",
    "reversedKeywords": "극단적 불균형, 성급함, 감정 조절 실패, 타협 불능"
  },
  {
    "id": "M15",
    "name": "악마",
    "nameEn": "The Devil",
    "suit": "Major",
    "icon": "⛓️",
    "uprightKeywords": "강박적 집착, 물질적 욕망, 끊지 못하는 유혹, 속박",
    "reversedKeywords": "구속에서의 해방, 집착 내려놓기, 유혹 극복, 자각"
  },
  {
    "id": "M16",
    "name": "탑",
    "nameEn": "The Tower",
    "suit": "Major",
    "icon": "⚡",
    "uprightKeywords": "급격한 변혁, 거짓된 틀의 붕괴, 충격적인 각성, 쇄신",
    "reversedKeywords": "붕괴 직전의 불안, 위기 회피, 변화에 대한 공포"
  },
  {
    "id": "M17",
    "name": "별",
    "nameEn": "The Star",
    "suit": "Major",
    "icon": "⭐",
    "uprightKeywords": "순수한 희망, 영감과 치유, 비전, 미래를 향한 신뢰",
    "reversedKeywords": "낙담, 이상의 환멸, 비관주의, 길을 잃은 느낌"
  },
  {
    "id": "M18",
    "name": "달",
    "nameEn": "The Moon",
    "suit": "Major",
    "icon": "🔮",
    "uprightKeywords": "무의식의 안개, 불안과 혼란, 잠재된 환상, 직관적 탐색",
    "reversedKeywords": "안개 걷힘, 진실의 탄로, 오해 해소, 불안 완화"
  },
  {
    "id": "M19",
    "name": "태양",
    "nameEn": "The Sun",
    "suit": "Major",
    "icon": "☀️",
    "uprightKeywords": "눈부신 성공, 활력과 온기, 기쁨, 명료한 성취",
    "reversedKeywords": "일시적 먹구름, 지나친 낙관, 성급한 과열"
  },
  {
    "id": "M20",
    "name": "심판",
    "nameEn": "Judgement",
    "suit": "Major",
    "icon": "🎺",
    "uprightKeywords": "부활과 재평가, 결정적 소명, 과거 청산, 새로운 전환",
    "reversedKeywords": "자기비판, 결단 유예, 후회와 미련, 기회 방치"
  },
  {
    "id": "M21",
    "name": "세계",
    "nameEn": "The World",
    "suit": "Major",
    "icon": "🌐",
    "uprightKeywords": "완전한 완결, 성취와 통합, 한 주기의 성공적 마무리",
    "reversedKeywords": "미완성, 마지막 문턱에서의 지연, 미련과 지체"
  },
  {
    "id": "W1",
    "name": "완드 에이스",
    "nameEn": "Ace of Wands",
    "suit": "Wands",
    "icon": "🔥",
    "uprightKeywords": "새로운 열정의 불꽃, 사업/이직의 기회, 창의적 영감, 돌파구",
    "reversedKeywords": "의지박약, 추진력 저하, 시작의 지연, 번아웃"
  },
  {
    "id": "W2",
    "name": "완드 2",
    "nameEn": "Two of Wands",
    "suit": "Wands",
    "icon": "🧭",
    "uprightKeywords": "미래에 대한 원대한 계획, 확장을 향한 포부, 안목",
    "reversedKeywords": "시야 협소, 계획 부실, 미지의 세계에 대한 두려움"
  },
  {
    "id": "W3",
    "name": "완드 3",
    "nameEn": "Three of Wands",
    "suit": "Wands",
    "icon": "🌅",
    "uprightKeywords": "결실을 바라보는 시선, 항해의 시작, 협력과 확장, 순조로운 전망",
    "reversedKeywords": "계획 지연, 소통 부재, 기대에 못 미치는 결과"
  },
  {
    "id": "W4",
    "name": "완드 4",
    "nameEn": "Four of Wands",
    "suit": "Wands",
    "icon": "🏰",
    "uprightKeywords": "확고한 안정, 보금자리, 축하와 환희, 화목한 결실",
    "reversedKeywords": "가정 내 불화, 불안정한 기반, 연기된 축하"
  },
  {
    "id": "W5",
    "name": "완드 5",
    "nameEn": "Five of Wands",
    "suit": "Wands",
    "icon": "🥊",
    "uprightKeywords": "치열한 밥그릇 싸움, 소모적 경쟁, 사공이 많은 혼란, 의견 충돌",
    "reversedKeywords": "경쟁의 마무리, 타협과 협의, 갈등 완화"
  },
  {
    "id": "W6",
    "name": "완드 6",
    "nameEn": "Six of Wands",
    "suit": "Wands",
    "icon": "🏆",
    "uprightKeywords": "승리와 인정, 대중의 찬사, 자신감 있는 금의환향",
    "reversedKeywords": "오만함, 공로 인정 실패, 일시적 패배, 지연된 성공"
  },
  {
    "id": "W7",
    "name": "완드 7",
    "nameEn": "Seven of Wands",
    "suit": "Wands",
    "icon": "🛡️",
    "uprightKeywords": "고립무원의 방어전, 사방에서 몰려드는 압박에 맞서는 용기, 주관 유지",
    "reversedKeywords": "벅찬 압박, 방어선 붕괴, 굴복과 포기"
  },
  {
    "id": "W8",
    "name": "완드 8",
    "nameEn": "Eight of Wands",
    "suit": "Wands",
    "icon": "🚀",
    "uprightKeywords": "급격한 급물살, 신속한 합격/소식, 빠른 전개, 순조로운 진척",
    "reversedKeywords": "소통 장애, 성급한 실수, 패닉, 계획의 지연"
  },
  {
    "id": "W9",
    "name": "완드 9",
    "nameEn": "Nine of Wands",
    "suit": "Wands",
    "icon": "🤕",
    "uprightKeywords": "부상투혼, 불굴의 인내, 경계심 유지, 마지막 방어선",
    "reversedKeywords": "지쳐 쓰러짐, 방심으로 인한 타격, 만성 번아웃"
  },
  {
    "id": "W10",
    "name": "완드 10",
    "nameEn": "Ten of Wands",
    "suit": "Wands",
    "icon": "🏋️",
    "uprightKeywords": "과도한 중압감, 감당하기 벅찬 일거리, 어깨를 짓누르는 짐, 탈진 직전",
    "reversedKeywords": "짐 내려놓기, 위임과 분담, 과로 탈피, 부담 경감"
  },
  {
    "id": "W-Page",
    "name": "완드 시종",
    "nameEn": "Page of Wands",
    "suit": "Wands",
    "icon": "📜",
    "uprightKeywords": "호기심 어린 탐색, 열정적인 아이디어, 반가운 시작의 전령",
    "reversedKeywords": "변덕, 미숙한 계획, 흥미 상실, 미완성"
  },
  {
    "id": "W-Knight",
    "name": "완드 기사",
    "nameEn": "Knight of Wands",
    "suit": "Wands",
    "icon": "🐎",
    "uprightKeywords": "돌진하는 행동력, 열정적인 추진, 모험심, 당당함",
    "reversedKeywords": "무모한 폭주, 성급한 충동, 변덕스러운 열정"
  },
  {
    "id": "W-Queen",
    "name": "완드 여왕",
    "nameEn": "Queen of Wands",
    "suit": "Wands",
    "icon": "🌻",
    "uprightKeywords": "따뜻한 카리스마, 독립심, 생명력 넘치는 매력, 당당한 리더십",
    "reversedKeywords": "질투, 독선, 히스테리, 성급한 간섭"
  },
  {
    "id": "W-King",
    "name": "완드 왕",
    "nameEn": "King of Wands",
    "suit": "Wands",
    "icon": "👑",
    "uprightKeywords": "비전 있는 리더, 강력한 결단력, 영감을 주는 총괄자",
    "reversedKeywords": "독재적 태도, 성급한 결정, 완고함, 편협함"
  },
  {
    "id": "C1",
    "name": "컵 에이스",
    "nameEn": "Ace of Cups",
    "suit": "Cups",
    "icon": "🌊",
    "uprightKeywords": "넘쳐흐르는 감정, 새로운 사랑의 시작, 마음의 평화, 영적 충만",
    "reversedKeywords": "감정의 메마름, 닫힌 마음, 실연의 상처, 슬픔"
  },
  {
    "id": "C2",
    "name": "컵 2",
    "nameEn": "Two of Cups",
    "suit": "Cups",
    "icon": "🥂",
    "uprightKeywords": "진실된 교감, 영혼의 파트너십, 상호 존중과 화합, 연인의 결합",
    "reversedKeywords": "소통 단절, 오해와 불화, 일방적인 관계, 짝사랑"
  },
  {
    "id": "C3",
    "name": "컵 3",
    "nameEn": "Three of Cups",
    "suit": "Cups",
    "icon": "🎉",
    "uprightKeywords": "기쁜 축하, 우정과 연대, 풍요로운 친교 모임, 기쁨의 공유",
    "reversedKeywords": "삼각관계, 소외감, 지나친 방종과 험담"
  },
  {
    "id": "C4",
    "name": "컵 4",
    "nameEn": "Four of Cups",
    "suit": "Cups",
    "icon": "🪷",
    "uprightKeywords": "권태감, 내면 성찰, 외부 기회에 대한 무관심, 조용한 휴식",
    "reversedKeywords": "새로운 동기부여, 슬럼프 탈출, 주변의 호의 수용"
  },
  {
    "id": "C5",
    "name": "컵 5",
    "nameEn": "Five of Cups",
    "suit": "Cups",
    "icon": "🥀",
    "uprightKeywords": "상실에 대한 비탄, 엎질러진 물에 대한 후회, 과거의 슬픔",
    "reversedKeywords": "남은 희망 발견, 슬픔의 치유, 새로운 인연으로의 전환"
  },
  {
    "id": "C6",
    "name": "컵 6",
    "nameEn": "Six of Cups",
    "suit": "Cups",
    "icon": "🌸",
    "uprightKeywords": "순수한 옛 추억, 과거 인연과의 재회, 포근한 향수, 동심",
    "reversedKeywords": "과거에 얽매임, 현실 감각 결여, 미성숙한 태도"
  },
  {
    "id": "C7",
    "name": "컵 7",
    "nameEn": "Seven of Cups",
    "suit": "Cups",
    "icon": "🌫️",
    "uprightKeywords": "무수한 환상과 선택지, 백일몽, 현실성 부족, 상상력",
    "reversedKeywords": "현실 자각, 허상에서 깨어남, 명확한 우선순위 설정"
  },
  {
    "id": "C8",
    "name": "컵 8",
    "nameEn": "Eight of Cups",
    "suit": "Cups",
    "icon": "🌑",
    "uprightKeywords": "지친 마음으로 뒤돌아섬, 미련 없는 결별, 더 높은 가치를 향한 여정",
    "reversedKeywords": "떠나지 못하는 미련, 잘못된 관계의 지속, 방황"
  },
  {
    "id": "C9",
    "name": "컵 9",
    "nameEn": "Nine of Cups",
    "suit": "Cups",
    "icon": "🌈",
    "uprightKeywords": "소원 성취(위시 카드), 정서적 만족, 자족감, 행복",
    "reversedKeywords": "과도한 탐닉, 허세와 자기만족, 내면의 공허"
  },
  {
    "id": "C10",
    "name": "컵 10",
    "nameEn": "Ten of Cups",
    "suit": "Cups",
    "icon": "🏡",
    "uprightKeywords": "완전한 행복, 조화로운 가정, 평화로운 결합, 영원한 안식",
    "reversedKeywords": "가정 내 불화, 기대의 붕괴, 깨진 유대감"
  },
  {
    "id": "C-Page",
    "name": "컵 시종",
    "nameEn": "Page of Cups",
    "suit": "Cups",
    "icon": "🐟",
    "uprightKeywords": "순수한 감수성, 다정한 제안, 감성적 메시지, 따뜻한 호의",
    "reversedKeywords": "감정의 미성숙, 변덕, 과장된 감정, 실망"
  },
  {
    "id": "C-Knight",
    "name": "컵 기사",
    "nameEn": "Knight of Cups",
    "suit": "Cups",
    "icon": "💌",
    "uprightKeywords": "로맨틱한 프러포즈, 매력적인 유혹, 감미로운 제안, 낭만적 설렘",
    "reversedKeywords": "감언이설, 바람기, 우유부단함, 실망스러운 제안"
  },
  {
    "id": "C-Queen",
    "name": "컵 여왕",
    "nameEn": "Queen of Cups",
    "suit": "Cups",
    "icon": "🕊️",
    "uprightKeywords": "깊은 공감력, 자애로움, 직관적 지혜, 치유하는 사랑",
    "reversedKeywords": "감정의 기복, 지나친 의존, 현실 도피, 감정적 조종"
  },
  {
    "id": "C-King",
    "name": "컵 왕",
    "nameEn": "King of Cups",
    "suit": "Cups",
    "icon": "🔱",
    "uprightKeywords": "감정의 절제와 성숙, 너그러운 포용력, 지혜로운 카운슬러",
    "reversedKeywords": "감정 통제 상실, 변덕, 이중적인 태도, 차가움"
  },
  {
    "id": "S1",
    "name": "검 에이스",
    "nameEn": "Ace of Swords",
    "suit": "Swords",
    "icon": "🗡️",
    "uprightKeywords": "명쾌한 진실, 날카로운 결단력, 승리의 지혜, 새로운 통찰",
    "reversedKeywords": "가혹한 언행, 판단 착오, 혼란과 불확실성"
  },
  {
    "id": "S2",
    "name": "검 2",
    "nameEn": "Two of Swords",
    "suit": "Swords",
    "icon": "⚖️",
    "uprightKeywords": "팽팽한 교착 상태, 눈가림 속 균형, 결단 회피, 일시적 휴전",
    "reversedKeywords": "눈가리개 벗기, 진실 직시, 피할 수 없는 결정"
  },
  {
    "id": "S3",
    "name": "검 3",
    "nameEn": "Three of Swords",
    "suit": "Swords",
    "icon": "💔",
    "uprightKeywords": "가슴을 찌르는 상처, 실연과 비통함, 삼각관계의 아픔, 이별 통보",
    "reversedKeywords": "상처의 서서히 아묾, 용서와 회복, 고통 극복, 화해"
  },
  {
    "id": "S4",
    "name": "검 4",
    "nameEn": "Four of Swords",
    "suit": "Swords",
    "icon": "🕯️",
    "uprightKeywords": "치유의 휴식, 고요한 안식, 마인드 리셋, 폭풍 전의 평온",
    "reversedKeywords": "재충전 완료, 활동 재개, 고립 탈출과 용기"
  },
  {
    "id": "S5",
    "name": "검 5",
    "nameEn": "Five of Swords",
    "suit": "Swords",
    "icon": "⚔️",
    "uprightKeywords": "상처뿐인 승리, 자존심 싸움의 파국, 비열한 갈등, 적대감과 비난",
    "reversedKeywords": "갈등의 종결, 화해의 제스처, 손실 인정, 후회"
  },
  {
    "id": "S6",
    "name": "검 6",
    "nameEn": "Six of Swords",
    "suit": "Swords",
    "icon": "⛵",
    "uprightKeywords": "난관 탈출, 잔잔한 물가로의 이동, 치유와 회복의 여정, 이사",
    "reversedKeywords": "과거에 얽매임, 벗어나지 못하는 정체, 여정의 지연"
  },
  {
    "id": "S7",
    "name": "검 7",
    "nameEn": "Seven of Swords",
    "suit": "Swords",
    "icon": "🦊",
    "uprightKeywords": "은밀한 속임수, 꼼수와 책략, 뒤통수치는 배신, 위험한 전략",
    "reversedKeywords": "비밀의 탄로, 양심의 가책, 정직한 고백, 위기 모면"
  },
  {
    "id": "S8",
    "name": "검 8",
    "nameEn": "Eight of Swords",
    "suit": "Swords",
    "icon": "🕸️",
    "uprightKeywords": "사방이 갇힌 감옥, 무력감과 피해의식, 진퇴양난, 제약",
    "reversedKeywords": "속박 풀기, 새로운 시야, 해결의 실마리 발견, 자유"
  },
  {
    "id": "S9",
    "name": "검 9",
    "nameEn": "Nine of Swords",
    "suit": "Swords",
    "icon": "😭",
    "uprightKeywords": "한밤중의 악몽, 극심한 불면증과 불안, 자책감, 밤잠을 설치는 고통",
    "reversedKeywords": "두려움 극복, 희망의 서광, 불안 완화, 타인의 도움"
  },
  {
    "id": "S10",
    "name": "검 10",
    "nameEn": "Ten of Swords",
    "suit": "Swords",
    "icon": "🪦",
    "uprightKeywords": "완전한 파국, 등에 꽂힌 비수, 바닥을 친 절망, 관계의 종말",
    "reversedKeywords": "최악을 통과함, 새로운 여명의 시작, 고통의 끝과 회복"
  },
  {
    "id": "S-Page",
    "name": "검 시종",
    "nameEn": "Page of Swords",
    "suit": "Swords",
    "icon": "🔍",
    "uprightKeywords": "예리한 관찰력, 정보 수집, 경계 태세, 날카로운 지적 호기심",
    "reversedKeywords": "험담, 가벼운 입, 미숙한 공격성, 의심병"
  },
  {
    "id": "S-Knight",
    "name": "검 기사",
    "nameEn": "Knight of Swords",
    "suit": "Swords",
    "icon": "🌪️",
    "uprightKeywords": "거침없는 돌진, 예리한 비판, 신속한 행동, 용맹",
    "reversedKeywords": "독설, 무모한 충동, 파괴적 언쟁, 패배"
  },
  {
    "id": "S-Queen",
    "name": "검 여왕",
    "nameEn": "Queen of Swords",
    "suit": "Swords",
    "icon": "❄️",
    "uprightKeywords": "냉철한 지성, 명확한 독립심, 사리분별, 명쾌한 판단",
    "reversedKeywords": "차가운 냉혹함, 편견, 고립, 지나친 비판"
  },
  {
    "id": "S-King",
    "name": "검 왕",
    "nameEn": "King of Swords",
    "suit": "Swords",
    "icon": "⚖️",
    "uprightKeywords": "엄격한 진실, 지적 권위, 냉철한 전략가, 공정한 판단력",
    "reversedKeywords": "독선, 냉담한 잔혹함, 교만한 권력 남용"
  },
  {
    "id": "P1",
    "name": "펜타클 에이스",
    "nameEn": "Ace of Pentacles",
    "suit": "Pentacles",
    "icon": "🪙",
    "uprightKeywords": "실질적인 재물의 씨앗, 새로운 수입의 기회, 확실한 토대, 번영",
    "reversedKeywords": "기회 상실, 재정적 불안정, 헛된 투자, 과소비"
  },
  {
    "id": "P2",
    "name": "펜타클 2",
    "nameEn": "Two of Pentacles",
    "suit": "Pentacles",
    "icon": "🤹",
    "uprightKeywords": "위태로운 줄타기, 유연한 대처, 자금 회전, 다재다능",
    "reversedKeywords": "균형 상실, 자금 경색, 과부하, 무책임한 회피"
  },
  {
    "id": "P3",
    "name": "펜타클 3",
    "nameEn": "Three of Pentacles",
    "suit": "Pentacles",
    "icon": "📐",
    "uprightKeywords": "전문성 인정, 팀워크와 협업, 장인 정신, 기술적 성취, 승진",
    "reversedKeywords": "동료 간 불화, 실력 부족, 미완성, 퀄리티 저하"
  },
  {
    "id": "P4",
    "name": "펜타클 4",
    "nameEn": "Four of Pentacles",
    "suit": "Pentacles",
    "icon": "🔒",
    "uprightKeywords": "지나친 소유욕, 안전제일주의, 자금 동결, 손실 공포",
    "reversedKeywords": "과소비로 인한 누수, 충동 지출, 재정 통제력 상실"
  },
  {
    "id": "P5",
    "name": "펜타클 5",
    "nameEn": "Five of Pentacles",
    "suit": "Pentacles",
    "icon": "❄️",
    "uprightKeywords": "눈보라 속 빈곤, 재정적 혹한기, 도움받지 못하는 외로움",
    "reversedKeywords": "회복의 서광, 구호의 손길, 희망의 불씨, 건강 회복"
  },
  {
    "id": "P6",
    "name": "펜타클 6",
    "nameEn": "Six of Pentacles",
    "suit": "Pentacles",
    "icon": "⚖️",
    "uprightKeywords": "너그러운 베풂과 나눔, 공정한 보상, 자비, 도움을 받음",
    "reversedKeywords": "불평등한 조건, 갑을관계의 횡포, 빚, 위선적 베풂"
  },
  {
    "id": "P7",
    "name": "펜타클 7",
    "nameEn": "Seven of Pentacles",
    "suit": "Pentacles",
    "icon": "🌱",
    "uprightKeywords": "수확의 재평가, 기다림과 숙고, 노력의 결실 점검, 중간점검",
    "reversedKeywords": "노력 낭비, 성급한 포기, 기대에 못 미친 결실"
  },
  {
    "id": "P8",
    "name": "펜타클 8",
    "nameEn": "Eight of Pentacles",
    "suit": "Pentacles",
    "icon": "🔨",
    "uprightKeywords": "묵묵한 장인, 꾸준한 성실함, 기술 연마, 디테일한 노력",
    "reversedKeywords": "나태, 기술 부족, 단조로운 일에 대한 염증"
  },
  {
    "id": "P9",
    "name": "펜타클 9",
    "nameEn": "Nine of Pentacles",
    "suit": "Pentacles",
    "icon": "🍇",
    "uprightKeywords": "우아한 풍요, 경제적 자립, 노력 끝의 여유, 정원 속 안락",
    "reversedKeywords": "낭비벽, 겉치레에 치중함, 재정적 불안, 외로운 성공"
  },
  {
    "id": "P10",
    "name": "펜타클 10",
    "nameEn": "Ten of Pentacles",
    "suit": "Pentacles",
    "icon": "🗝️",
    "uprightKeywords": "견고한 부의 축적, 가문의 번영, 영구적 안정, 유산, 안정된 집안",
    "reversedKeywords": "가족 간 금전 갈등, 상속 분쟁, 전통의 붕괴"
  },
  {
    "id": "P-Page",
    "name": "펜타클 시종",
    "nameEn": "Page of Pentacles",
    "suit": "Pentacles",
    "icon": "📖",
    "uprightKeywords": "배움의 자세, 현실적인 목표 설정, 신중한 시작, 성실함",
    "reversedKeywords": "나태, 집중력 부족, 비현실적인 돈벌이 망상"
  },
  {
    "id": "P-Knight",
    "name": "펜타클 기사",
    "nameEn": "Knight of Pentacles",
    "suit": "Pentacles",
    "icon": "🐂",
    "uprightKeywords": "흔들림 없는 우직함, 철저한 책임감, 성실한 전진, 신뢰",
    "reversedKeywords": "고집불통, 지나친 느림, 융통성 결여, 게으름"
  },
  {
    "id": "P-Queen",
    "name": "펜타클 여왕",
    "nameEn": "Queen of Pentacles",
    "suit": "Pentacles",
    "icon": "🌾",
    "uprightKeywords": "따뜻한 현실적 보살핌, 실속 있는 관리, 모성애, 풍요로움",
    "reversedKeywords": "낭비벽, 물질적 탐욕, 의존성, 인색함"
  },
  {
    "id": "P-King",
    "name": "펜타클 왕",
    "nameEn": "King of Pentacles",
    "suit": "Pentacles",
    "icon": "👑",
    "uprightKeywords": "성공한 자산가, 현실적 성취의 정점, 안정된 경영자, 든든함",
    "reversedKeywords": "탐욕스러운 독점, 물질만능주의, 완고한 수전노"
  }
];

    // ==========================================
    // 2. 4개의 운명 원석(스톤) 정의 (YouTube Pick-A-Card 스타일)
    // ==========================================
    const STONES = [
        {
            id: 1,
            bundleName: "1번 묶음",
            stoneName: "로즈쿼츠 (Rose Quartz)",
            stoneMeaning: "사랑과 자존감, 정서적 치유의 핑크빛 원석",
            stoneIcon: "🌸",
            stoneColor: "#f472b6",
            accentClass: "stone-rose"
        },
        {
            id: 2,
            bundleName: "2번 묶음",
            stoneName: "자수정 (Amethyst)",
            stoneMeaning: "깊은 영감, 직관과 내면 평화의 보랏빛 원석",
            stoneIcon: "💜",
            stoneColor: "#c084fc",
            accentClass: "stone-amethyst"
        },
        {
            id: 3,
            bundleName: "3번 묶음",
            stoneName: "호안석 (Tiger's Eye)",
            stoneMeaning: "용기와 결단력, 자신감과 돌파구의 황금빛 원석",
            stoneIcon: "💛",
            stoneColor: "#fbbf24",
            accentClass: "stone-tiger"
        },
        {
            id: 4,
            bundleName: "4번 묶음",
            stoneName: "라피스라줄리 (Lapis Lazuli)",
            stoneMeaning: "진실과 지혜, 명료한 통찰의 청금석",
            stoneIcon: "💙",
            stoneColor: "#60a5fa",
            accentClass: "stone-lapis"
        }
    ];

    // ==========================================
    // 3. 6단계 유기적 스토리텔링 스프레드 슬롯
    // ==========================================
    const SPREAD_SLOTS = [
        { num: 1, label: "현재 상황과 시작점", tag: "1. 현재 상황", desc: "고민의 시작점 및 표면적 흐름", icon: "🌿" },
        { num: 2, label: "숨겨진 원인과 내면 심리", tag: "2. 숨겨진 원인", desc: "겉으로 보이지 않는 무의식적 원인", icon: "🔍" },
        { num: 3, label: "마주한 시련 혹은 주의점", tag: "3. 시련 / 주의점", desc: "경계해야 할 맹점이나 갈등 요소", icon: "⚠️" },
        { num: 4, label: "주변 환경과 외부 에너지", tag: "4. 주변 환경", desc: "상황에 작용하는 환경 및 대인관계", icon: "🌍" },
        { num: 5, label: "해결의 열쇠와 핵심 조언", tag: "5. 해결의 열쇠", desc: "문제를 지혜롭게 풀 실천적 조언", icon: "🗝️" },
        { num: 6, label: "최종 도달할 미래의 결실", tag: "6. 미래의 결실", desc: "여정이 향해가는 궁극적 결과와 변화", icon: "✨" }
    ];

    // ==========================================
    // 4. 운세 테마 및 추천 질문 데이터
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

    // ==========================================
    // 5. 상태 관리 변수
    // ==========================================
    let currentCategory = "💖 연애 / 애정운";
    let questionCount = 1;
    const MAX_QUESTIONS = 10;
    let generatedMarkdown = '';

    // 4개 묶음 데이터: [ [card0..card5], [card6..card11], [card12..card17], [card18..card23] ]
    let bundlesData = [];
    let selectedBundleIndex = null;

    // ==========================================
    // 6. 비밀번호 인증 게이트웨이 (0030, 새로고침 시 항상 재입력)
    // ==========================================
    const AUTH_PIN = "0030";
    let sessionPin = "";

    const authOverlay = document.getElementById('authOverlay');
    const authForm = document.getElementById('authForm');
    const pinInput = document.getElementById('pinInput');
    const authErrorMsg = document.getElementById('authErrorMsg');

    function unlockSalon() {
        const val = pinInput.value.trim();
        if (val === AUTH_PIN) {
            sessionPin = val;
            authErrorMsg.classList.add('hidden');
            authOverlay.classList.add('unlocked');
            setTimeout(() => {
                authOverlay.style.display = 'none';
            }, 400);
        } else {
            authErrorMsg.textContent = '비밀번호가 일치하지 않습니다.';
            authErrorMsg.classList.remove('hidden');
            pinInput.classList.add('shake');
            setTimeout(() => pinInput.classList.remove('shake'), 450);
            pinInput.value = '';
            pinInput.focus();
        }
    }

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            unlockSalon();
        });
    }

    if (pinInput) {
        pinInput.addEventListener('input', () => {
            if (pinInput.value.length === 4) {
                unlockSalon();
            }
        });
        setTimeout(() => pinInput.focus(), 150);
    }

    // ==========================================
    // 7. DOM 요소 캐싱
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
    const casinoShuffleArea = document.getElementById('casinoShuffleArea');
    const shuffleStatusLabel = document.getElementById('shuffleStatusLabel');
    const fourBundlesGrid = document.getElementById('fourBundlesGrid');
    const revealedSpreadSection = document.getElementById('revealedSpreadSection');
    const chosenStoneHeaderBadge = document.getElementById('chosenStoneHeaderBadge');
    const sixSpreadGrid = document.getElementById('sixSpreadGrid');
    const reshuffleBtn = document.getElementById('reshuffleBtn');
    const submitReadingBtn = document.getElementById('submitReadingBtn');
    const step2Error = document.getElementById('step2Error');

    // Step 3 / Result
    const loadingEl = document.getElementById('loading');
    const loadingText = document.getElementById('loadingText');
    const resultContainer = document.getElementById('resultContainer');
    const resultBundleBadge = document.getElementById('resultBundleBadge');
    const resultThemeBadge = document.getElementById('resultThemeBadge');
    const chosenCardsGrid = document.getElementById('chosenCardsGrid');
    const sajuProfileCard = document.getElementById('sajuProfileCard');
    const resultContent = document.getElementById('resultContent');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const restartBtn = document.getElementById('restartBtn');

    // ==========================================
    // 7. 카테고리 & 추천 질문 처리
    // ==========================================
    function updateCategoryUI(categoryKey) {
        currentCategory = categoryKey;
        const chips = categoryGrid.querySelectorAll('.category-chip');
        chips.forEach(chip => {
            chip.classList.toggle('active', chip.dataset.category === categoryKey);
        });

        const config = THEMES_CONFIG[categoryKey];
        if (!config) return;

        const firstInput = questionsContainer.querySelector('.question-input');
        if (firstInput && !firstInput.value.trim()) {
            firstInput.placeholder = config.placeholder;
        }

        recommendedQuestions.innerHTML = '';
        config.suggestions.forEach(text => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'recommend-chip';
            btn.textContent = text;
            btn.addEventListener('click', () => applySuggestedQuestion(text));
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
        updateCategoryUI(btn.dataset.category);
    });

    // 질문 추가/삭제 관리
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
    // 8. STEP 1 -> STEP 2 (카지노 셔플 & 4묶음 생성)
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

        const birthInfo = birthInfoInput.value.trim();
        if (!birthInfo) {
            showError(step1Error, '사주와 타로의 균형 있는 분석을 위해 생년월일을 입력해 주세요.', birthInfoInput);
            return;
        }

        if (questions.length === 0) {
            showError(step1Error, '최소 1개 이상의 질문을 작성해 주세요.', inputs[0]);
            return;
        }

        summaryTheme.textContent = currentCategory;
        summaryUser.textContent = `${userName}님의 질문 접수`;
        summaryQuestionsList.innerHTML = '';
        questions.forEach((q, idx) => {
            const li = document.createElement('li');
            li.textContent = `Q${idx + 1}. ${q}`;
            summaryQuestionsList.appendChild(li);
        });

        step1Section.classList.add('hidden');
        step2Section.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        step2Section.scrollIntoView({ behavior: 'smooth' });

        startCasinoShuffle();
    });

    backToStep1Btn.addEventListener('click', () => {
        step2Section.classList.add('hidden');
        step1Section.classList.remove('hidden');
        step1Section.scrollIntoView({ behavior: 'smooth' });
    });

    // ==========================================
    // 9. 카지노 셔플 & 4개 묶음 분배 로직
    // ==========================================
    function startCasinoShuffle() {
        selectedBundleIndex = null;
        revealedSpreadSection.classList.add('hidden');
        submitReadingBtn.disabled = true;
        submitReadingBtn.classList.add('disabled-btn');
        submitReadingBtn.textContent = '✨ 묶음을 선택해 주세요 (1개 선택 필요)';
        step2Error.classList.add('hidden');

        // 카지노 셔플 애니메이션 시작
        casinoShuffleArea.classList.add('shuffling');
        shuffleStatusLabel.innerHTML = '🎰 <span class="pulse-text">78장의 타로 덱을 카지노 리플 & 워시 셔플로 고르게 뒤섞는 중입니다...</span>';

        // 78장 덱 무작위 셔플 (Fisher-Yates)
        const shuffledDeck = [...TAROT_DECK];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
        }

        // 24장의 카드를 추출하여 4묶음(각 6장)으로 분배
        bundlesData = [];
        for (let b = 0; b < 4; b++) {
            const bundleCards = shuffledDeck.slice(b * 6, (b + 1) * 6).map((card, idx) => {
                // 75% 정방향, 25% 역방향
                const isUpright = Math.random() > 0.25;
                return {
                    slot: SPREAD_SLOTS[idx],
                    data: card,
                    direction: isUpright ? "정방향" : "역방향"
                };
            });
            bundlesData.push(bundleCards);
        }

        // 셔플 애니메이션 후 4개 묶음 렌더링 (0.8초 후)
        setTimeout(() => {
            casinoShuffleArea.classList.remove('shuffling');
            shuffleStatusLabel.innerHTML = '✨ <strong>4개의 운명 묶음(각 6장)</strong>으로 나뉘었습니다. 마음을 집중하여 원석을 선택해 주세요.';
            renderFourBundlesUI();
        }, 800);
    }

    // 4개 묶음 UI 렌더링
    function renderFourBundlesUI() {
        fourBundlesGrid.innerHTML = '';

        STONES.forEach((stone, idx) => {
            const cardEl = document.createElement('div');
            cardEl.className = `bundle-card ${stone.accentClass}`;
            cardEl.dataset.bundleIndex = idx;

            cardEl.innerHTML = `
                <div class="bundle-deck-stack">
                    <div class="deck-layer layer-3"></div>
                    <div class="deck-layer layer-2"></div>
                    <div class="deck-layer layer-1">
                        <div class="bundle-stone-holder">
                            <div class="bundle-stone-glow" style="box-shadow: 0 0 25px ${stone.stoneColor};"></div>
                            <span class="bundle-stone-icon">${stone.stoneIcon}</span>
                        </div>
                        <div class="bundle-card-back-ornament">
                            <span class="bundle-rune">☾ ✦ ☽</span>
                            <span class="bundle-card-count">6 Cards</span>
                        </div>
                    </div>
                </div>
                <div class="bundle-meta">
                    <span class="bundle-num-badge">${stone.bundleName}</span>
                    <h3 class="bundle-stone-name">${stone.stoneName}</h3>
                    <p class="bundle-stone-desc">${stone.stoneMeaning}</p>
                    <button type="button" class="btn-select-bundle">선택하기</button>
                </div>
            `;

            cardEl.addEventListener('click', () => {
                selectBundle(idx);
            });

            fourBundlesGrid.appendChild(cardEl);
        });
    }

    // ==========================================
    // 10. 묶음 선택 및 6장 카드 시네마틱 오픈
    // ==========================================
    function selectBundle(bundleIndex) {
        selectedBundleIndex = bundleIndex;
        const stone = STONES[bundleIndex];
        const sixCards = bundlesData[bundleIndex];

        // 4개 묶음 카드 상태 갱신
        const cards = fourBundlesGrid.querySelectorAll('.bundle-card');
        cards.forEach((el, idx) => {
            const isSelected = idx === bundleIndex;
            el.classList.toggle('selected', isSelected);
            const btn = el.querySelector('.btn-select-bundle');
            if (btn) {
                btn.textContent = isSelected ? '✓ 선택됨' : '선택하기';
            }
        });

        // 6장 카드 펼침 섹션 활성화
        chosenStoneHeaderBadge.innerHTML = `${stone.stoneIcon} <strong>${stone.bundleName}: ${stone.stoneName}</strong> 선택됨`;
        revealedSpreadSection.classList.remove('hidden');

        // 6장 카드 그리드 렌더링
        renderRevealedSpreadUI(sixCards, stone);

        // 버튼 활성화
        submitReadingBtn.disabled = false;
        submitReadingBtn.classList.remove('disabled-btn');
        submitReadingBtn.innerHTML = `✨ <strong>[${stone.stoneName}]</strong> 6장의 카드로 최종 운세 리딩 보기`;

        // 부드러운 스크롤 이동
        revealedSpreadSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 선택된 6장 카드 UI 렌더링 및 3D 플립 애니메이션
    function renderRevealedSpreadUI(sixCards, stone) {
        sixSpreadGrid.innerHTML = '';

        sixCards.forEach((c, idx) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'spread-card-item';
            cardEl.style.animationDelay = `${idx * 100}ms`;

            const isUpright = c.direction === "정방향";
            const dirClass = isUpright ? "upright" : "reversed";
            const dirText = isUpright ? "정방향" : "역방향";
            const keywords = isUpright ? c.data.uprightKeywords : c.data.reversedKeywords;

            cardEl.innerHTML = `
                <div class="spread-slot-header">
                    <span class="slot-num-icon">${c.slot.icon}</span>
                    <span class="slot-tag-title">${c.slot.label}</span>
                </div>
                <div class="spread-card-3d">
                    <div class="card-inner-3d flipped">
                        <!-- 카드 앞면 -->
                        <div class="card-face card-front">
                            <div class="card-filigree-frame"></div>
                            <div class="card-front-header">
                                <span class="front-slot-tag">${c.slot.tag}</span>
                                <span class="card-dir-tag ${dirClass}">${dirText}</span>
                            </div>
                            <div class="card-front-body">
                                <div class="card-front-icon">${c.data.icon}</div>
                                <div class="card-front-title">${c.data.name}</div>
                                <div class="card-front-en">${c.data.nameEn}</div>
                            </div>
                            <div class="card-front-footer">
                                <div class="card-front-keywords">${keywords}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            sixSpreadGrid.appendChild(cardEl);
        });
    }

    // 다시 셔플 버튼
    reshuffleBtn.addEventListener('click', () => {
        startCasinoShuffle();
    });

    // ==========================================
    // 11. 최종 운세 리딩 요청 (API 연동)
    // ==========================================
    submitReadingBtn.addEventListener('click', async () => {
        if (selectedBundleIndex === null) {
            showError(step2Error, '원석 묶음 4개 중 1가지를 선택해 주세요.');
            return;
        }

        const userName = userNameInput.value.trim();
        const birthInfo = birthInfoInput.value.trim();
        const toneVal = toneSelect.value;
        const promptTypeVal = promptType.value;
        const useSearchVal = useSearch.checked;

        const inputs = Array.from(questionsContainer.querySelectorAll('.question-input'));
        const questions = inputs.map(i => i.value.trim()).filter(Boolean);

        const chosenStone = STONES[selectedBundleIndex];
        const chosenCards = bundlesData[selectedBundleIndex];

        // 6장 카드 페이로드 포맷팅
        const cardsPayload = chosenCards.map((c, idx) => {
            const isUpright = c.direction === "정방향";
            return {
                slotNum: idx + 1,
                position: c.slot.label,
                name: `${c.data.name} (${c.data.nameEn})`,
                direction: c.direction,
                keywords: isUpright ? c.data.uprightKeywords : c.data.reversedKeywords,
                icon: c.data.icon
            };
        });

        // UI 상태: 로딩 시작
        loadingEl.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        submitReadingBtn.disabled = true;
        reshuffleBtn.disabled = true;
        loadingEl.scrollIntoView({ behavior: 'smooth' });

        const loadingQuotes = [
            "타로 마스터가 6장 카드의 유기적인 연결 흐름을 조율하고 있습니다...",
            "작위적인 반전 없이 현실과 내면의 깊은 층위를 짚어내는 중입니다...",
            "사주 명리의 기운을 마지막 조언으로 승화하여 완성된 리포트를 빚고 있습니다..."
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
                    pin: sessionPin,
                    name: userName,
                    birth_info: birthInfo,
                    category: currentCategory,
                    tone: toneVal,
                    prompt_type: promptTypeVal,
                    use_search: useSearchVal,
                    questions: questions,
                    bundle: chosenStone,
                    cards: cardsPayload
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || '운세 리딩을 불러오지 못했습니다.');
            }

            generatedMarkdown = data.result;
            resultThemeBadge.textContent = currentCategory;
            resultBundleBadge.innerHTML = `${chosenStone.stoneIcon} ${chosenStone.stoneName}`;

            // 상단 6장 카드 요약 배너 렌더링
            renderChosenCardsBanner(cardsPayload);

            // 사주 프로필 요약 카드 (마지막 조언용)
            if (data.saju) {
                document.getElementById('sajuUserName').textContent = `${userName}님의 명리학 원국`;
                document.getElementById('sajuGanji').textContent = data.saju.ganji_year;
                document.getElementById('sajuAnimal').textContent = data.saju.animal;
                document.getElementById('sajuElement').textContent = data.saju.year_element;
                document.getElementById('sajuSeason').textContent = `${data.saju.season} [${data.saju.season_element}]`;
                sajuProfileCard.classList.remove('hidden');
            } else {
                sajuProfileCard.classList.add('hidden');
            }

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

    // 결과 화면 상단 6장 카드 요약 배너
    function renderChosenCardsBanner(cards) {
        chosenCardsGrid.innerHTML = '';
        cards.forEach((c) => {
            const isUpright = c.direction === "정방향";
            const dirClass = isUpright ? "upright" : "reversed";

            const div = document.createElement('div');
            div.className = 'mini-chosen-card';
            div.innerHTML = `
                <div class="mini-pos-badge">${c.position}</div>
                <div class="mini-icon">${c.icon}</div>
                <div class="mini-name">${c.name}</div>
                <div class="mini-dir ${dirClass}">${c.direction}</div>
                <div class="mini-keywords">${c.keywords}</div>
            `;
            chosenCardsGrid.appendChild(div);
        });
    }

    // ==========================================
    // 12. 유틸리티 (복사, 다운로드, 재시작, 에러)
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
        a.download = `${userName}_tarot_reading.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    restartBtn.addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        step2Section.classList.add('hidden');
        step1Section.classList.remove('hidden');
        selectedBundleIndex = null;
        step1Section.scrollIntoView({ behavior: 'smooth' });
    });

    // 초기화: 첫 번째 카테고리 설정
    updateCategoryUI(currentCategory);
});

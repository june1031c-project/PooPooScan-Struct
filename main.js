const COLORS = {
  bg: "#0d0d14",
  surface: "#14141e",
  card: "#1a1a28",
  border: "#252538",
  borderBright: "#353550",
  accent: "#7c6ffa",
  accentDim: "#7c6ffa18",
  green: "#34d399",
  greenDim: "#34d39918",
  yellow: "#fbbf24",
  yellowDim: "#fbbf2418",
  red: "#f87171",
  redDim: "#f8717118",
  blue: "#60a5fa",
  blueDim: "#60a5fa18",
  orange: "#fb923c",
  orangeDim: "#fb923c18",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#4a5568",
};

const phases = [
  {
    id: 1,
    emoji: "🛠️",
    title: "환경 세팅",
    subtitle: "필수 프로그램 설치",
    color: COLORS.blue,
    dim: COLORS.blueDim,
    duration: "1~2일",
    steps: [
      {
        title: "왜 이 단계가 필요한가 (비즈니스 관점)",
        desc: "초기 속도와 팀 비용을 줄이는 최소 툴체인",
        items: [
          { name: "온보딩 시간 단축", note: "준님 1인 운영 기준, 환경 편차 최소화" },
          { name: "실험 속도 확보", note: "아이디어 → API 테스트까지 1일 내 도달" },
          { name: "리스크 절감", note: "표준 도구 채택으로 유지보수 비용 최소화" },
        ],
        code: null,
      },
      {
        title: "VS Code 확장 설치",
        desc: "개발 생산성을 높이는 필수 확장 프로그램",
        items: [
          { name: "Python (Microsoft)", note: "FastAPI 개발용" },
          { name: "Pylance", note: "Python 타입 체크" },
          { name: "REST Client", note: "API 테스트 (.http 파일)" },
          { name: "Docker", note: "컨테이너 관리" },
          { name: "GitLens", note: "Git 히스토리 시각화" },
        ],
        code: null,
      },
      {
        title: "Python 환경 세팅",
        desc: "FastAPI 백엔드를 위한 Python 가상환경 구성",
        items: null,
        code: `# 1. Python 3.11+ 설치 확인
python --version

# 2. 프로젝트 폴더 생성
mkdir babypoop-backend && cd babypoop-backend

# 3. 가상환경 생성 & 활성화
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\\Scripts\\activate          # Windows

# 4. 필수 패키지 설치
pip install fastapi uvicorn[standard] \\
  sqlalchemy alembic \\
  python-multipart pillow \\
  python-jose[cryptography] passlib[bcrypt] \\
  boto3 pytest httpx`,
      },
      {
        title: "Android Studio 설정",
        desc: "Kotlin + Jetpack Compose 기반 앱 개발 준비",
        items: [
          { name: "SDK: Android 14 (API 34) 설치", note: "타겟 버전" },
          { name: "Emulator: Pixel 8 Pro 생성", note: "테스트용 가상 기기" },
          { name: "Gradle: 8.x 버전 사용", note: "빌드 도구" },
          { name: "Plugin: Kotlin 최신버전 확인", note: "언어 지원" },
        ],
        code: null,
      },
      {
        title: "추가 필수 도구",
        desc: "백엔드 인프라 및 개발 지원 도구",
        items: [
          { name: "Docker Desktop", note: "PostgreSQL, Redis 로컬 실행" },
          { name: "Postman or Insomnia", note: "API 테스트 GUI" },
          { name: "Git + GitHub", note: "버전 관리" },
          { name: "DBeaver", note: "DB 시각화 도구" },
        ],
        code: null,
      },
    ],
  },
  {
    id: 2,
    emoji: "🏗️",
    title: "아키텍처 설계",
    subtitle: "전체 시스템 구조",
    color: COLORS.accent,
    dim: COLORS.accentDim,
    duration: "1일",
    steps: [
      {
        title: "왜 이 단계가 필요한가 (비즈니스 관점)",
        desc: "초기 기술 부채를 통제하고 비용 폭주를 예방",
        items: [
          { name: "구성요소 분리", note: "DB/스토리지/인증을 분리해 교체 비용 최소화" },
          { name: "보안 책임 최소화", note: "인증을 외부에 위임할 수 있는 구조" },
          { name: "확장 대비", note: "성장기 서버리스로 이동 가능한 설계" },
        ],
        code: null,
      },
      {
        title: "전체 아키텍처 다이어그램",
        desc: "Android 앱 ↔ FastAPI ↔ DB/Storage 구조",
        items: null,
        code: `┌─────────────────────────────────────────────────┐
│              Android App (Kotlin)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Camera  │  │  Input   │  │   Journal    │  │
│  │ Fragment │  │  Form    │  │  Timeline    │  │
│  └────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│       └─────────────┴────────────────┘          │
│              Repository Layer                   │
│         (Retrofit2 + OkHttp3)                   │
└──────────────────┬──────────────────────────────┘
                   │ HTTPS / Firebase ID Token
┌──────────────────▼──────────────────────────────┐
│           FastAPI Backend (Python)              │
│  /auth  /analyze  /records  /summary            │
│         ┌──────────────────────┐                │
│         │   AI Analysis Module │                │
│         │  (PIL + rule engine) │                │
│         └──────────────────────┘                │
└──────┬──────────────────────────────┬───────────┘
       │                              │
┌──────▼────────────┐        ┌────────▼────────┐
│ Supabase Postgres │        │  Cloudflare R2  │
│  (records, users) │        │  (photo storage)│
└───────────────────┘        └─────────────────┘`,
      },
      {
        title: "디렉토리 구조 (백엔드)",
        desc: "FastAPI 프로젝트 폴더 구조",
        items: null,
        code: `babypoop-backend/
├── app/
│   ├── main.py              # FastAPI 앱 진입점
│   ├── core/
│   │   ├── config.py        # 환경변수 설정
│   │   ├── security.py      # Firebase 토큰 검증
│   │   └── database.py      # DB 연결
│   ├── api/
│   │   ├── auth.py          # 회원가입/로그인
│   │   ├── analyze.py       # 대변 분석 API
│   │   ├── records.py       # 기록 CRUD
│   │   └── summary.py       # 상담용 요약 생성
│   ├── models/
│   │   ├── user.py          # DB 모델
│   │   └── record.py
│   ├── schemas/
│   │   ├── analyze.py       # Pydantic 스키마
│   │   └── record.py
│   └── services/
│       ├── analyzer.py      # 분석 로직 (Bristol 등)
│       ├── image_service.py # 이미지 처리/EXIF 제거
│       └── storage.py       # 파일 저장
├── tests/
├── alembic/                 # DB 마이그레이션
├── .env
├── requirements.txt
└── docker-compose.yml`,
      },
      {
        title: "Android 앱 구조 (MVVM)",
        desc: "Kotlin + Jetpack Compose 아키텍처",
        items: null,
        code: `app/src/main/java/com/babypoop/
├── MainActivity.kt
├── data/
│   ├── api/
│   │   ├── ApiService.kt        # Retrofit 인터페이스
│   │   └── AuthInterceptor.kt   # Firebase 토큰 헤더 추가
│   ├── repository/
│   │   ├── AnalyzeRepo.kt
│   │   └── RecordRepo.kt
│   └── local/
│       └── AppDatabase.kt       # Room DB (오프라인)
├── domain/
│   ├── model/
│   │   ├── AnalysisResult.kt
│   │   └── Record.kt
│   └── usecase/
│       └── AnalyzeUseCase.kt
└── ui/
    ├── capture/
    │   ├── CaptureScreen.kt     # 카메라/업로드
    │   └── CaptureViewModel.kt
    ├── result/
    │   ├── ResultScreen.kt      # 분석 결과
    │   └── ResultViewModel.kt
    ├── journal/
    │   └── JournalScreen.kt     # 기록 타임라인
    └── components/
        ├── RiskBadge.kt
        └── BristolPicker.kt`,
      },
    ],
  },
  {
    id: 3,
    emoji: "⚡",
    title: "백엔드 개발",
    subtitle: "FastAPI 서버 구현",
    color: COLORS.green,
    dim: COLORS.greenDim,
    duration: "1~2주",
    steps: [
      {
        title: "왜 이 단계가 필요한가 (비즈니스 관점)",
        desc: "핵심 가치(분석 결과) 전달을 위한 최소 백엔드",
        items: [
          { name: "검증 가능한 API", note: "앱과 분리된 서버 로직으로 신뢰성 확보" },
          { name: "기능 확장 기반", note: "기록/요약/분석을 모듈화" },
          { name: "하이브리드 전환 준비", note: "인증/스토리지 교체를 염두에 둔 구조" },
        ],
        code: null,
      },
      {
        title: "1단계: FastAPI 앱 기본 세팅",
        desc: "main.py와 핵심 설정 파일 작성",
        items: null,
        code: `# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, analyze, records, summary
from app.core.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="BabyPoopSense API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 배포 시 앱 도메인으로 제한
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,    prefix="/auth",    tags=["인증"])
app.include_router(analyze.router, prefix="/analyze", tags=["분석"])
app.include_router(records.router, prefix="/records", tags=["기록"])
app.include_router(summary.router, prefix="/summary", tags=["요약"])

@app.get("/health")
def health():
    return {"status": "ok"}`,
      },
      {
        title: "2단계: 대변 분석 API",
        desc: "Bristol + 색상 + 위험신호 분석 로직",
        items: null,
        code: `# app/api/analyze.py
from fastapi import APIRouter, UploadFile, File, Form, Depends
from app.services.analyzer import analyze_input
from app.services.image_service import process_image
from app.core.security import get_current_user

router = APIRouter()

@router.post("/")
async def analyze(
    bristol: int = Form(..., ge=1, le=7),
    frequency: int = Form(..., ge=0),
    color: str = Form(...),
    has_blood: bool = Form(False),
    fever: bool = Form(False),
    vomiting: bool = Form(False),
    dehydration: bool = Form(False),
    note: str = Form(""),
    baby_months: int = Form(...),
    image: UploadFile | None = File(None),
    current_user = Depends(get_current_user),
):
    # 이미지 처리 (EXIF 제거 + 색상 분석)
    image_data = None
    if image:
        image_data = await process_image(image)

    # 분석 실행
    result = analyze_input(
        bristol=bristol, frequency=frequency, color=color,
        has_blood=has_blood, fever=fever, vomiting=vomiting,
        dehydration=dehydration, baby_months=baby_months,
    )
    return result

# app/services/analyzer.py
def analyze_input(bristol, frequency, color, has_blood,
                  fever, vomiting, dehydration, baby_months):
    risk = "GREEN"
    evidence, todo, caution = [], [], []

    # 위험 신호 우선 처리
    if has_blood:
        risk = "RED"
        evidence.append("혈변/혈액 의심 → 즉시 의료 상담 권장")
    if dehydration:
        risk = "RED"
        evidence.append("탈수 의심 → 빠른 평가 필요")

    # 신생아 태변 예외 처리
    is_newborn = baby_months <= 1
    c = color.lower()
    if "검" in color or "black" in c:
        if is_newborn:
            if risk != "RED": risk = "YELLOW"
            evidence.append("신생아 태변은 검은색이 정상 (3일 이상 지속 시 상담)")
        else:
            risk = "RED"
            evidence.append("검은색 변 → 상담 권장 (태변 제외)")

    # Bristol 극단값 처리
    from .bristol_meta import BRISTOL_META
    watery = BRISTOL_META[bristol]["watery"]
    if watery and frequency >= 3:
        if risk != "RED": risk = "YELLOW"
        evidence.append("하루 3회 이상 묽은 변 → 추세 관찰 필요")

    scores = _risk_to_scores(risk)
    return {"risk": risk, "evidence": evidence,
            "todo": _get_todo(risk), "caution": caution, **scores}`,
      },
      {
        title: "3단계: DB 모델 & 마이그레이션",
        desc: "SQLAlchemy 모델 정의 및 Alembic 마이그레이션",
        items: null,
        code: `# app/models/record.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    baby_name = Column(String, nullable=False)
    baby_months = Column(Integer, nullable=False)
    bristol = Column(Integer, nullable=False)
    frequency = Column(Integer, default=1)
    color = Column(String, nullable=False)
    has_blood = Column(Boolean, default=False)
    fever = Column(Boolean, default=False)
    vomiting = Column(Boolean, default=False)
    dehydration = Column(Boolean, default=False)
    note = Column(String, default="")
    risk = Column(String, nullable=False)       # GREEN/YELLOW/RED
    image_path = Column(String, nullable=True)  # R2 경로
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# Alembic 마이그레이션 실행
# alembic init alembic
# alembic revision --autogenerate -m "create records table"
# alembic upgrade head`,
      },
      {
        title: "4단계: Docker로 로컬 실행",
        desc: "PostgreSQL + FastAPI를 컨테이너로 묶어 실행",
        items: null,
        code: `# docker-compose.yml
version: "3.9"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: babypoop
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: babypoopdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://babypoop:secret@db:5432/babypoopdb
      SECRET_KEY: your-super-secret-key
    depends_on:
      - db
    volumes:
      - .:/app
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

volumes:
  pgdata:

# 실행 명령
# docker-compose up -d

# API 확인
# http://localhost:8000/docs  ← Swagger UI 자동 생성!`,
      },
      {
        title: "Phase 3 보강: Firebase Auth 토큰 검증",
        desc: "JWT 대신 Firebase ID 토큰 검증으로 전환 (하이브리드 연동)",
        items: null,
        code: `# requirements.txt (추가)
firebase-admin==6.5.0

# app/core/firebase.py
import firebase_admin
from firebase_admin import credentials
from app.core.config import settings

def init_firebase() -> None:
    # Phase 3 기존 보안 모듈과 연결되는 공통 초기화
    if not firebase_admin._apps:
        cred = credentials.Certificate(settings.FIREBASE_SERVICE_ACCOUNT_PATH)
        firebase_admin.initialize_app(cred)

# app/core/security.py (JWT 대신 Firebase)
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth
from app.core.firebase import init_firebase

bearer = HTTPBearer()

def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer),
):
    # Phase 3 기존 Depends(get_current_user) 호출부와 연결
    init_firebase()
    try:
        decoded = auth.verify_id_token(creds.credentials)
        return {"uid": decoded["uid"], "email": decoded.get("email")}
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")

# app/api/analyze.py (기존 코드와 동일한 방식으로 사용)
# current_user = Depends(get_current_user)  # 그대로 유지`,
      },
    ],
  },
  {
    id: 4,
    emoji: "📱",
    title: "Android 앱 개발",
    subtitle: "Kotlin + Jetpack Compose",
    color: COLORS.orange,
    dim: COLORS.orangeDim,
    duration: "2~3주",
    steps: [
      {
        title: "왜 이 단계가 필요한가 (비즈니스 관점)",
        desc: "초기 사용자의 경험 품질이 유지율을 결정",
        items: [
          { name: "가입 장벽 제거", note: "Google 로그인으로 이탈률 최소화" },
          { name: "데이터 비용 절감", note: "이미지 업로드 최적화로 운영비 제어" },
          { name: "확장 준비", note: "토큰 기반으로 모든 API 호출을 표준화" },
        ],
        code: null,
      },
      {
        title: "1단계: build.gradle 의존성",
        desc: "필수 라이브러리 추가",
        items: null,
        code: `// app/build.gradle.kts
dependencies {
    // Jetpack Compose
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.activity:activity-compose:1.8.2")

    // Navigation
    implementation("androidx.navigation:navigation-compose:2.7.6")

    // ViewModel + Lifecycle
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")

    // 네트워크: Retrofit2 + OkHttp3
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:logging-interceptor:4.12.0")

    // 로컬 DB: Room
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    kapt("androidx.room:room-compiler:2.6.1")

    // 카메라: CameraX
    implementation("androidx.camera:camera-camera2:1.3.1")
    implementation("androidx.camera:camera-lifecycle:1.3.1")
    implementation("androidx.camera:camera-view:1.3.1")

    // 이미지 로딩: Coil
    implementation("io.coil-kt:coil-compose:2.5.0")

    // 의존성 주입: Hilt
    implementation("com.google.dagger:hilt-android:2.50")
    kapt("com.google.dagger:hilt-compiler:2.50")

    // Firebase Auth (Google 로그인)
    implementation("com.google.firebase:firebase-auth-ktx:22.3.1")
    implementation("com.google.android.gms:play-services-auth:21.2.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.7.3")

    // JWT 저장: EncryptedSharedPreferences (옵션: 토큰 캐시용)
    implementation("androidx.security:security-crypto:1.1.0-alpha06")
}`,
      },
      {
        title: "1.5단계: Firebase + Google 로그인 연결 (초보자용)",
        desc: "콘솔 설정 → 앱 연결 → 로그인 코드 적용",
        items: null,
        code: `# 1) Firebase 콘솔 프로젝트 생성
# - Authentication > Sign-in method > Google 활성화
#
# 2) Android 앱 등록
# - 패키지명 입력
# - SHA-1, SHA-256 등록 (Android Studio > Gradle > signingReport)
#
# 3) google-services.json 다운로드
# - app/ 디렉토리에 넣기
#
# 4) Gradle 설정
# - 프로젝트 build.gradle에 classpath 추가
# - 앱 build.gradle에 plugins { id("com.google.gms.google-services") }
#
# 5) Google 로그인 버튼 연결 (Compose)
// ui/auth/GoogleSignInButton.kt
@Composable
fun GoogleSignInButton(onResult: (String) -> Unit) {
    val context = LocalContext.current
    val launcher = rememberLauncherForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        val task = GoogleSignIn.getSignedInAccountFromIntent(result.data)
        val account = task.getResult(ApiException::class.java)
        val credential = GoogleAuthProvider.getCredential(account.idToken, null)
        FirebaseAuth.getInstance().signInWithCredential(credential)
            .addOnSuccessListener { onResult(it.user?.uid ?: "") }
    }

    Button(onClick = {
        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(BuildConfig.FIREBASE_WEB_CLIENT_ID)
            .requestEmail()
            .build()
        val signInClient = GoogleSignIn.getClient(context, gso)
        launcher.launch(signInClient.signInIntent)
    }) {
        Text("Google로 시작하기")
    }
}`,
      },
      {
        title: "2단계: Retrofit API 인터페이스",
        desc: "Firebase ID 토큰을 자동으로 헤더에 주입",
        items: null,
        code: `// data/api/ApiService.kt
interface ApiService {
    @Multipart
    @POST("analyze/")
    suspend fun analyze(
        @Part("bristol") bristol: RequestBody,
        @Part("frequency") frequency: RequestBody,
        @Part("color") color: RequestBody,
        @Part("has_blood") hasBlood: RequestBody,
        @Part("fever") fever: RequestBody,
        @Part("vomiting") vomiting: RequestBody,
        @Part("dehydration") dehydration: RequestBody,
        @Part("baby_months") babyMonths: RequestBody,
        @Part image: MultipartBody.Part?,
    ): AnalysisResponse

    @GET("records/")
    suspend fun getRecords(): List<RecordResponse>

    @POST("records/")
    suspend fun saveRecord(@Body record: RecordRequest): RecordResponse
}

// data/api/NetworkModule.kt (Hilt)
@Module @InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides @Singleton
    fun provideRetrofit(authInterceptor: AuthInterceptor): Retrofit =
        Retrofit.Builder()
            .baseUrl("https://your-api-domain.com/")  // 로컬: http://10.0.2.2:8000/
            .addConverterFactory(GsonConverterFactory.create())
            .client(OkHttpClient.Builder()
                .addInterceptor(authInterceptor)
                .addInterceptor(HttpLoggingInterceptor().apply {
                    level = HttpLoggingInterceptor.Level.BODY
                })
                .build())
            .build()

// data/api/AuthInterceptor.kt
class AuthInterceptor @Inject constructor(): Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val user = FirebaseAuth.getInstance().currentUser
        val token = runBlocking {
            user?.getIdToken(false)?.await()?.token
        }
        val req = chain.request().newBuilder().apply {
            // Phase 3에서 교체된 Firebase 토큰 검증과 연결
            if (!token.isNullOrBlank()) {
                addHeader("Authorization", "Bearer $token")
            }
        }.build()
        return chain.proceed(req)
    }
}
}`,
      },
      {
        title: "3단계: CaptureScreen (카메라 + 입력폼)",
        desc: "CameraX + 폼 입력 화면 핵심 코드",
        items: null,
        code: `// ui/capture/CaptureScreen.kt
@Composable
fun CaptureScreen(
    viewModel: CaptureViewModel = hiltViewModel(),
    onAnalyzeDone: () -> Unit,
) {
    val uiState by viewModel.uiState.collectAsState()

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        // 카메라 프리뷰
        CameraPreviewView(
            onImageCaptured = { uri -> viewModel.onImageCaptured(uri) }
        )

        // Bristol Scale 선택
        BristolPicker(
            value = uiState.bristol,
            onValueChange = viewModel::onBristolChange
        )

        // 위험 신호 스위치들
        RedFlagSection(
            hasBlood = uiState.hasBlood,
            fever = uiState.fever,
            onHasBloodChange = viewModel::onHasBloodChange,
            onFeverChange = viewModel::onFeverChange,
        )

        // 분석 버튼
        Button(
            onClick = {
                viewModel.analyze()
                onAnalyzeDone()
            },
            enabled = !uiState.isLoading,
            modifier = Modifier.fillMaxWidth()
        ) {
            if (uiState.isLoading) CircularProgressIndicator(modifier = Modifier.size(20.dp))
            else Text("분석하기 ✨")
        }

        // 오류 표시
        uiState.error?.let { error ->
            ErrorBanner(message = error)
        }
    }
}`,
      },
      {
        title: "4단계: 오프라인 지원 (Room DB)",
        desc: "네트워크 없을 때 로컬 DB에 저장 후 나중에 동기화",
        items: null,
        code: `// data/local/RecordDao.kt
@Dao
interface RecordDao {
    @Query("SELECT * FROM records ORDER BY created_at DESC")
    fun getAllRecords(): Flow<List<LocalRecord>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(record: LocalRecord)

    @Query("SELECT * FROM records WHERE synced = 0")
    suspend fun getUnsynced(): List<LocalRecord>
}

// data/repository/RecordRepository.kt
class RecordRepository @Inject constructor(
    private val api: ApiService,
    private val dao: RecordDao,
    private val networkMonitor: NetworkMonitor,
) {
    suspend fun saveRecord(record: RecordRequest) {
        // 항상 로컬에 먼저 저장
        dao.insert(record.toLocal(synced = false))

        // 온라인이면 서버에도 저장
        if (networkMonitor.isOnline()) {
            try {
                api.saveRecord(record)
                dao.markAsSynced(record.localId)
            } catch (e: Exception) {
                // 오프라인 시 무시 → WorkManager가 나중에 재시도
                scheduleSync()
            }
        }
    }
}`,
      },
    ],
  },
  {
    id: 5,
    emoji: "🔐",
    title: "인증 & 보안",
    subtitle: "Firebase Auth + 데이터 보호",
    color: COLORS.yellow,
    dim: COLORS.yellowDim,
    duration: "3~5일",
    steps: [
      {
        title: "왜 이 단계가 필요한가 (비즈니스 관점)",
        desc: "보안 리스크와 법적 책임을 최소화",
        items: [
          { name: "비밀번호 보관 제거", note: "민감정보 저장을 피하고 리스크 절감" },
          { name: "인증 신뢰 확보", note: "Google 보안 인프라 활용" },
          { name: "운영 비용 절감", note: "자체 인증 시스템 유지비 제거" },
        ],
        code: null,
      },
      {
        title: "Firebase Auth 흐름 (FastAPI)",
        desc: "서버는 토큰 검증만 수행",
        items: null,
        code: `# app/core/security.py
# Phase 3에서 추가한 Firebase 토큰 검증을 그대로 사용

# 안드로이드에서 토큰 저장 (옵션)
# EncryptedSharedPreferences 사용
# val sharedPrefs = EncryptedSharedPreferences.create(...)
# sharedPrefs.edit().putString("firebase_id_token", token).apply()`,
      },
      {
        title: "이미지 보안 처리",
        desc: "EXIF 제거 + 암호화 저장",
        items: null,
        code: `# app/services/image_service.py
from PIL import Image
import io, hashlib, os

async def process_image(upload: UploadFile) -> dict:
    """EXIF 제거 + 크기 최적화"""
    contents = await upload.read()
    img = Image.open(io.BytesIO(contents))

    # EXIF 데이터 완전 제거
    clean_img = Image.new(img.mode, img.size)
    clean_img.putdata(list(img.getdata()))

    # 크기 최적화 (최대 1024x1024)
    clean_img.thumbnail((1024, 1024), Image.LANCZOS)

    # JPEG로 재저장 (품질 85%)
    output = io.BytesIO()
    clean_img.save(output, format="JPEG", quality=85)
    clean_bytes = output.getvalue()

    # 파일명: 사용자ID + 타임스탬프 해시 (원본명 노출 방지)
    filename = hashlib.sha256(
        f"{user_id}{datetime.now().timestamp()}".encode()
    ).hexdigest()[:16] + ".jpg"

    return {"bytes": clean_bytes, "filename": filename}`,
      },
    ],
  },
  {
    id: 6,
    emoji: "☁️",
    title: "서버 배포",
    subtitle: "Railway + Supabase + Cloudflare R2",
    color: COLORS.accent,
    dim: COLORS.accentDim,
    duration: "2~3일",
    steps: [
      {
        title: "왜 이 단계가 필요한가 (비즈니스 관점)",
        desc: "24시간 가용성과 비용 통제를 동시에 달성",
        items: [
          { name: "운영 중단 방지", note: "로컬 PC 의존 탈피" },
          { name: "전송료 0원", note: "이미지 Egress 비용 폭탄 차단" },
          { name: "확장 준비", note: "트래픽 증가에도 비용 예측 가능" },
        ],
        code: null,
      },
      {
        title: "실전 배포: Railway + Supabase + Cloudflare R2",
        desc: "백엔드/DB/스토리지 분리로 비용·보안 최적화",
        items: null,
        code: `# 1. Railway (FastAPI 배포)
# - GitHub 연결 → Deploy
# - Procfile / railway.toml 설정

# Procfile
web: uvicorn app.main:app --host 0.0.0.0 --port \${PORT}

# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port \${PORT}"
healthcheckPath = "/health"
healthcheckTimeout = 300

# 2. Supabase (Managed Postgres)
# - 프로젝트 생성 → Database → Connection string 복사
# - Railway 환경변수에 DATABASE_URL로 입력
DATABASE_URL=postgresql://...

# 3. Cloudflare R2 (S3 호환 스토리지)
# - R2 버킷 생성
# - Access Key / Secret 생성
# - Railway 환경변수에 입력
R2_ACCESS_KEY=...
R2_SECRET_KEY=...
R2_BUCKET=babypoop-images
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
R2_PUBLIC_BASE=https://<public-domain>  # 공개 URL (커스텀 도메인)

# 4. GitHub 연결 → 자동 배포
# railway.app → New Project → Deploy from GitHub

# 5. 배포 후 Android에서 서버 주소 변경
# http://10.0.2.2:8000 → https://your-app.railway.app`,
      },
      {
        title: "안드로이드 APK 빌드",
        desc: "테스트용 APK 및 Google Play 배포",
        items: null,
        code: `# Android Studio에서

# 1. 디버그 APK (테스트용)
# Build > Build Bundle(s) / APK(s) > Build APK(s)
# → app/build/outputs/apk/debug/app-debug.apk

# 2. 릴리즈 APK (Google Play용)
# Build > Generate Signed Bundle / APK
# → 키스토어 파일 생성 (처음 한 번만)
# → app-release.aab 생성

# 3. Google Play Console
# → 내부 테스트 트랙으로 먼저 업로드
# → 테스터 이메일 추가 → 링크로 설치 테스트

# build.gradle 릴리즈 설정
android {
    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"))
            buildConfigField("String", "BASE_URL", "\\"https://your-api.railway.app/\\"")
        }
        debug {
            buildConfigField("String", "BASE_URL", "\\"http://10.0.2.2:8000/\\"")
        }
    }
}`,
      },
    ],
  },
  {
    id: 7,
    emoji: "🧪",
    title: "미래 로드맵",
    subtitle: "성장기 → 확장기 전략",
    color: COLORS.red,
    dim: COLORS.redDim,
    duration: "1주",
    steps: [
      {
        title: "왜 이 단계가 필요한가 (비즈니스 관점)",
        desc: "성장에 따라 비용과 성능을 동시에 관리",
        items: [
          { name: "성장기 대비", note: "이미지 비용/지연 최적화" },
          { name: "확장기 대비", note: "GPU 분석 모듈 분리로 병목 해소" },
          { name: "투자 설득력", note: "로드맵이 곧 실행력" },
        ],
        code: null,
      },
      {
        title: "성장기 (수천 명) 로드맵",
        desc: "이미지 비용과 응답 속도 최적화",
        items: [
          { name: "이미지 리사이징", note: "업로드 전에 1024px 이하로 압축" },
          { name: "썸네일 캐시", note: "Cloudflare 캐시로 조회 비용 절감" },
          { name: "전송 최적화", note: "R2 + CDN 경로 표준화" },
          { name: "백엔드 분리", note: "분석 API와 기록 API 분리 배포" },
        ],
        code: null,
      },
      {
        title: "확장기 (AI 고도화) 로드맵",
        desc: "GPU 분석 모듈 분리 + 비동기 처리",
        items: [
          { name: "GPU 워커 분리", note: "FastAPI ↔ GPU 분석 서버 큐 연동" },
          { name: "비동기 파이프라인", note: "이미지 업로드 → 큐 → 결과 폴링" },
          { name: "서버리스 기반", note: "Cloudflare Workers로 API 게이트웨이화" },
          { name: "관측/모니터링", note: "알림·SLA 기준 수립" },
        ],
        code: null,
      },
    ],
  },
];

const stackTags = [
  "Python 3.11",
  "FastAPI",
  "Supabase Postgres",
  "Kotlin",
  "Jetpack Compose",
  "Retrofit2",
  "Room DB",
  "Docker",
  "Firebase Auth",
  "Cloudflare R2",
  "CameraX",
  "Cloudflare Workers",
];

const checklist = [
  { label: "Google 로그인 (Firebase Auth)", phase: "앱+백엔드" },
  { label: "Bristol + 색상 + 위험신호 입력폼", phase: "앱" },
  { label: "분석 결과 (GREEN/YELLOW/RED)", phase: "백엔드+앱" },
  { label: "기록 저장 + 타임라인", phase: "앱" },
  { label: "카메라/사진 업로드", phase: "앱" },
  { label: "EXIF 제거 (프라이버시)", phase: "백엔드" },
  { label: "R2 저장소 연동", phase: "백엔드" },
  { label: "오프라인 로컬 저장", phase: "앱" },
  { label: "면책 조항 온보딩", phase: "앱" },
  { label: "RED 상태 응급 전화 연결", phase: "앱" },
  { label: "병원 상담용 요약 텍스트", phase: "백엔드+앱" },
];

let activePhase = 1;
let expandedSteps = { "1-0": true };

const app = document.getElementById("app");

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const getCurrentPhase = () => phases.find((p) => p.id === activePhase);

const makeCodeBlock = (code) => {
  const wrap = el("div", "code-wrap");
  const head = el("div", "code-head");
  const label = el("span", "code-label", "code");
  const copyBtn = el("button", "copy-btn", "복사");
  copyBtn.type = "button";

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard?.writeText(code);
    } catch (_) {
      // no-op
    }
    copyBtn.textContent = "✓ 복사됨";
    copyBtn.classList.add("copied");
    setTimeout(() => {
      copyBtn.textContent = "복사";
      copyBtn.classList.remove("copied");
    }, 1500);
  });

  head.append(label, copyBtn);

  const pre = el("pre", "code-content");
  const codeEl = el("code");
  codeEl.textContent = code;
  pre.appendChild(codeEl);

  wrap.append(head, pre);
  return wrap;
};

const renderHeader = (root) => {
  const top = el("div", "top-header");
  const c = el("div", "container");

  c.append(
    el("div", "kicker", "🍼 BabyPoopSense · 앱 개발 가이드"),
    el("div", "main-title", "Step-by-Step 실전 개발 가이드"),
    el("div", "subtitle", "VS Code + FastAPI + Android Studio → 실제 앱 출시까지")
  );

  const tags = el("div", "stack-tags");
  stackTags.forEach((t) => tags.appendChild(el("span", "stack-tag", t)));
  c.appendChild(tags);

  top.appendChild(c);
  root.appendChild(top);
};

const renderPhaseTabs = (root) => {
  const grid = el("div", "phase-grid");

  phases.forEach((p) => {
    const card = el("button", "phase-card");
    card.type = "button";
    card.style.setProperty("--phase-color", p.color);
    card.style.setProperty("--phase-dim", p.dim);
    if (p.id === activePhase) card.classList.add("active");

    card.append(
      el("div", "phase-emoji", p.emoji),
      el("div", "phase-title", p.title),
      el("div", "phase-duration", p.duration)
    );

    card.addEventListener("click", () => {
      activePhase = p.id;
      render();
    });

    grid.appendChild(card);
  });

  root.appendChild(grid);
};

const renderSteps = (root, phase) => {
  const banner = el("div", "current-phase");
  banner.style.background = phase.dim;
  banner.style.borderColor = `${phase.color}40`;
  banner.style.setProperty("--phase-color", phase.color);

  const bannerText = el("div");
  const title = el("div", "current-phase-title", `Phase ${phase.id}: ${phase.title}`);
  const subtitle = el("div", "current-phase-subtitle");
  subtitle.append(`${phase.subtitle} · 예상 기간: `);
  const durationStrong = el("strong", "phase-duration-strong", phase.duration);
  subtitle.appendChild(durationStrong);

  bannerText.append(title, subtitle);
  banner.append(el("span", "current-phase-emoji", phase.emoji), bannerText);
  root.appendChild(banner);

  const list = el("div", "steps");

  phase.steps.forEach((step, idx) => {
    const key = `${phase.id}-${idx}`;
    const open = !!expandedSteps[key];

    const card = el("div", `step-card${open ? " open" : ""}`);
    card.style.setProperty("--step-color-open", `${phase.color}50`);
    card.style.setProperty("--step-dim", phase.dim);

    const head = el("div", "step-head");
    const headLeft = el("div");
    headLeft.append(el("span", "step-head-title", step.title), el("div", "step-head-desc", step.desc));
    const chev = el("span", "chevron", "⌄");
    head.append(headLeft, chev);

    head.addEventListener("click", () => {
      expandedSteps = { ...expandedSteps, [key]: !expandedSteps[key] };
      render();
    });

    card.appendChild(head);

    if (open) {
      const body = el("div", "step-body");

      if (step.items) {
        const items = el("div", "step-items");
        step.items.forEach((item) => {
          const itemNode = el("div", "step-item");
          itemNode.style.setProperty("--item-color", phase.color);

          const textWrap = el("div");
          textWrap.append(el("span", "step-item-name", item.name), el("span", "step-item-note", item.note));

          itemNode.append(el("span", "step-item-arrow", "▸"), textWrap);
          items.appendChild(itemNode);
        });
        body.appendChild(items);
      }

      if (step.code) body.appendChild(makeCodeBlock(step.code));

      card.appendChild(body);
    }

    list.appendChild(card);
  });

  root.appendChild(list);
};

const renderChecklist = (root) => {
  const wrap = el("div", "checklist");
  wrap.appendChild(el("div", "checklist-title", "🎯 MVP 최소 기능 체크리스트"));

  const grid = el("div", "checklist-grid");
  checklist.forEach((item) => {
    const row = el("div", "check-item");
    const textWrap = el("div");
    textWrap.append(el("div", "check-label", item.label), el("div", "check-phase", item.phase));
    row.append(el("span", "check-icon", "□"), textWrap);
    grid.appendChild(row);
  });

  wrap.appendChild(grid);
  root.appendChild(wrap);
};

function render() {
  app.innerHTML = "";
  const root = el("div", "app");
  renderHeader(root);

  const content = el("div", "content");
  renderPhaseTabs(content);

  const phase = getCurrentPhase();
  if (phase) {
    renderSteps(content, phase);
  }

  renderChecklist(content);

  root.appendChild(content);
  app.appendChild(root);
}

render();

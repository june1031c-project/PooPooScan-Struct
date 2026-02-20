(function () {
  const messageEl = document.getElementById("page-message");
  const nowTimeEl = document.getElementById("now-time");
  const refreshBtn = document.getElementById("refresh-time");

  const authStatusEl = document.getElementById("auth-status");
  const loginGoogleBtn = document.getElementById("login-google");
  const logoutBtn = document.getElementById("logout");

  function updateTime() {
    nowTimeEl.textContent = "현재 시간: " + new Date().toLocaleString("ko-KR");
  }

  refreshBtn.addEventListener("click", updateTime);
  updateTime();
  messageEl.textContent = "index.html, main.js, style.css만으로 정상 동작 중입니다.";

  const authConfig = window.FIREBASE_STUDIO_AUTH;
  const hasFirebaseSdk = !!(window.firebase && window.firebase.auth);
  const hasConfig =
    authConfig &&
    authConfig.firebaseConfig &&
    authConfig.firebaseConfig.apiKey &&
    authConfig.firebaseConfig.authDomain &&
    authConfig.firebaseConfig.projectId;

  if (!hasFirebaseSdk || !hasConfig) {
    authStatusEl.textContent = "Firebase 인증 설정이 없어 비활성화 상태입니다.";
    loginGoogleBtn.disabled = true;
    logoutBtn.disabled = true;
    return;
  }

  const app = firebase.initializeApp(authConfig.firebaseConfig);
  const auth = firebase.auth(app);
  const enabled = new Set(authConfig.enabledProviders || []);

  if (!enabled.has("google")) {
    loginGoogleBtn.disabled = true;
    loginGoogleBtn.textContent = "Google 비활성화";
  }

  loginGoogleBtn.addEventListener("click", function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(function (error) {
      authStatusEl.textContent = "로그인 실패: " + (error.message || "unknown");
    });
  });

  logoutBtn.addEventListener("click", function () {
    auth.signOut().catch(function (error) {
      authStatusEl.textContent = "로그아웃 실패: " + (error.message || "unknown");
    });
  });

  auth.onAuthStateChanged(function (user) {
    if (user) {
      authStatusEl.textContent = "로그인됨: " + (user.email || user.uid);
    } else {
      authStatusEl.textContent = "로그아웃 상태";
    }
  });
})();

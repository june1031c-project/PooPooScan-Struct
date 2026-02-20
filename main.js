(function () {
  const authConfig = window.FIREBASE_STUDIO_AUTH;
  const hasConfig =
    authConfig &&
    authConfig.firebaseConfig &&
    authConfig.firebaseConfig.apiKey &&
    authConfig.firebaseConfig.authDomain &&
    authConfig.firebaseConfig.projectId;

  if (!hasConfig) {
    return;
  }

  const app = firebase.initializeApp(authConfig.firebaseConfig);
  const auth = firebase.auth(app);

  const root = document.createElement("div");
  root.id = "auth-root";
  root.style.cssText = [
    "position:fixed",
    "right:16px",
    "bottom:16px",
    "z-index:9999",
    "font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif",
    "padding:12px",
    "background:#ffffff",
    "border:1px solid #d5d7db",
    "border-radius:10px",
    "box-shadow:0 8px 20px rgba(0,0,0,.12)",
    "min-width:220px"
  ].join(";");

  root.innerHTML = [
    '<div style="font-size:12px;color:#4b5563;margin-bottom:8px;">Firebase Auth</div>',
    '<div id="auth-status" style="font-size:13px;margin-bottom:8px;">Signed out</div>',
    '<div id="auth-actions" style="display:flex;gap:6px;flex-wrap:wrap;">',
    '  <button id="auth-google" style="padding:6px 8px;cursor:pointer;">Google 로그인</button>',
    '  <button id="auth-logout" style="padding:6px 8px;cursor:pointer;">로그아웃</button>',
    "</div>"
  ].join("");

  document.body.appendChild(root);

  const statusEl = document.getElementById("auth-status");
  const googleBtn = document.getElementById("auth-google");
  const logoutBtn = document.getElementById("auth-logout");

  const enabled = new Set(authConfig.enabledProviders || []);
  if (!enabled.has("google")) {
    googleBtn.style.display = "none";
  }

  googleBtn.addEventListener("click", function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(function (error) {
      statusEl.textContent = "로그인 실패: " + (error.message || "unknown");
    });
  });

  logoutBtn.addEventListener("click", function () {
    auth.signOut().catch(function (error) {
      statusEl.textContent = "로그아웃 실패: " + (error.message || "unknown");
    });
  });

  auth.onAuthStateChanged(function (user) {
    if (user) {
      statusEl.textContent = "로그인됨: " + (user.email || user.uid);
    } else {
      statusEl.textContent = "Signed out";
    }
  });
})();

A simple HTML/JS/CSS starter template

## Firebase Studio 인증 자동 연동

이 저장소는 `firebase-studio-auth.generated.js` 파일을 기준으로 Firebase 웹 인증을 붙입니다.

1. Firebase Studio에서 만든 인증 코드 파일이 `window.FIREBASE_STUDIO_AUTH` 객체를 내보내도록 준비합니다.
2. 해당 파일의 Raw URL을 GitHub Secret `FIREBASE_STUDIO_AUTH_RAW_URL`에 넣습니다.
3. private 경로면 GitHub Secret `FIREBASE_STUDIO_AUTH_BEARER`에 토큰을 추가합니다.
4. Actions에서 `Sync Firebase Studio Auth` 워크플로를 수동 실행하거나, 30분 주기 자동 동기화를 기다립니다.

필수 객체 형식:

```js
window.FIREBASE_STUDIO_AUTH = {
  firebaseConfig: {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    appId: "..."
  },
  enabledProviders: ["google", "password"]
};
```

동기화가 끝나면 웹 페이지 우하단 인증 패널에서 Google 로그인/로그아웃이 동작합니다.

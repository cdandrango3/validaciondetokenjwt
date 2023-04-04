const verifyToken= require('../service/validator');
const exitsCif = require('../service/cifexits');
test('validarjwt', async () => {
    expect(await verifyToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlpPdmtueXNXNEZoanV2MDhBS2lTciJ9.eyJodHRwczovL2Rldi1rMzZqNjh1eXJlbnJsYmhvL3VzZXJfbWV0YWRhdGEiOnsiY29kaWdvQ2lmIjoiODkzMjE3IiwiaWRlbnRpZmljYWNpb24iOiIxNzA3MjM5MzIxIiwicGhvbmVfbnVtYmVyIjoiMDk5OTY4MzU5OCIsInRpcG9JZGVudGlmaWNhY2lvbiI6IjAwMDEifSwibmlja25hbWUiOiJsbXVsbG9hMSIsIm5hbWUiOiJNaUJhbmNvMDAyIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzUzMzkwYzZiZGMxMzIyMGU3NTg5YjBjZDZiMDc4MjlmP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbG0ucG5nIiwidXBkYXRlZF9hdCI6IjIwMjMtMDQtMDNUMjM6NTM6NDkuNjUzWiIsImVtYWlsIjoic3Zhcmdhc2JAcGljaGluY2hhLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kZXYtazM2ajY4dXlyZW5ybGJoby51cy5hdXRoMC5jb20vIiwiYXVkIjoiR2tueXpaTXQ3NDBCN2ZUU0hCSHFuTW54UnVkSEVrTUgiLCJpYXQiOjE2ODA1NjYwMjksImV4cCI6MTY4MDYwMjAyOSwic3ViIjoiYXV0aDB8NjNiODVhZTk0MTA4ODIyYTFlZjJlNDkxIn0.gNoZqD8YtNc118_HjkcdzzyRTQ0YGhmFPxInpJRwL2xoV4r8EkD_JC8Pz6umN_pmrtDpVPt-LHadMpJ1-8Z-sITkaxZelxXZqc0wfaC7ivJJnpk84pzS_REUZXk4oxiVmFWFBBJ8exVpYayQkggmrytl8DZX3xr0f4XFa7TVN2j07N1LgcpMpdPiatNP34-5j8N1PyQrU3IakqGQO108XgR8FTVl38JMbKEQ9Rsa-SAs58EdwHlmbLfcb-yFIw7T10K7oEIM_-I861gjYuDBTOplYj36-V4Dc7FmxrdzHjUpNEitjFcWIbtXMRWMutF7YOy5AW2Y14ZobhlVzCb75w")).toBe({
      "https://dev-k36j68uyrenrlbho/user_metadata": {
          "codigoCif": "1974440",
          "identificacion": "1712267796",
          "phone_number": "0984432937",
          "tipoIdentificacion": "0001"
      },
      "nickname": "lmulloa",
      "name": "MiBanco001",
      "picture": "https://s.gravatar.com/avatar/0f24754f2e3c3b8ec5394bd4a0ac5b05?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Flm.png",
      "updated_at": "2023-04-04T00:51:43.173Z",
      "email": "lmulloa@pichincha.com",
      "email_verified": true,
      "iss": "https://dev-k36j68uyrenrlbho.us.auth0.com/",
      "aud": "GknyzZMt740B7fTSHBHqnMnxRudHEkMH",
      "iat": 1680569503,
      "exp": 1680605503,
      "sub": "auth0|63b84ef04108822a1ef2e170"
  });
  });
test('cifcorrecto', async () => {
    expect(await exitsCif("1974440")).toBe(true);
  });
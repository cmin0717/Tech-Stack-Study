// 서버 사이드 코드인 Node.js로 웹 앱을 쉽게 빌드하도록 하는 것이다.
// Express만 갖는 한 가지 특징은 이것이 미들웨어 중심이라는 점이다.
// 모든 요청과 응답을 여러 개의 미들웨어 함수를 통해 수신한다.

// express라는 모듈을 가져온다. require('express')의 반환값은 함수이다.
const express = require("express");
// body-parser는 req.body를 파싱할 수 있는 기성(ready-to-use) 미들웨어를 제공한다.
const bodyParser = require("body-parser")

// 이함수를 통해 app객체를 얻어올수있다. 매우 다양한 기능들이 app객체에 저장되어 있다.
const app = express();


app.use(bodyParser.urlencoded({extended: false}))

app.post('/user', (req,res,next) => {
    return res.send('<h1>' + req.body.username + '</h1>');
})
app.get('/',(req,res,next) => {
    res.send("<form action='/user' method=POST><input type='text' name='username'><button type='submit'>SEND</buttom></form>")
})

// 아래 작업을 여러 미들웨이 함수를 통해 위처럼 단순화 할 수 있다.
// app.use((req, res, next) => {
//   let body = "";
//   req.on("end", () => {
//     const username = body.split("=")[1];
//     if (username) {
//       req.body = { name: username };
//     }
//     next();
//   });
//   req.on("data", (chunk) => {
//     body += chunk;
//   });
// });
// app.use((req, res, next) => {
//   if (req.body) {
//     return res.send('<h1>' + req.body.name + '</h1>');
//   }
//   res.send(
//     "<form method=POST><input type='text' name='username'><button type='submit'>SEND</buttom></form>"
//   );
// });

// listen 함수에 인자를 넣어 해당 인자 포트를 열어준다.
app.listen(5000);

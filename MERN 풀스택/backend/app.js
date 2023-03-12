// package.json에 "start": "nodemon app.js" 을 추가하여 npm start를 실행하면 
// nodemon이 Node를 사용해서 app.js 파일을 실행하도록 해줍니다 프로젝트 디렉터리의 모든 파일을 감시해서
// 파일이 변경될 때마다 자동으로 서버를 재시작하게 된다.

// 해당 파일에서 Node.js를 불러오기 위해 express모듈을 불러온다.
const express = require("express")

const bodyParser = require("body-parser")

// 라우터를 가져와서 사용해야함으로 require를 이용하여 가지고 온다.
const placesRouters = require("./라우터/places-routes")
const usersRouters = require("./라우터/users-routes")

// express를 함수로 실행하여 객체를 생성하고 상수 app에 저장
const app = express()

// post 요청에는 받는 값이 있다. 그러기에 값을 아래서 사용할수 있도록 파싱을 정보가 필요한 곳보다 위에서 해준다.
app.use(bodyParser.json())

// use를 사용하여 다른 파일에 있는 라우트를 app.js에 미들웨어로 등록한다.
app.use('/api/places', placesRouters)

app.use("/api/users", usersRouters)

// 쓸데없는 URL로 접근시 에러 표시
app.use((req, res, next) => {
    const error = new Error("해당 페이지가 존재하지 않습니다.")
    error.code = 404
    next(error)
})

// 오류 처리 use이다. 오류 처리 use는 인자를 4개 받는 특별한놈 첫번쨰 인자로 무슨 오류 객체를 받는다.
app.use((error,req,res,next) => {
    // res.headerSent는 현재 응답을 보냈는지 확인하는 놈 응답을 보냈다면 next로 error를 보내준다.
    // 한 라우터에서 응답을 두번 보낼수 없는 상황이 있기때문에?? 정확히는 모르겠다.
    if (res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message : error.message || "알 수 없는 오류입니다."})
})

// listen 매서드를 통해 해당 포트와 소통할 수 있도록 한다.
app.listen(5000)
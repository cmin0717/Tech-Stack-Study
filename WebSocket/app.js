// import 형태로 받기 위해서는 package파일에서 "type": "module" 추가해 주어야한다.
const express = require("express")
// 파일 및 디렉토리 경로와 관련된 모듈
const path = require("path")
const http = require("http")
const socketIO = require("socket.io")
const moment = require("moment")

const app = express()
// http서버를 express서버에 연결?
const server = http.createServer(app)
// 위에서 연결한 서버를 socketIO서버에 연결?
const io = socketIO(server)

// 소켓이 연결될때 정보를 socket변수에 담아 처리한다.
// Socket.IO의 핵심은 socket 객체와 io 객체이다. (주체에 따라 달라지는거 같다. 서버에서는 io, 클라이언트에서는 socket같은 느낌?)
io.on("connection", (socket) => {
    // 서버에서 받을때 클라이언트에서 보낸 이름과 데이터를 받는다.
    socket.on("chatting", (data) => {
        const {name, msg} = data
        io.emit("chatting", {
            name:name,
            msg:msg,
            time:moment(new Date()).format("h:mm A")
        })
    })
})


// import 형태로 가져오면 __dirname를 미리 선언해야한다.
// const __dirname = path.resolve()

// static : 특정 폴더의 파일들을 특정 패스로 접근할 수 있도록 해주는 미들웨어
// app.use('요청 경로', express.static('실제 경로'));
app.use("/", express.static(path.join(__dirname, "src")))

server.listen(5000, () => console.log("Server is running 5000!"))
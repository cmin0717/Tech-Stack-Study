// 요청을 보내고 받고 할 수 있는 웹서버를 생성하려면 Node.js에 기본으로 탑재된 http모듈을 사용한다.
const http = require("http")

// http.createServer()에 매개변수에 함수가 들어가는데 요청이 들어올때마다 실행되는 함수이다.
// 이 함수의 매개변수에는 요청 및 응답의 두 가지로 req와 res 의 요소를 받는다.
// 요청이 서버에 도달할 때 Node.js가 인수의 값을 전달하고 http.createServer()는 server 객체를 리턴한다.
// 이 server 객체에서 listen() 메서드를 호출하여 들어오는 요청에 대한 이벤트 리스너를 설정하고 포트 번호를 전달할 수 있습니다
// 응답을 반환하기 위해 res 객체를 사용, 응답을 보내기 위해 req 객체 사용
const server = http.createServer((req, res) => {
    console.log("INCOMING REQUEST")
    console.log(req.method, req.url)

    console.log(res.end("<h1>Success!<h1>"))
})

// 리턴받은 server객체를 이용하여 포트를 정할수있다. listen() 메서드가 서버를 스핀 업 한다.
// 이 메서드는 정지하지 않고 계속 진행되는 프로세스라서 수동으로 끝내지 않으면 새로운 명령을 입력할 수 없다.
server.listen(5000)
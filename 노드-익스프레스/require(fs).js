// node {실행 파일명}.js로 터미널에서 실행할 수 있다.

// require() 함수는 Node.js에서도 전역적으로 사용 가능한 소수의 함수 중 하나이다.
// require() 함수는 우리가 가리키는 모듈을 불러오도록 요청하는 함수이다. fs는 내장 모듈이기에 .js가 없어도 되지만
// 직접 만든 모듈을 사용하려면 해당 모듈이 존재하는 파일명.js로 불러온다.

const username = "Kim"

const fs = require('fs')

// writeFile 함수는 3가진 인자를 받는다.
// 1. 생성할 파일명, 2. 파일안에 내용, 3. 작업이 끝나고 수행 할 콜백함수(오류가 있으면 변수로 오류를 리턴하고 없으면 NULL값을 리턴한다.)
fs.writeFile("fs.writeFile-test", 'Name :' + username, (err) => {
    if (err){
        console.log(err)
        return
    }
    console.log("Complete")
})

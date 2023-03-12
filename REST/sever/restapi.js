// express 서버 코드

const express = require("express")
const body = require("body-parser")
// cors 정책을 막기위해 사용하는 라이브러리 / cors 정책 : 서로다른 포트에서 정보를 요구하는 상황
const cors = require("cors")
const app = express()

let id = 1
const TodoList = [{
    id:1,
    text:"work1",
    done:false
}]

app.use(cors())
app.use(body.json())
app.use("/", (req,res,next) => {
    return next()
})

app.get("/", (req,res,next) => {
    res.send("Yes!!!!")
})

app.get("/api/todo", (req,res,next) => {
    res.json(TodoList)
})

app.post("/api/todo", (req, res, next) => {
    const {text, done} = req.body
    console.log(req.body)
    id++
    TodoList.push({
        id:id,
        text:text,
        done:done
    })
    return res.send("success")
})


app.listen(5000, () => {console.log("서버 연결 완료~~~!")})
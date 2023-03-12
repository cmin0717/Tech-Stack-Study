// 난수 생성 모듈이다.
const uuid = require("uuid")
const { validationResult } = require('express-validator')
const getCoords = require("../구글 맵/location")

let DUMMY = [
    {
        id:'p1',
        title:'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location:{
            lat:40.7484474,
            lng:-73.9871517
        },
        address:"20 W 34th St, New York, NY 10001",
        creator:'u1'
    }
]

const getPlaceById = (req,res,next) => {
    // 인자로 넣어준 url을 params를 통해 가져온다./ :아무거나 네임밍 가능
    const placeId = req.params.pid
    const place = DUMMY.find((p) => {
        return p.id === placeId
    })
    if (!place){
        // res.sendStatus(404) sendStatus를 이용할 수도 있다.
        res.status(404).json({message : "해당 페이지가 존재하지 않습니다."})
        return // 한번 res했으니 아래는 실행되면 안되니깐 리턴으로 끝내준다. 두번 응답할수없는 응답들이있다.
        // send, json, end, redirect등등은 한 라우터에서 두번 응답할수 없다.
    }
    // {place} 는 {place : place}랑 같은 표현이다.
    res.json({place})
}

const getUserById = (req,res,next) => {
    const userId = req.params.uid
    const place = DUMMY.filter((p) => {
        return p.creator === userId
    })
    if (place.length === 0){
        // 해당 오류를 설정하여 보낼수도 있다.
        const error = new Error("해당 유저 페이지가 존재하지 않습니다.")
        error.code = 404
        return next(error)
    }
    res.json({place})
}

const createPlace = async(req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()){
        const err = new Error("입력을 제대로 해주세요")
        err.code = 422
        return next(err)
    }

    const {title, description, coordinates, address, creator} = req.body

   let coordinate = coordinates
   try {
    coordinate = await getCoords(address)
   } catch (error) {
    return next(error)
   }

    const newPlace = {
        // 난수 생성 모듈이다 여러 버전이 있지만 v4가 난수 생성 버전이다.
        id: uuid.v4(),
        title,
        description,
        location:coordinate,
        address,
        creator
    }
    // 전달받은 데이터로 새로운 객체를 만들어서 넣어준다.
    DUMMY.push(newPlace)

    res.status(201).json({place: newPlace})
}

const updatePlace = (req, res, next) => {
    const error = validationResult(req)
    console.log(error)
    if (!error.isEmpty()){
        const err = new Error("입력을 제대로 해주세요")
        err.code = 422
        return next(err)
    }

    const {title, description} = req.body
    const id = req.params.pid
    let idx
    // find와 findindex를 이용하여 해결할수있지만 그럼 for문이 2번 돌기에 한번으로 해결해보았다.
    for ( i in DUMMY){
        if (DUMMY[i].id === id){
            console.log(i)
            idx = i
            break
        }
    }
    const newPlace = {...DUMMY[idx]}
    newPlace.title = title
    newPlace.description = description
    DUMMY[idx] = newPlace

    res.status(200).json({place : newPlace})
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid
    if (!DUMMY.find((p) => p.id === placeId)){
        const error = new Error("해당 아이디를 찾지못했습니다.")
        error.code = 404
        return next(error)
    }
    DUMMY = DUMMY.filter((p) => p.id !== placeId)

    res.status(200).json({message:"삭제 완료~~!"})
}

// 여러 함수를 exports하려면 module.exports ~~가 아닌 exports.~~~로 보내야한다.
exports.getplaceById = getPlaceById;
exports.getuserById = getUserById
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace
const express = require("express");
const cors = require("cors");
const body = require("body-parser")
const dotenv = require("dotenv");
// multer 다중 부품/폼 데이터를 처리하는 데 사용됩니다.
const multer = require("multer");
const AWS = require("aws-sdk");

const app = express();
dotenv.config();

const redis = require("redis");

const client = redis.createClient({
  socket:{
    port:6379,
    host:"13.209.14.148"
  },
  legacyMode:true
});

client.on("connect", function () {
  console.log("Redis client connected");
});

client.on("error", function (err) {
  console.log("Something went wrong " + err);
});


client.connect().then();
const redisCli = client.v4;

// aws region 및 자격증명 설정
AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: process.env.Access_key_ID,
  secretAccessKey: process.env.Secret_access_key,
});


app.use(cors());
// s3 연결
const s3 = new AWS.S3();
// req의 바디를 파싱하기위해
app.use(body.json())
// 다른 포트에서의 요청도 처리할수있게

// 업로드된 파일을 메모리에 버퍼 개체로 저장하는 memoryStorage엔진을 사용합니다.
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
});
const upload = multer({ storage: storage }).array("images");

app.get("/file", async (req, res, next) => {
  const params = {
    Bucket: "jomintests3",
    // Prefix 매개 변수는 listObjectsV2 메서드의 결과를 필터링하여 키가 특정 문자열로 시작하는 개체만 포함하도록 하는 데 사용됩니다
    Prefix: "images/",
  };
  try {
    const data = await s3.listObjectsV2(params).promise();
    const urlList = [];
    for (const info of data.Contents) {
      urlList.push("https://jomintests3.s3.ap-northeast-2.amazonaws.com/" + info.Key)
    }
    res.send(urlList);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/file", (req, res, next) => {
  // 메모리에 저장된 파일 업로드를 처리하기 위해 멀티 미들웨어를 설정합니다
  upload(req, res, (err) => {
    // 만일 오류가 있으면 에러코드 보내고 종료
    if (err) {
      return res.status(400).send(err);
    }
    const foldername = "images/";
    const promises = req.files.map((file,idx) => {
      const params = {
        Bucket: "jomintests3",
        Key: foldername + req.body.lastModified[idx],
        ACL:"public-read",
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      // 위에서 매개변수을 설정하고 s3에 업로드한다. 프로미스화 해서 요청이 끝나고 나머지 작업을 할수있게 한다.
      return s3.upload(params).promise();
    });
    // 모든 작업이 끝나면 오류가 있나 확인후 나머지 작업 처리
    Promise.all(promises)
      .then((responses) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });
});

app.post("/filedel", async (req, res, next) => {
  const file = req.body.view
  const cutfile = file.split('com/')
  try{
    await s3.deleteObject({Bucket:"jomintests3", Key:cutfile[1]}).promise()
    res.send("삭제완료");
  }catch(err){
    console.log(err)
    res.status(500)
  }
});

app.listen(5000, () => console.log("서버 연결 완료!!"));


  // const promises = req.files.map((file) => {
  //   console.log(file);
  //   fs.readFile(file.path, (err, data) => {
  //     console.log(data);
  //     const foldername = "test1/";
  //     const params = {
  //       Bucket: "jomintests3",
  //       Key: foldername + file.originalname,
  //       Body: data,
  //     };
  //     s3.upload(params, (err, data) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log("저장 완료");
  //       }
  //     });
  //   });
  // });


  // const S3upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "jomintests3",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     acl: "public-read",
//     key: (req, file, callback) => {
//       callback(null, file.originalname);
//     },
//   }),
// });

// const storage = multer.diskStorage({
//   // 저장할 위치를 선택
//   destination: function (req, file, cb) {
//     cb(null, "upload");
//   },
//   // 저장할 파일명을 설정
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage });
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "jomintests3",
//     acl: "public-read",
//     key: function (request, file, cb) {
//       cb(null, "images/" + Date.now() + file.originalname);
//     },
//   }),
// });

//img 태그에서 이미지를 요청할 수 있도록 허용하기 위해 upload폴더를 static화 한다
// app.use("/upload", express.static("upload"));

// const dt = await s3.headObject({Bucket:"jomintests3", Key:info.Key}).promise()
// urlList.push(URL.createObjectURL(new Blob([data.Body])))
// urlList.push(`https://s3.amazonaws.com/jomintests3/${info.Key}`);
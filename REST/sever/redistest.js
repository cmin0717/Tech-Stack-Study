const redis = require("redis");

const client = redis.createClient({
  url: `redis://default:moV9pOj0gArero0MJKsC275N8Hsigl91@redis-10005.c54.ap-northeast-1-2.ec2.cloud.redislabs.com:10005`,
  legacyMode: true,
});

client.on("connect", () => {
  console.log("Redis 연결~~!");
});

client.connect();
const x = {
  url: "",
  duration: 5,
  select: false,
  transition: "",
};

// const a = async () => {
//     await client.v4.rPush("testroom/effect", "asdad");
//     // await client.v4.hSet("tes", "effect", JSON.stringify([]));
//     // await client.v4.hSet("tes", "playlist", JSON.stringify({}));
// };
// a();
// sendCommand

const k = async () => {
  // let a = await client.rPush('key','Hel','EX',60);
  // let a = await client.v4.set('key','llo', 'EX', '30');
    // let a = await client.v4.sendCommand(['set','key','llo', 'EX', "30"]);
  // let a = await client.v4.get('key');
  // let a = await client.v4.expire('key', 30)
  // let a = await client.v4.ttl('0E8D87/user')
  // let a = await client.v4.lRange('A7C5C4/origin', 0, -1)
  let a = await client.v4.keys("*")
  // let a = await client.v4.FLUSHALL();
  console.log(a);
};
k();

// 데이터 전체 삭제
// let a = await client.v4.FLUSHALL();

// client.set("a", )

// const redis = require('redis');
// const client = redis.createClient();

// const list = [
//   { id: 1, name: 'John Doe', age: 30 },
//   { id: 2, name: 'Jane Doe', age: 25 },
//   { id: 3, name: 'Bob Smith', age: 40 }
// ];
// // Serialize objects into JSON strings and add to Redis list
// list.forEach((item) => {
//   const json = JSON.stringify(item);
//   client.rpush('mylist', json);
// });
// // Retrieve objects from Redis list and deserialize
// client.lrange('mylist', 0, -1, (err, result) => {
//   if (err) throw err;
//   const objects = result.map((json) => JSON.parse(json));
//   console.log(objects);
// });

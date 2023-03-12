// app.js에서 선언한 소켓연결함수를 이용하여 소켓과 연결시킨다.
const socket = io();

// html에서 데이터 가져오기
const nickname = document.querySelector("#nickname");
const chatlist = document.querySelector(".chatting-list");
const chatinput = document.querySelector(".chatting-input");
const sendbutton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatinput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    send();
  }
});

function send() {
  const param = {
    name: nickname.value,
    msg: chatinput.value,
  };
  socket.emit("chatting", param);
  document.querySelector(".chatting-input").value = ''
}

// html에서 입력한 값을 서버로 전송
sendbutton.addEventListener("click", send);

// 서버측으로 데이터를 보낼때 / 첫 번째 인수는 이름(아무거나 가능), 두 번째 인수는 데이터다.
// socket.emit("chatting", "from front")

// 서버측에서 보낸 데이터를 받을때 / 첫 번째 인수는 이름(아무거나 가능), 두 번째 인수는 콜백함수가 온다 변수로 데이터를 받는다..
socket.on("chatting", (data) => {
  const { name, msg, time } = data;
  const item = new LiModel(name, msg, time);
  item.makeLi();
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
});

function LiModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;
  this.makeLi = () => {
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "send" : "received");
    const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatlist.appendChild(li);
  };
}

console.log(socket);

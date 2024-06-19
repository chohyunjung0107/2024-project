const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  path: "/socket.io",
  cors: { origin: "*", methods: ["GET", "POST"] },
  allowedHeaders: ["Content-Type"],
});

const port = 5000;
let num = 0;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

server.listen(port, () => {
  console.log("소켓io port " + port);
});

// socket이 연결되었을 때
io.on("connection", (socket) => {
  console.log("새 클라이언트 접속", socket.id);

  let num = 0;

  socket.on("chat msg", (msg) => {
    if (msg === "안녕?") {
      //server -> client
      socket.emit("chat msg", "안녕하세요?");
    } else {
      //client로 받은 답 전달
      io.emit("chat msg", msg);
    }
  });

  //3초마다 클라이언트로 메시지 전송
  socket.interval = setInterval(() => {
    if (num > 100) {
      num = 0;
    }
    num++;

    socket.emit("news", num);
  }, 3000);

  socket.on("disconnect", () => {
    console.log("클라이언트 접속 해제", socket.id);
    clearInterval(socket.interval); // 연결 해제 시 인터벌 정리
  });
});

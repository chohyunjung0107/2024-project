const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const mysql = require("mysql2");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  path: "/socket.io",
  cors: { origin: "*", methods: ["GET", "POST"] },
  allowedHeaders: ["Content-Type"],
});

const port = 5000;
//db
app.set("posrt", 3001);
app.set("host", '10.10.0.218')

//db연결
var db_info = {
  host: '10.10.0.218',
  user: 'root',
  password: '1234',
  database: 'MYSQL',
  port: 3307,
}

//db
module.exports = {
  init: function () {
    return mysql.createConnection(db_info);
  },
  connect: function (conn) {
    conn.connect(function (err) {
      if (err) console.error("mysql connection error : " + err);
      else console.log("mysql is connected successfully!");
    });
  },
};

// app.use(cors());
app.use(
  cors({
    origin: "*", // 필요에 따라 특정 Origin을 설정
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);



//get 
app.get('/api/plass', function(req, res){
  var sql = "select * from testdb.testdb";
  conn.query(sql, function(){
    if(err) console.log("쿼리에러"+err)
    else res.send(result)
  })
})

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

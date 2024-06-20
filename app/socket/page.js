"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Loading from "../component/Loading";

const SOCKET_SERVER_URL = "http://localhost:5000"; // 서버 URL을 설정하세요

export default function Socket() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState({
    isName: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  //d
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);

  const [testNum, setTestNum] = useState(0);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  //GET
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users`);
      const result = await response.json();

      setData(result);
    } catch (err) {
      console.error("error:", err);
    } finally {
      setLoading(false);
    }
  };

  //POST
  const handlePostData = async () => {
    try {
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputValue.isName }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      result.message === "Data updated successfully" && getData();

      console.log("post결과", result);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Socket.IO 클라이언트 초기화
    const socket = io(SOCKET_SERVER_URL, {
      path: "/socket.io",
    });

    // 소켓 연결 설정
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // 메시지 수신 이벤트 설정
    socket.on("chat msg", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // 3초마다 1씩 증가하는 이벤트
    socket.on("news", (num) => {
      console.log("plus num", num);
      // setTestNum((prv) => prv + num);
      setTestNum(num);
    });

    // 소켓 상태에 저장
    setSocket(socket);

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim()) {
      // 서버로 메시지 전송
      socket.emit("chat msg", message);
      setMessage("");
    }
  };

  //api호출 use
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("testNum", testNum);
  }, [testNum]);

  return (
    <>
      <h1>
        <input
          name={"isName"}
          value={inputValue.isName}
          onChange={handleOnChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePostData();
            }
          }}
        />
        <button onClick={handlePostData}>수정</button>
        {loading === true ? (
          <Loading />
        ) : (
          data.length > 0 &&
          data?.map((v) => {
            return (
              <div key={v.id}>
                <div>name : {v.name}</div>
                <div>country : {v.country}</div>
              </div>
            );
          })
        )}
      </h1>
      <hr />
      {/* 챗팅 */}
      <div>
        <h1>Socket.IO Chat</h1>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div>
          <h2>Chat Messages / {testNum}</h2>
          {chat.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </>
  );
}

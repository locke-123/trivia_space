const express = require("express");
const http = require("http");
const cors = require("cors")
const { Server } = require("socket.io");
const axios = require("axios");

const app = express();
app.use(cors())

app.set("port", process.env.PORT || 3030); // 포트 설정
app.set("host", process.env.HOST || "127.0.0.1"); // 아이피 설정

const httpServer = http.createServer(app).listen(3030, () => {
    console.log("포트 3030에 연결되었습니다.");
});

const socketServer = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


socketServer.on("connection", socket => {
    console.log("connect client by Socket.io");

    GameCurtainTimer(socket);

    socket.on("first Request", req => {
        console.log(req);
        socket.emit("first Respond", { data: "firstRespond" });
    });
    socket.on("new Value", req => {
        console.log(req);
        socket.emit("new Value", { data: req.data + "is good" });
    });

    socket.on("new Problem", req => {
        DataFetching(socket)
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        socket.removeAllListeners();
    });
});

const DataFetching = (socket) => {
    const apiUrl = "https://opentdb.com/api.php?amount=1&type=multiple";
    axios.get(apiUrl)
        .then(response => {
            const data = response.data;
            console.log(data.results[0]);
            socket.emit("new Problem", data.results[0]);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

const GameCurtainTimer = (socket) => {
    let count = 3;
    const countdownInterval = setInterval(() => {
        if (count === 0) {
            clearInterval(countdownInterval);
            socket.emit("countdown", count);
            GameStartText(socket);
        } else {
            socket.emit("countdown", count);
            count--;
        }
    }, 1000);
    socket.on("disconnect", () => {
        console.log("clearInterval");
        clearInterval(countdownInterval);
    });
}

const GameStartText = (socket) => {
    setTimeout(() => {
        socket.emit("information Text", "안녕하십니까 여러분.");
        setTimeout(() => {
            socket.emit("information Text", "Trivia Space에 온것을 환영합니다.");
            setTimeout(() => {
                socket.emit("information Text", "지금부터 Trivia의 장르를 뽑도록 하겠습니다.");
                setTimeout(() => {
                    socket.emit("information Text", "이번 장르는 다음과 같습니다.");
                    const data = CategorySelector();
                    socket.emit("category select", {flag: true, data: data});
                }, 4000);
            }, 3000);
        }, 2000);
    }, 1000);
}

const CategorySelector = () => {
    const arr = ["일반 지식", "도서", "영화", "음악", "뮤지컬 및 극장", "텔레비전", "비디오 게임", "보드게임", "과학", "컴퓨터 과학", "수학", "신화", "스포츠", "지리", "역사", "정치", "예술", "유명인", "동물", "차량", "코믹스", "가젯", "일본 애니&만화", "카툰&애니"];
    const copyArray = [...arr];
    const randomItems = [];

    while (randomItems.length < 5 && copyArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * copyArray.length);
        randomItems.push(copyArray[randomIndex]);
        copyArray.splice(randomIndex, 1);
    }
    console.log(randomItems); 
    return randomItems;
}
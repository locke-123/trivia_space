const express = require("express");
const http = require("http");
const https = require('https');
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

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({ rejectUnauthorized: false }) // HTTPS 요청을 허용하는 설정
});

let roomMemberArr = [{title: "방제1", number: "315", member: 0, started: false, memberInfo: []}]
let roomCreateNum = 1;
let userArr = [];

socketServer.on("connection", socket => {
    console.log(socket.id);
    console.log("connect client by Socket.io to lobby");
    socket.join("lobby");

    socket.on("init", () => {
        console.log("init 요청 받음");
        socket.emit("refresh room info", roomMemberArr);
    });
    
    socket.on("session connect", (req) => {
        console.log("세션 연결");
        if(req.status === "authenticated") {
            if(userArr.find(user => user.id === req.data.user.id) === undefined) {
                userArr.push({id: req.data.user.id, name: req.data.user.name, socket: socket.id, money: 0, answer: "", playing: false})
            } else {
                userArr.find(user => user.id === req.data.user.id).socket = socket.id;
            }
            console.log("-----------------")
            console.log(userArr);
        }
    });

    socket.on("create room", (title) => {
        console.log(`누군가 ${roomCreateNum}방, 방제목: ${title}을 만듬`);
        roomMemberArr.push({title: title, number: roomCreateNum.toString(), member: 0, started: false, memberInfo: []});
        socket.emit("is room started", roomMemberArr.find(room => room.number === roomCreateNum.toString()).started, roomCreateNum.toString());
        console.log(socketServer.sockets.adapter.rooms);
        roomCreateNum++;
    });

    socket.on("somebody enter room", (req) => {
        console.log(`누군가 ${req}방에 들어감`);
        console.log(roomMemberArr, req);
        roomMemberArr.find(room => room.number === req).member += 1;
        console.log(socket.id);
        roomMemberArr.find(room => room.number === req).memberInfo.push(userArr.find(user => user.socket === socket.id));
        userArr.find(user => user.socket === socket.id).playing = true;
        socket.to("lobby").emit("refresh room info", roomMemberArr);
        socket.leave("lobby");
        socket.join("room|"+req);
        console.log(socketServer.sockets.adapter.rooms);
        GameStart(socket, req);
    });

    socket.on("somebody quit room", (req) => {
        LeaveRoom(socket);
    });

    socket.on("is room started", (req) => {
        socket.emit("is room started", roomMemberArr.find(room => room.number === req).started, req, userArr.find(user => user.socket === socket.id).playing);
    });

    socket.on("game start", (req) => {
        GameStartText(socket, req);
    });

    socket.on("Quiz Request", (req, number) => {
        socketServer.to("room|"+number).emit("block quiz", false);
        QuizStart(socket, req, number);
        socketServer.to("room|"+number).emit("quiz choice", req);
    });

    socket.on("Answer Request", (number) => {
        AnswerPart(socket, number)
    });

    socket.on("room member", (number) => {
        socketServer.to("room|"+number).emit("room member", roomMemberArr.find(room => room.number === number).memberInfo);
    });

    socket.on("User Answer", (req, number) => {
        roomMemberArr.find(room => room.number === number).memberInfo.find(user => user.socket === socket.id).answer = req
    });

    socket.on("disconnecting", () => {
        console.log("Client disconnecting");
        LeaveRoom(socket);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        socket.removeAllListeners();
    });
});

const LeaveRoom = (socket) => {
    for (const item of socket.rooms) {
        if (item.startsWith("room|")) {
            const number = item.split('|')[1];
            console.log(`누군가 ${number}방을 나감`);
            console.log(roomMemberArr);
            roomMemberArr.find(room => room.number === number).member -= 1;
            if(roomMemberArr.find(room => room.number === number).member <= 0) {
                roomMemberArr.splice(roomMemberArr.findIndex(room => room.number === number), 1);
                socket.leave(item);
                socket.join("lobby");
                socketServer.to("lobby").emit("refresh room info", roomMemberArr);
                console.log(socketServer.sockets.adapter.rooms);
            } else {
                socketServer.to("room|"+number).emit("can start game");
                const targetRoom = roomMemberArr.find(room => room.number === number).memberInfo
                targetRoom.splice(targetRoom.findIndex(user => user.socket === socket.id), 1);
                socket.leave(item);
                socket.to(item).emit("room member", roomMemberArr.find(room => room.number === number).memberInfo);
                socket.join("lobby");
                socketServer.to("lobby").emit("refresh room info", roomMemberArr);
                console.log(socketServer.sockets.adapter.rooms);
            }
            userArr.find(user => user.socket === socket.id).money = 0;
            userArr.find(user => user.socket === socket.id).answer = "";
            userArr.find(user => user.socket === socket.id).playing = false;
        }
    }
}

const GameStart = (socket, number) => {
    if(roomMemberArr.find(room => room.number === number).member > 1) {
        socketServer.to("room|"+number).emit("can start game");
    }
}

const GameStartText = (socket, number) => {
    socketServer.to("room|"+number).emit("start game");
    roomMemberArr.find(room => room.number === number).started = true;
    setTimeout(() => {
        socketServer.to("room|"+number).emit("information Text", "안녕하십니까 여러분.");
        setTimeout(() => {
            socketServer.to("room|"+number).emit("information Text", "Trivia Space에 온것을 환영합니다.");
            setTimeout(() => {
                socketServer.to("room|"+number).emit("information Text", "지금부터 Trivia의 장르를 뽑도록 하겠습니다.");
                setTimeout(() => {
                    socketServer.to("room|"+number).emit("information Text", "이번 장르는 다음과 같습니다.");
                    const data = CategorySelector();
                    socketServer.to("room|"+number).emit("category select", {flag: true, data: data});
                    setTimeout(() => {
                        socketServer.to("room|"+number).emit("information Text", "그럼, 지금부터 게임을 시작하겠습니다.");
                        ChoiceProblemPart(socket, number);
                    }, 3000);
                }, 3000);
            }, 3000);
        }, 2000);
    }, 1000);
}

const ChoiceProblemPart = (socket, number) => {
    setTimeout(() => {
        socketServer.to("room|"+number).emit("mainPageX", -1200);
        setTimeout(() => {
            socketServer.to("room|"+number).emit("information Text", "원하시는 카테고리와 문제를 골라주세요.");
            setTimeout(() => {
                socketServer.to("room|"+number).emit("block quiz", true);
            }, 1500);
        }, 1500);
    }, 1000);
}

let bill;

const QuizStart = (socket, req, number) => {
    const request = req.split(":");
    socketServer.to("room|"+number).emit("information Text", request[0] + " " + request[2] + "$를 고르셨습니다.");
    bill = request[2];
    const apiUrl = `https://opentdb.com/api.php?amount=1&category=${CategoryNumber(request[0])}&difficulty=${request[1]}&type=multiple`;
    axiosInstance.get(apiUrl)
        .then(response => {
            const data = response.data;
            console.log(data.results[0]);
            setTimeout(() => {
                socketServer.to("room|"+number).emit("mainPageX", -2400);
                QuizPart(socket, data.results[0], number);
            }, 1000);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

let answers = ["","","",""];
let correct_answer;

const QuizPart = (socket, data, number) => {
    data.incorrect_answers.push(data.correct_answer);
    answers = data.incorrect_answers;
    correct_answer = data.correct_answer;
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    setTimeout(() => {
        socketServer.to("room|"+number).emit("information Text", "그럼, 문제나갑니다.");
        setTimeout(() => {
            socketServer.to("room|"+number).emit("information Text", "");
            socketServer.to("room|"+number).emit("new Problem", data.question);
        }, 2000);
    }, 2000);
}

const AnswerPart = (socket, number) => {
    socketServer.to("room|"+number).emit("new Answer", answers);
    let count = 10;
    const countdownInterval = setInterval(() => {
        if (count === 0) {
            clearInterval(countdownInterval);
            socketServer.to("room|"+number).emit("quizCountdown", count);
            CheckAnswer(socket, number);
        } else {
            socketServer.to("room|"+number).emit("quizCountdown", count);
            count--;
        }
    }, 1000);
    socket.on("disconnect", () => {
        clearInterval(countdownInterval);
    });
    socket.on("somebody quit room", (req) => {
        clearInterval(countdownInterval);
    });
}

const CheckAnswer = (socket, number) => {
    setTimeout(() => {
        socketServer.to("room|"+number).emit("information Text", "정답은..");
        setTimeout(() => {
            socketServer.to("room|"+number).emit("information Text", correct_answer + "입니다.");
            socketServer.to("room|"+number).emit("open Answer", correct_answer);
            setTimeout(() => {
                let correct_user = 0;
                roomMemberArr.find(room => room.number === number).memberInfo.map((el) => {
                    if(el.answer === correct_answer) {
                        correct_user++;
                        el.money += Math.floor(Number(bill)/2);
                    }
                })
                console.log(correct_user)
                console.log(roomMemberArr.find(room => room.number === number).memberInfo);
                
                if(correct_user >= 1) {
                    socketServer.to("room|"+number).emit("information Text", `정답을 맞추신분들에게 ${bill}점을 드립니다.`);
                    socketServer.to("room|"+number).emit("room member", roomMemberArr.find(room => room.number === number).memberInfo);
                } else {
                    socketServer.to("room|"+number).emit("information Text", "이번엔 아무도 맞추지 못했습니다.");
                }
                setTimeout(() => {
                    socketServer.to("room|"+number).emit("information Text", "원하시는 카테고리와 문제를 골라주세요.");
                    socketServer.to("room|"+number).emit("mainPageX", -1200);
                    socketServer.to("room|"+number).emit("initial Quiz");
                    console.log("재시도");
                    socketServer.to("room|"+number).emit("block quiz", true);
                }, 3000);
            }, 1000);
        }, 1000);
    }, 2000);
}

const CategoryNumber = (string) => {
    const arr = ["일반 지식", "도서", "영화", "음악", "뮤지컬 및 극장", "텔레비전", "비디오 게임", "보드게임", "과학", "컴퓨터 과학", "수학", "신화", "스포츠", "지리", "역사", "정치", "예술", "유명인", "동물", "차량", "코믹스", "가젯", "일본 애니&만화", "카툰&애니"];
    const index = arr.indexOf(string);

    return index+9;
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
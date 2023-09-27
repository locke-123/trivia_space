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

let isGameStated = false;

const getRoomMemberArray = (roomName) => {
    const mySet = socketServer.sockets.adapter.rooms.get("room 237");
    if(mySet === undefined) {
        return [];
    } else {
        const result = Array.from(mySet);
        return result;
    }
}

socketServer.on("connection", socket => {
    console.log("connect client by Socket.io");

    if(getRoomMemberArray("room 237") > 2 || isGameStated === true){
        socket.disconnect();
    } else {
    socket.join("room 237");
    console.log(socketServer.sockets.adapter.rooms.get("room 237"));

    socket.on("request room member", () => {
        console.log(getRoomMemberArray("room 237"));
        socket.to("room 237").emit("room member", getRoomMemberArray("room 237"));
        socket.emit("room member", getRoomMemberArray("room 237"));
    });

    if(socketServer.sockets.adapter.rooms.get("room 237")?.size > 1) {
        GameCurtainTimer(socket);
    }

    socket.on("first Request", req => {
        console.log(req);
        socket.to("room 237").emit("first Respond", { data: "firstRespond" });
        socket.emit("first Respond", { data: "firstRespond" });
    });

    socket.on("Quiz Request", req => {
        socket.to("room 237").emit("quiz choice", req);
        socket.emit("quiz choice", req);
        socket.to("room 237").emit("block quiz");
        socket.emit("block quiz");
        QuizStart(socket, req);
    });

    socket.on("Answer Request", () => {
        QuizPart2(socket);
    });

    socket.on("disconnect", () => {
        socket.leave("room 237");
        console.log(getRoomMemberArray("room 237"));
        socket.to("room 237").emit("room member", getRoomMemberArray("room 237"));
        console.log("Client disconnected");
        socket.removeAllListeners();
    });
}
});

const GameCurtainTimer = (socket) => {
    let count = 3;
    const countdownInterval = setInterval(() => {
        if (count === 0) {
            clearInterval(countdownInterval);
            socket.to("room 237").emit("countdown", count);
            socket.emit("countdown", count);
            GameStartText(socket);
            isGameStated = true;
        } else {
            socket.to("room 237").emit("countdown", count);
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
        socket.to("room 237").emit("information Text", "안녕하십니까 여러분.");
        socket.emit("information Text", "안녕하십니까 여러분.");
        setTimeout(() => {
            socket.to("room 237").emit("information Text", "Trivia Space에 온것을 환영합니다.");
            socket.emit("information Text", "Trivia Space에 온것을 환영합니다.");
            setTimeout(() => {
                socket.to("room 237").emit("information Text", "지금부터 Trivia의 장르를 뽑도록 하겠습니다.");
                socket.emit("information Text", "지금부터 Trivia의 장르를 뽑도록 하겠습니다.");
                setTimeout(() => {
                    socket.to("room 237").emit("information Text", "이번 장르는 다음과 같습니다.");
                    socket.emit("information Text", "이번 장르는 다음과 같습니다.");
                    const data = CategorySelector();
                    socket.to("room 237").emit("category select", {flag: true, data: data});
                    socket.emit("category select", {flag: true, data: data});
                    setTimeout(() => {
                        socket.to("room 237").emit("information Text", "그럼, 지금부터 게임을 시작하겠습니다.");
                        socket.emit("information Text", "그럼, 지금부터 게임을 시작하겠습니다.");
                        ChoiceProblemPart(socket);
                    }, 3000);
                }, 4000);
            }, 3000);
        }, 2000);
    }, 1000);
}

const ChoiceProblemPart = (socket) => {
    setTimeout(() => {
        socket.to("room 237").emit("mainPageX", -1200);
        socket.emit("mainPageX", -1200);
        setTimeout(() => {
            socket.to("room 237").emit("information Text", "원하시는 카테고리와 문제를 골라주세요.");
            socket.emit("information Text", "원하시는 카테고리와 문제를 골라주세요.");
            socket.to("room 237").emit("block quiz");
            socket.emit("block quiz");
        }, 3000);
    }, 2000);
}

let bill;

const QuizStart = (socket, req) => {
    const responses = req.split(":");
    socket.to("room 237").emit("information Text", responses[0] + " " + responses[2] + "$를 고르셨습니다.");
    socket.emit("information Text", responses[0] + " " + responses[2] + "$를 고르셨습니다.");
    bill = responses[2];
    DataFetching(socket, responses);
}

let answers = ["","","",""];
let correct_answer;
let User_Answer;


const QuizPart = (socket, data) => {
    data.incorrect_answers.push(data.correct_answer);
    answers = data.incorrect_answers;
    correct_answer = data.correct_answer;
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    socket.on("User Answer", req => {
        User_Answer = req;
    });

    setTimeout(() => {
        socket.to("room 237").emit("information Text", "그럼, 문제나갑니다.");
        socket.emit("information Text", "그럼, 문제나갑니다.");
        setTimeout(() => {
            socket.to("room 237").emit("information Text", "");
            socket.emit("information Text", "");
            socket.to("room 237").emit("new Problem", data.question);
            socket.emit("new Problem", data.question);
        }, 2000);
    }, 2000);
}

const QuizPart2 = (socket) => {
    socket.to("room 237").emit("new Answer", answers);
    socket.emit("new Answer", answers);
    let count = 10;
    const countdownInterval2 = setInterval(() => {
        if (count === 0) {
            clearInterval(countdownInterval2);
            socket.to("room 237").emit("quizCountdown", count);
            socket.emit("quizCountdown", count);
            socket.off("User Answer", () => {});
            QuizPart3(socket);
        } else {
            socket.to("room 237").emit("quizCountdown", count);
            socket.emit("quizCountdown", count);
            count--;
        }
    }, 1000);
    socket.on("disconnect", () => {
        console.log("clearInterval2");
        clearInterval(countdownInterval2);
    });
}

const QuizPart3 = (socket) => {
    setTimeout(() => {
        socket.to("room 237").emit("information Text", "정답은..");
        socket.emit("information Text", "정답은..");
        setTimeout(() => {
            socket.to("room 237").emit("information Text", correct_answer + "입니다.");
            socket.emit("information Text", correct_answer + "입니다.");
            socket.to("room 237").emit("open Answer", correct_answer);
            socket.emit("open Answer", correct_answer);
            setTimeout(() => {
                if(correct_answer === User_Answer) {
                    socket.to("room 237").emit("information Text", `정답을 맞추신 ~님께 ${bill}점을 드립니다.`);
                    socket.emit("information Text", `정답을 맞추신 ~님께 ${bill}점을 드립니다.`);
                } else {
                    socket.to("room 237").emit("information Text", "이번엔 아무도 맞추지 못했습니다.");
                    socket.emit("information Text", "이번엔 아무도 맞추지 못했습니다.");
                }
                setTimeout(() => {
                    socket.to("room 237").emit("information Text", "원하시는 카테고리와 문제를 골라주세요.");
                    socket.emit("information Text", "원하시는 카테고리와 문제를 골라주세요.");
                    socket.to("room 237").emit("mainPageX", -1200);
                    socket.emit("mainPageX", -1200);
                    socket.to("room 237").emit("initial Quiz");
                    socket.emit("initial Quiz");
                    console.log("재시도");
                    socket.emit("block quiz");
                }, 3000);
            }, 1000);
        }, 1000);
    }, 2000);
}

const DataFetching = (socket, req) => {
    const apiUrl = `https://opentdb.com/api.php?amount=1&category=${CategoryNumber(req[0])}&difficulty=${req[1]}&type=multiple`;
    axiosInstance.get(apiUrl)
        .then(response => {
            const data = response.data;
            console.log(data.results[0]);
            setTimeout(() => {
                socket.to("room 237").emit("mainPageX", -2400);
                socket.emit("mainPageX", -2400);
                QuizPart(socket, data.results[0]);
            }, 1000);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
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
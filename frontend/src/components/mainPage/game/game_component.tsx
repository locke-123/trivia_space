import ProfileWrapperComponent from "@/components/subComponents/game/profileWrapper/profileWrapper_component"
import { Container, BottomProfilesWrapper, GameCurtain, CountDownValue, MainWrapper, InformationWrapper } from "./game_presenter" 
import io from 'socket.io-client';
import { Button, Input, Space } from "antd";
import { SetStateAction, use, useEffect, useState } from "react";
import Typist from 'react-typist';
import ChoiceTableWrapperComponent from "@/components/subComponents/game/choiceTableWrapper/choiceTableWrapper_component";
import CategoryChoiceWrapperComponent from "@/components/subComponents/game/categoryChoiceWrapper/categoryChoiceWrapper_component";
import QuizWrapperComponent from "@/components/subComponents/game/quizWrapper/quizWrapper_component";

const socketClient = io("http://127.0.0.1:3030");

export default function GameComponent() {
    const [curtainHeight, setCurtainHeight] = useState(700);
    const [mainPageX, setMainPageX] = useState(0);
    const [countValue, setCountValue] = useState(3);
    const [quizCountValue, setQuizCountValue] = useState(10);
    const [quizData, setQuizData] = useState("");
    const [answerData, setAnswerData] = useState(["","","",""]);
    const [activeAnswer, setActiveAnswer] = useState(false);
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
    const [answerButtonIndex, setAnswerButtonIndex] = useState(null);
    const [answerDataFlag, setAnswerDataFlag] = useState(0);
    const [informationText, setInformationText] = useState("");
    const [categoryData, setCategoryData] = useState({
        flag: true,
        data: [],
    })
    const [disabledButtons, setDisabledButtons] = useState([""]);


    useEffect(() => {
        socketClient.on("connect", () => {
            console.log("connection server");
        });
        socketClient.emit("first Request", { data: "first Reuqest" });

        socketClient.on("first Respond", req => {
            console.log(req);
        });

        socketClient.on("information Text", req => {
            console.log(req);
            setInformationText(req);
        });

        socketClient.on("mainPageX", req => {
            console.log("main 페이지 이동 = " + req);
            setMainPageX(req);
        });

        socketClient.on("category select", req => {
            console.log(req);
            setCategoryData(req);
        });

        socketClient.on("initial Quiz", () => {
            setQuizCountValue(10);
            setQuizData("");
            setAnswerData(["","","",""]);
            setActiveAnswer(false);
            setActiveButtonIndex(null);
            setAnswerButtonIndex(null);
            setAnswerDataFlag(0);
        });

        socketClient.on("countdown", (value) => {
            console.log(value);
            if (value === 0) {
                setCountValue(value);
                setCurtainHeight(95);
                socketClient.off("countdown");
            } else {
                setCountValue(value);
            }
        });

        socketClient.on("new Problem", (value) => {
            console.log(value);
            setQuizData(value);
        });

        socketClient.on("new Answer", (value) => {
            console.log(value);
            setAnswerData(value);
        });

        socketClient.on("quizCountdown", (value) => {
            console.log(value);
            setQuizCountValue(value);
        });

        socketClient.on("open Answer", (value) => {
            console.log(value);
            setAnswerButtonIndex(value);
        });
    
        socketClient.on("disconnect", () => {
            console.log("Disconnected from server");
        });
    }, [])

    const onClickQuiz = (e: any) => {
        console.log(e);
        console.log(e.target.id);
        setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, e.target.id]);
        socketClient.emit("Quiz Request", e.target.id);
    }
    
    const onQuizTypeDone = () => {
        if(quizData !== "") {
            socketClient.emit("Answer Request");
            setAnswerDataFlag(1);
            setActiveAnswer(true);
        } else {
            setAnswerDataFlag(0);
            setActiveAnswer(false);
        }
    }

    const onClickAnswer = (e: any) => {
        console.log(e);
        console.log(e.target.id);
        setActiveButtonIndex(e.target.title);
        socketClient.emit("User Answer", e.target.id);
        console.log(activeButtonIndex);
        console.log(answerButtonIndex);
    }

    return (
        <Container>
            <InformationWrapper><Typist key={informationText}>{informationText}</Typist></InformationWrapper>
            <MainWrapper style={{transform: `translateX(${mainPageX}px)`}} >
                <CategoryChoiceWrapperComponent categoryData={categoryData} />
                <ChoiceTableWrapperComponent disabledButtons={disabledButtons} categoryData={categoryData} onClickQuiz={onClickQuiz} />
                <QuizWrapperComponent activeAnswer={activeAnswer} answerButtonIndex={answerButtonIndex} activeButtonIndex={activeButtonIndex} quizData={quizData} onClickAnswer={onClickAnswer} onQuizTypeDone={onQuizTypeDone} answerData={answerData} answerDataFlag={answerDataFlag} quizCountValue={quizCountValue} />
            </MainWrapper>
            <GameCurtain style={{height: `${curtainHeight}px`}}>
                <CountDownValue style={countValue === 0 ? {opacity: "0"} : {opacity: "1"}}>{countValue}</CountDownValue>
            </GameCurtain>
            <BottomProfilesWrapper>
                <ProfileWrapperComponent />
                <ProfileWrapperComponent />
                <ProfileWrapperComponent />
                <ProfileWrapperComponent />
            </BottomProfilesWrapper>
        </Container>
    )
}
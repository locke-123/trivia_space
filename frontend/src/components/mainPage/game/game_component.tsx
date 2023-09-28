import ProfileWrapperComponent from "@/components/subComponents/game/profileWrapper/profileWrapper_component"
import { Container, BottomProfilesWrapper, GameCurtain, CountDownValue, MainWrapper, InformationWrapper, RoomController } from "./game_presenter" 
import io, { Socket } from 'socket.io-client';
import { Button, Input, Space } from "antd";
import { SetStateAction, use, useEffect, useRef, useState } from "react";
import Typist from 'react-typist';
import ChoiceTableWrapperComponent from "@/components/subComponents/game/choiceTableWrapper/choiceTableWrapper_component";
import CategoryChoiceWrapperComponent from "@/components/subComponents/game/categoryChoiceWrapper/categoryChoiceWrapper_component";
import QuizWrapperComponent from "@/components/subComponents/game/quizWrapper/quizWrapper_component";
import { useRouter } from "next/router";

export default function GameComponent({socketRef, roomNumber, setIsEntered}) {
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
    const [roomMemberArray, setRoomMemberArray] = useState([]);
    const [isAbleToClickQuiz, setIsAbleToClickQuiz] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            socketRef.current.on("room member", req => {
                console.log("room member", req);
                setRoomMemberArray(req);
            });
    
            socketRef.current.on("block quiz", () => {
                setIsAbleToClickQuiz(prev => !prev);
            });
    
            socketRef.current.on("information Text", req => {
                console.log(req);
                setInformationText(req);
            });
    
            socketRef.current.on("mainPageX", req => {
                console.log("main 페이지 이동 = " + req);
                setMainPageX(req);
            });
    
            socketRef.current.on("category select", req => {
                console.log(req);
                setCategoryData(req);
            });
    
            socketRef.current.on("initial Quiz", () => {
                setQuizCountValue(10);
                setQuizData("");
                setAnswerData(["","","",""]);
                setActiveAnswer(false);
                setActiveButtonIndex(null);
                setAnswerButtonIndex(null);
                setAnswerDataFlag(0);
            });
    
            socketRef.current.on("countdown", (value) => {
                console.log(value);
                if (value === 0) {
                    setCountValue(value);
                    setCurtainHeight(95);
                    socketRef.current!.off("countdown");
                } else {
                    setCountValue(value);
                }
            });
    
            socketRef.current.on("new Problem", (value) => {
                console.log(value);
                setQuizData(value);
            });
    
            socketRef.current.on("new Answer", (value) => {
                console.log(value);
                setAnswerData(value);
            });
    
            socketRef.current.on("quizCountdown", (value) => {
                console.log(value);
                setQuizCountValue(value);
            });
    
            socketRef.current.on("open Answer", (value) => {
                console.log(value);
                setAnswerButtonIndex(value);
            });

            socketRef.current.on("quiz choice", (value) => {
                console.log(value);
                setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, value]);
            });

            socketRef.current.emit("request room member");
        }
    }, [])

    const onClickQuiz = (e: any) => {
        console.log(e);
        console.log(e.target.id);
        socketRef.current!.emit("Quiz Request", e.target.id);
    }
    
    const onQuizTypeDone = () => {
        if(quizData !== "") {
            socketRef.current!.emit("Answer Request");
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
        socketRef.current!.emit("User Answer", e.target.id);
        console.log(activeButtonIndex);
        console.log(answerButtonIndex);
    }

    const onClickQuit = (e: any) => {
        socketRef.current!.emit("somebody quit room", roomNumber);
        setIsEntered(false);
    }

    return (
        <Container>
            <RoomController>
                <h1>{roomNumber}</h1>
                <Button onClick={onClickQuit}>나가기</Button>
            </RoomController>
            <InformationWrapper><Typist key={informationText}>{informationText}</Typist></InformationWrapper>
            <MainWrapper style={{transform: `translateX(${mainPageX}px)`}} >
                <CategoryChoiceWrapperComponent categoryData={categoryData} />
                <ChoiceTableWrapperComponent isAbleToClickQuiz={isAbleToClickQuiz} disabledButtons={disabledButtons} categoryData={categoryData} onClickQuiz={onClickQuiz} />
                <QuizWrapperComponent activeAnswer={activeAnswer} answerButtonIndex={answerButtonIndex} activeButtonIndex={activeButtonIndex} quizData={quizData} onClickAnswer={onClickAnswer} onQuizTypeDone={onQuizTypeDone} answerData={answerData} answerDataFlag={answerDataFlag} quizCountValue={quizCountValue} />
            </MainWrapper>
            <GameCurtain style={{height: `${curtainHeight}px`}}>
                <CountDownValue style={countValue === 0 ? {opacity: "0"} : {opacity: "1"}}>{countValue}</CountDownValue>
            </GameCurtain>
            <BottomProfilesWrapper>
                {roomMemberArray.map((el, key) => (
                    <ProfileWrapperComponent userName={el} key={key}/>
                ))}
            </BottomProfilesWrapper>
        </Container>
    )
}
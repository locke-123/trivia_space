import ProfileWrapperComponent from "@/components/subComponents/game/profileWrapper/profileWrapper_component"
import { Container, BottomProfilesWrapper, GameCurtain, MainWrapper, InformationWrapper, RoomController } from "./game_presenter" 
import { Button } from "antd";
import { CaretRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import Typist from 'react-typist-component';
import ChoiceTableWrapperComponent from "@/components/subComponents/game/choiceTableWrapper/choiceTableWrapper_component";
import CategoryChoiceWrapperComponent from "@/components/subComponents/game/categoryChoiceWrapper/categoryChoiceWrapper_component";
import QuizWrapperComponent from "@/components/subComponents/game/quizWrapper/quizWrapper_component";
import { GameComponentProps } from "@/components/subComponents/game/gameComponentTypes";

export default function GameComponent({socketRef, roomNumber, setIsEntered, sound, soundVolume, onChangeVolume }: GameComponentProps) {
    const [curtainHeight, setCurtainHeight] = useState(700);
    const [mainPageX, setMainPageX] = useState(0);
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
    const [isAbleToClickQuiz, setIsAbleToClickQuiz] = useState(false);
    const [showGameStartButton, setShowGameStartButton] = useState(false);
    const [showWaitMsg, setShowWaitMsg] = useState(true);
    const [MemberInfo, setMemberInfo] = useState([{name: "aaa", money: 0}]);

    useEffect(() => {
        sound.waitingBGM.play();

        if (typeof window !== 'undefined') {
            socketRef.current!.on("room member", (res) => {
                setMemberInfo(res);
            });

            socketRef.current!.on("can start game", (bool) => {
                setShowGameStartButton(bool);
            });

            socketRef.current!.on("start game", () => {
                setShowWaitMsg(false);
                setShowGameStartButton(false);
                setCurtainHeight(95);
                if(sound.waitingBGM.playing()) {
                    sound.waitingBGM.stop();
                    sound.gameStart.play();
                    sound.startGameBGM.play();
                    sound.gameBGM.play();
                }
            });

            socketRef.current!.on("block quiz", (res) => {
                setIsAbleToClickQuiz(res);
            });
    
            socketRef.current!.on("information Text", req => {
                setInformationText(req);
            });
    
            socketRef.current!.on("mainPageX", req => {
                setMainPageX(req);
            });
    
            socketRef.current!.on("category select", req => {
                setCategoryData(req);
            });
    
            socketRef.current!.on("initial Quiz", () => {
                setQuizCountValue(10);
                setQuizData("");
                setAnswerData(["","","",""]);
                setActiveAnswer(false);
                setActiveButtonIndex(null);
                setAnswerButtonIndex(null);
                setAnswerDataFlag(0);
            });
    
            socketRef.current!.on("new Problem", (value) => {
                setQuizData(value);
                sound.newsTing.play();
            });
    
            socketRef.current!.on("new Answer", (value) => {
                setAnswerData(value);
            });
    
            socketRef.current!.on("quizCountdown", (value) => {
                if(!sound.thinkingTime.playing()) {
                    sound.thinkingTime.play();
                }
                if(value === 0) {
                    sound.bellRing.play();
                }
                setQuizCountValue(value);
            });
    
            socketRef.current!.on("open Answer", (value) => {
                setAnswerButtonIndex(value);
            });

            socketRef.current!.on("quiz choice", (value) => {
                sound.interface.play();
                setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, value]);
            });

            socketRef.current!.emit("room member", roomNumber);

            return () => {
                socketRef.current!.emit("somebody quit room", roomNumber);
                sound.waitingBGM.stop();
                sound.startGameBGM.stop();
                sound.gameBGM.stop();
            }
        }
    }, [])

    const onClickQuiz = (e: any) => {
        socketRef.current!.emit("Quiz Request", e.target.id, roomNumber);
    }
    
    const onQuizTypeDone = () => {
        if(quizData !== "") {
            socketRef.current!.emit("Answer Request", roomNumber);
            setAnswerDataFlag(1);
            setActiveAnswer(true);
        } else {
            setAnswerDataFlag(0);
            setActiveAnswer(false);
        }
    }

    const onClickAnswer = (e: any) => {
        setActiveButtonIndex(e.target.title);
        socketRef.current!.emit("User Answer", e.target.id, roomNumber);
    }

    const onClickQuit = (e: any) => {
        socketRef.current!.emit("somebody quit room", roomNumber);
        setIsEntered(false);
    }

    const onClickGameStart = () => {
        socketRef.current!.emit("game start", roomNumber);
    }

    return (
        <Container>
            <RoomController>
                <div style={{fontSize: "24px", backgroundColor: "#b475eb", borderRadius: "16px", padding: "5px 20px", margin: "0px 10px", color: "#fff"}}>{roomNumber}</div>
                <Button onClick={onClickQuit}>나가기</Button>
            </RoomController>
            <InformationWrapper><Typist key={informationText}>{informationText}</Typist></InformationWrapper>
            <MainWrapper style={{transform: `translateX(${mainPageX}px)`}} >
                <CategoryChoiceWrapperComponent categoryData={categoryData} />
                <ChoiceTableWrapperComponent isAbleToClickQuiz={isAbleToClickQuiz} disabledButtons={disabledButtons} categoryData={categoryData} onClickQuiz={onClickQuiz} />
                <QuizWrapperComponent activeAnswer={activeAnswer} answerButtonIndex={answerButtonIndex} activeButtonIndex={activeButtonIndex} quizData={quizData} onClickAnswer={onClickAnswer} onQuizTypeDone={onQuizTypeDone} answerData={answerData} answerDataFlag={answerDataFlag} quizCountValue={quizCountValue} />
            </MainWrapper>
            <GameCurtain style={{height: `${curtainHeight}px`}}>
                {showGameStartButton ? <Button icon={<CaretRightOutlined />} type="primary" style={{width: "300px", height: "100px", fontSize: "36px", border: "1px solid #705f80"}} size="large" onClick={onClickGameStart}>게임시작</Button> : showWaitMsg ? <h1 style={{color: "#fff"}}>대기중..</h1> : "" }
            </GameCurtain>
            <BottomProfilesWrapper>
                {MemberInfo.map((el, key) => (
                    <ProfileWrapperComponent userName={el.name} money={el.money} num={key} key={key}/>
                ))}
            </BottomProfilesWrapper>
        </Container>
    )
}
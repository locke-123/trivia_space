import ProfileWrapperComponent from "@/components/subComponents/game/profileWrapper/profileWrapper_component"
import { Container, BottomProfilesWrapper, GameCurtain, CountDownValue, MainWrapper, InformationWrapper } from "./game_presenter" 
import io from 'socket.io-client';
import { Button, Input, Space } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import Typist from 'react-typist';
import ChoiceTableWrapperComponent from "@/components/subComponents/game/choiceTableWrapper/choiceTableWrapper_component";
import CategoryChoiceWrapperComponent from "@/components/subComponents/game/categoryChoiceWrapper/categoryChoiceWrapper_component";

const socketClient = io("http://127.0.0.1:3030");

export default function GameComponent() {
    const [inputVal, setInputVal] = useState("");
    const [curtainHeight, setCurtainHeight] = useState(700);
    const [countValue, setCountValue] = useState(3);
    const [informationText, setInformationText] = useState("");
    const [categoryData, setCategoryData] = useState({
        flag: false,
        data: [],
    })

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

        socketClient.on("category select", req => {
            console.log(req);
            setCategoryData(req);
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
        });
    
        socketClient.on("disconnect", () => {
            console.log("Disconnected from server");
        });
    }, [])

    const onChangeVal = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputVal(e.target.value);
    }

    const onClickBtn = () => {
        console.log(inputVal);
        socketClient.emit("new Value", { data: inputVal });
        socketClient.emit("new Problem");
    }

    return (
        <Container>
            <InformationWrapper><Typist key={informationText}>{informationText}</Typist></InformationWrapper>
            <MainWrapper>
                <CategoryChoiceWrapperComponent categoryData={categoryData} />
                <ChoiceTableWrapperComponent />
                <ChoiceTableWrapperComponent />
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
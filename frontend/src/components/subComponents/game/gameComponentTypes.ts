import { Dispatch, MouseEventHandler, MutableRefObject, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface categoryDataProps {
    categoryData : {
        flag: boolean;
        data: string[];
    }
}

export interface choiceTableWrapperProps {
    categoryData : {
        flag: boolean;
        data: string[];
    }
    onClickQuiz: MouseEventHandler<HTMLElement>;
    disabledButtons : string[];
    isAbleToClickQuiz: boolean;
}

export interface quizWrapperProps {
    quizData : string;
    onQuizTypeDone: () => void;
    answerData: string[];
    answerDataFlag: number;
    quizCountValue: number;
    onClickAnswer: (e: any) => void;
    activeButtonIndex: string|null;
    answerButtonIndex: string|null;
    activeAnswer: boolean;
}

export interface GameComponentProps {
    socketRef : MutableRefObject<Socket | null>;
    roomNumber: number | undefined;
    setIsEntered: Dispatch<SetStateAction<boolean>>;
    soundVolume: number;
    sound: soundProps;
    onChangeVolume: (value: number) => void;
}

export interface RoomComponentProps {
    roomList: never[] | roomListProps[];
    socketRef : MutableRefObject<Socket | null>;
    setRoomNumber: Dispatch<SetStateAction<undefined>>;
    setIsEntered: Dispatch<SetStateAction<boolean>>;
    soundVolume: number;
    sound: soundProps;
    onChangeVolume: (value: number) => void;
}

export interface ChatComponentProps {
    socketRef : MutableRefObject<Socket | null>;
    roomNumber: number | undefined;
    isEntered: boolean;
}

interface soundProps {
    roomBGM: Howl;
    waitingBGM: Howl;
    startGameBGM: Howl;
    thinkingTime: Howl;
    gameStart: Howl;
    interface: Howl;
    gameBGM: Howl;
    bellRing: Howl;
    newsTing: Howl;
}

export interface roomListProps {
    number: string;
    title: string;
    member: string;
}

export interface HeaderComponentProps {
    socketRef? : MutableRefObject<Socket | null>;
}

export interface ProfileWrapperComponentProps {
    userName: string;
    money: number;
    num: number;
}
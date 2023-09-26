import { MouseEventHandler } from "react";

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
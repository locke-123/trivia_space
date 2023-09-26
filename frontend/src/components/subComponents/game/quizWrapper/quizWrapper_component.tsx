import { Container, QuizWrapper, AnswerWrapper, QuizCountDownWrapper } from "./quizWrapper_presenter";
import type { quizWrapperProps } from "../gameComponentTypes";
import { Button } from "antd";
import Typist from "react-typist";

export default function QuizWrapperComponent({ quizData, onQuizTypeDone, answerData, answerDataFlag, quizCountValue, onClickAnswer, activeButtonIndex, answerButtonIndex, activeAnswer }: quizWrapperProps){

    return (
        <Container>
            <QuizCountDownWrapper>{quizCountValue}</QuizCountDownWrapper>
            <QuizWrapper><Typist onTypingDone={onQuizTypeDone} key={quizData}>{quizData}</Typist></QuizWrapper>
            <AnswerWrapper>
                {answerData.map((data, index) => (
                    <Button title={data} disabled={activeButtonIndex !== null && activeButtonIndex !== data} 
                    key={index} onClick={onClickAnswer} style={!activeAnswer ? {opacity: `0`, pointerEvents: "none"} : answerButtonIndex !== null && answerButtonIndex !== data ? 
                        {opacity: `0`, pointerEvents: "none"}:
                        {opacity: `${answerDataFlag}`, pointerEvents: "auto"}} 
                    id={data} block size="large"><span id={data}>{data}</span></Button>
                ))}
            </AnswerWrapper>
        </Container>
    )
}
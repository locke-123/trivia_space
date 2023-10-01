import styled from "@emotion/styled";

export const Container = styled.div`
    width: 1200px;
    height: 100%;
    padding: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`

export const QuizWrapper = styled.div`
    width: 1000px;
    font-size: 24px;
    display: flex;
    justify-content: center;
`

export const AnswerWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    transition: opacity 1s ease-in-out;
`

export const QuizCountDownWrapper = styled.div`
    position: absolute;
    font-size: 36px;
    top: 20px;
    right: 20px;
`
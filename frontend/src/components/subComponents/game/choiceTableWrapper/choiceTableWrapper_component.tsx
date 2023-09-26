import { Button } from "antd";
import { Container, CategoryWrapper, CategoryTitle } from "./choiceTableWrapper_presenter";
import { choiceTableWrapperProps } from "../gameComponentTypes";

export default function ChoiceTableWrapperComponent({ categoryData, onClickQuiz, disabledButtons }: choiceTableWrapperProps) {

    return (
        <Container>
            {categoryData.flag ? categoryData.data.map((el, key) => {
                return (
                    <CategoryWrapper key={key}>
                        <CategoryTitle>{el}</CategoryTitle>
                        <Button disabled={disabledButtons.includes(el + ":easy:100")} onClick={onClickQuiz} id={el + ":easy:100"} type="primary" size="large" block><span id={el + ":easy:100"}>100$</span></Button>
                        <Button disabled={disabledButtons.includes(el + ":easy:200")} onClick={onClickQuiz} id={el + ":easy:200"} type="primary" size="large" block><span id={el + ":easy:200"}>200$</span></Button>
                        <Button disabled={disabledButtons.includes(el + ":medium:400")} onClick={onClickQuiz} id={el + ":medium:400"} type="primary" size="large" block><span id={el + ":medium:400"}>400$</span></Button>
                        <Button disabled={disabledButtons.includes(el + ":medium:600")} onClick={onClickQuiz} id={el + ":medium:600"} type="primary" size="large" block><span id={el + ":medium:600"}>600$</span></Button>
                        <Button disabled={disabledButtons.includes(el + ":hard:800")} onClick={onClickQuiz} id={el + ":hard:800"} type="primary" size="large" block><span id={el + ":hard:800"}>800$</span></Button>
                        <Button disabled={disabledButtons.includes(el + ":hard:1000")} onClick={onClickQuiz} id={el + ":hard:1000"} type="primary" size="large" block><span id={el + ":hard:1000"}>1000$</span></Button>
                    </CategoryWrapper>
                )
            }) : ''}
        </Container>
    )
}
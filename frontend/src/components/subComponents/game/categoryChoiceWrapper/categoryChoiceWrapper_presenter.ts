import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`

export const Container = styled.div`
    width: 1200px;
    height: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const CategoryCard = styled.div`
    background-color: white;
    width: 200px;
    height: 100px;
    border-radius: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    box-shadow: 0px 0px 3px 1px #ccc;
    animation: ${slideIn} 1s ease-in-out;
`
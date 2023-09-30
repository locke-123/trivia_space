import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
    position: relative;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Wrapper = styled.div`
    position: relative;
    border: 1px solid #ccc;
    border-radius: 16px;
    width: 1200px;
    height: 500px;
    margin: 0 auto;
    margin-top: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: 1px solid #aaa;
    padding: 30px;
    margin-top: 20px;
`

export const RankingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;
`

export const MainText = styled.div`
    margin: 30px;
    color: white;
    font-size: 36px;
    font-weight: bold;
`

const MoveCategory = keyframes`
  from {
    transform: translateX(25%);
  }
  to {
    transform: translateX(-25%);
  }
`

export const CategoryWrapper = styled.div`
    background-color: #333;
    box-shadow: 0px 0px 3px 1px #000;
    display: flex;
    flex-direction: row;
    animation: ${MoveCategory} 60s linear infinite forwards;
`

export const CategoryList = styled.div`
    display: flex;
    flex-direction: row;
`

export const CategoryBlock = styled.div`
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    box-shadow: 0px 0px 2px 1px #ccc;
    margin: 10px;
    text-wrap: nowrap;
`

export const BottomWrapper = styled.div`
    border-top: 1px solid #ccc;
    margin-top: 50px;
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
`

export const OuterImgWrapper = styled.div`
    position: absolute;
    left: -50px;
    top: 250px;
    border-radius: 16px;
    overflow: hidden;
    width: 500px;
    height: 300px;
    box-shadow: 0px 1px 5px 1px #aaa;
`

export const InnerImgWrapper = styled.div`
    border-radius: 16px;
    overflow: hidden;
    width: 500px;
    height: 300px;
    box-shadow: 0px 0px 5px 1px #aaa;
`

export const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

export const MainWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const CircleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 500px;
    height: 100px;
`
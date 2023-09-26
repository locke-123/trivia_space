import styled from "@emotion/styled";

export const Container = styled.div`
    border: 1px solid #ccc;
    border-radius: 16px;
    width: 1200px;
    height: 700px;
    margin: 0 auto;
    margin-top: 20px;
    position: relative;
`

export const BottomProfilesWrapper = styled.div`
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

export const GameCurtain = styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 95px; // 95px or 700px
    background-color: #895fad;
    transition: height 1s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const CountDownValue = styled.div`
    font-size: 36px;
    color: white;
`

export const InformationWrapper = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content:center;
    align-items: center;
`

export const MainWrapper = styled.div`
    position: absolute;
    top: 50px;
    background-color: rgba(0.5, 0.5, 0.5, 0.1);
    width: 3600px;
    height: 555px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: transform 1s ease-in-out;
`
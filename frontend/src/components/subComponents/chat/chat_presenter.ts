import styled from "@emotion/styled";

export const Container = styled.div`
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 1200px;
    height: 150px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
`

export const ChatContainer = styled.div`
    width:100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
    padding: 10px 20px;
`

export const ChatInputWrapper = styled.div`
    width:100%;
`

export const ChatTextWrapper = styled.div`
    width:100%;
`
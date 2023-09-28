import styled from "@emotion/styled";

export const Container = styled.div`
    border: 1px solid #ccc;
    border-radius: 16px;
    width: 1200px;
    height: 700px;
    margin: 0 auto;
    margin-top: 20px;
    background-color: white;
`

export const MainTitle = styled.div`
    background-color: #885d9b;
    padding: 20px 0px 20px 150px;
    font-size: 20px;
    border-radius: 16px 16px 0px 0px;
    color: white;
    font-weight: 500;
`

export const RoomsWrapper = styled.div`
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 20px 90px 0px 110px;
`

export const Room = styled.div`
    width: 300px;
    height: 100px;
    border-radius: 12px;
    border: 1px solid #aaa;
    box-shadow: 0px 0px 2px 1px #ccc;
    margin: 10px;
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
        box-shadow: 0px 0px 5px 1px #aaa;
    }
`

export const RoomTitle = styled.div`
    padding: 10px 0px 10px 10px;
    border-bottom: 1px solid #aaa;
`

export const RoomInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 50px;
`

export const RoomNumber = styled.div`
    font-size: 24px;
`

export const RoomMember = styled.div`
    font-size: 24px;
`
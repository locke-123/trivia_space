import { use, useState } from "react";
import { Container, Room, RoomsWrapper, MainTitle, RoomTitle, RoomInfo, RoomNumber, RoomMember  } from "./room_presenter" 


export default function RoomComponent({ roomList, setIsEntered, socketRef, setRoomNumber }) {
    const onClickRoom = (e: any) => {
        console.log(e.target.id + "로 룸 입장");
        setIsEntered(true);
        setRoomNumber(e.target.id);
        socketRef.current.emit("somebody enter room", e.target.id);
    }

    return (
        <Container>
            <MainTitle>방 목록</MainTitle>
            <RoomsWrapper>
                {roomList.map((el, key) => (
                    <Room onClick={onClickRoom} key={key} id={el.number}>
                        <RoomTitle id={el.number}>{el.title}</RoomTitle>
                        <RoomInfo id={el.number}><RoomNumber id={el.number}>No.{el.number}</RoomNumber><RoomMember id={el.number}>{el.member}/4</RoomMember></RoomInfo>
                    </Room>
                ))}
            </RoomsWrapper>
        </Container>
    )
}
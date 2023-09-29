import { useState } from "react";
import { Container, Room, RoomsWrapper, MainTitle, RoomTitle, RoomInfo, RoomNumber, RoomMember  } from "./room_presenter" 
import { Button, Input, Modal } from "antd";
import { RoomComponentProps } from "@/components/subComponents/game/gameComponentTypes";


export default function RoomComponent({ roomList, setIsEntered, socketRef, setRoomNumber }: RoomComponentProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [titleValue, setTitleValue] = useState();
    
    const onClickRoom = (e: any) => {
        console.log(e.target.id + "로 룸 입장 시도");
        socketRef.current!.emit("is room started", e.target.id);
    }

    const onChangeTitle = (e: any) => {
        setTitleValue(e.target.value);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        socketRef.current!.emit("create room", titleValue);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
            <MainTitle>방 목록 <Button style={{marginLeft: '200px'}} onClick={showModal}>방 만들기</Button></MainTitle>
            <Modal title="방 만들기" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input onChange={onChangeTitle} placeholder="방 제목" />
            </Modal>
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
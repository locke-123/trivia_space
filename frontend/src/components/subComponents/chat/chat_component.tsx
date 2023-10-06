import { Button, Input, Space } from 'antd';
import { Container, ChatContainer, ChatInputWrapper, ChatTextWrapper } from './chat_presenter';
import { useEffect, useState } from 'react';
import { ChatComponentProps } from '../game/gameComponentTypes';

export default function ChatComponent({socketRef, roomNumber, isEntered} : ChatComponentProps) {

    const [chatVal, setChatVal] = useState("");
    const [chatArr, setChatArr] = useState<string[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            socketRef.current!.on("chatSubmit", (text: string) => {
                chatUpdate(text);
            });
        }
    },[])

    useEffect(() => {
        setChatArr([]);
    },[isEntered])

    const chatUpdate = (text: string) => {
        setChatArr(prev => [text, ...prev]);
    }

    const onClickOrEnterChat = () => {
        socketRef.current!.emit("chatSubmit", chatVal, roomNumber);
        setChatVal('');
    }

    const onChangeChatVal = (e: any) => {
        setChatVal(e.target.value);
    }

    return (
        <Container>
            <ChatContainer>
                {chatArr.map((el, key) => (
                    <ChatTextWrapper key={key}>{el}</ChatTextWrapper>
                ))}
            </ChatContainer>
            <ChatInputWrapper>
                <Space.Compact style={{ width: '100%' }}>
                    <Input value={chatVal} onChange={onChangeChatVal} onPressEnter={onClickOrEnterChat} placeholder='채팅 입력' />
                    <Button onClick={onClickOrEnterChat} type="primary">보내기</Button>
                </Space.Compact>
            </ChatInputWrapper>
        </Container>
    )
}
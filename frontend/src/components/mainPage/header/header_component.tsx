import { Container, LogoWrapper, AvatarWrapper } from "./header_presenter"
import { BookOutlined, CaretRightOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Avatar, Button, Menu } from 'antd';
import Image from "next/image";
import logo from "../../../../public/Trivia-Space-Logo.webp"
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { HeaderComponentProps } from "@/components/subComponents/game/gameComponentTypes";

const items: MenuProps['items'] = [
  {
    label: '소개',
    key: 'welcome',
    icon: <BookOutlined />,
  },
  {
    label: '게임 참가',
    key: '/game',
    icon: <CaretRightOutlined />
  },
  {
    label: '기타 페이지',
    key: 'app2',
  },
];

const items2: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

export default function HeaderComponent({socketRef}: HeaderComponentProps) {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const session = useSession();
  const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
      router.push(e.key);
  };

  if(socketRef !== undefined) {
    if(socketRef.current !== null) {
      console.log(session);
      console.log(socketRef);
      socketRef.current!.emit("session connect", session);
    }
  }

  return (
      <Container>
          <LogoWrapper><Image src={logo} alt="logo" /></LogoWrapper>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
          {session.data ? <AvatarWrapper>
                        <Avatar style={{ backgroundColor: '#6e6e6e' }} icon={<UserOutlined />} />
                        <Button onClick={() => signOut()} >로그아웃</Button>
                    </AvatarWrapper>
          : <Button onClick={() => signIn("naver")} >로그인</Button>}
      </Container>
  )
}
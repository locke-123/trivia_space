import { Container, LogoWrapper, ProfileWrapper } from "./header_presenter"
import { BookOutlined, CaretRightOutlined, GithubOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import Image from "next/image";
import logo from "../../../../public/Trivia-Space-Logo.webp"
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { HeaderComponentProps } from "@/components/subComponents/game/gameComponentTypes";

const items: MenuProps['items'] = [
  {
    label: '소개',
    key: '/',
    icon: <BookOutlined />,
  },
  {
    label: '게임 참가',
    key: '/game',
    icon: <CaretRightOutlined />
  },
  {
    label: '웹 사이트 정보',
    key: '/info',
    icon: <GithubOutlined />
  },
];

export default function HeaderComponent({socketRef}: HeaderComponentProps) {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const session = useSession();
  const onClick: MenuProps['onClick'] = (e) => {
      setCurrent(e.key);
      router.push(e.key);
  };

  if(socketRef !== undefined) {
    if(socketRef.current !== null) {
      socketRef.current!.emit("session connect", session);
    }
  }

  return (
      <Container>
          <LogoWrapper><Image src={logo} alt="logo" /></LogoWrapper>
          <Menu style={{width: "400px"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
          {session.data ? 
          <ProfileWrapper>
            <h4>{session.data.user?.name} 님</h4>
            <Button onClick={() => signOut()} >로그아웃</Button>
          </ProfileWrapper>
          : <ProfileWrapper>
            <Button onClick={() => signIn("naver")} >로그인</Button>
          </ProfileWrapper>}
      </Container>
  )
}
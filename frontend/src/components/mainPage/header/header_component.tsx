import { Container, LogoWrapper, AvatarWrapper } from "./header_presenter"
import { BookOutlined, CaretRightOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Avatar, Button, Menu } from 'antd';
import Image from "next/image";
import logo from "../../../../public/Trivia-Space-Logo.webp"
import { useRouter } from "next/router";

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

export default function HeaderComponent() {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  
  const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
      router.push(e.key);
  };

  return (
      <Container>
          <LogoWrapper><Image src={logo} alt="logo" /></LogoWrapper>
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
          <AvatarWrapper>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              <Button type="text" size="small">로그아웃</Button>
          </AvatarWrapper>
      </Container>
  )
}
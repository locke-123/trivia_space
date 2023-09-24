import { Container, LogoWrapper, AvatarWrapper } from "./presenter"
import { BookOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Menu, Space } from 'antd';
import Image from "next/image";
import logo from "../../../public/Trivia-Space-Logo.webp"

const items: MenuProps['items'] = [
  {
    label: '소개 페이지',
    key: 'welcome',
    icon: <BookOutlined />,
  },
  {
    label: '기타 페이지',
    key: 'app',
  },
  {
    label: '기타 페이지',
    key: 'app2',
  },
  {
    label: '기타 페이지',
    key: 'app3',
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
    const [current, setCurrent] = useState('welcome');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
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
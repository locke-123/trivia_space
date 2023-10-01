import { Avatar } from "antd"
import { ProfileWrapper, InfoWrapper } from "./profileWrapper_presenter"
import { UserOutlined } from '@ant-design/icons';
import { ProfileWrapperComponentProps } from "../gameComponentTypes";
import { useEffect, useState } from "react";

export default function ProfileWrapperComponent({ userName, money, num }: ProfileWrapperComponentProps) {
    const [color, setColor] = useState('');

    useEffect(() => {
        switch (num) {
            case 0:
                setColor('#ccc');
                break;
            case 1:
                setColor('green');
                break;
            case 2:
                setColor('yellow');
                break;
            case 3:
                setColor('blue');
                break;
        }
    }, [])

    return (
        <ProfileWrapper>
            <Avatar style={{ backgroundColor: color }} icon={<UserOutlined />} />
            <InfoWrapper>
                <span>{userName}</span>
                <span>{money}</span>
            </InfoWrapper>
        </ProfileWrapper>
    )
}
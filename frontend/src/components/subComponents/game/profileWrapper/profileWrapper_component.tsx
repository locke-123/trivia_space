import { Avatar } from "antd"
import { ProfileWrapper, InfoWrapper } from "./profileWrapper_presenter"
import { UserOutlined } from '@ant-design/icons';
import { ProfileWrapperComponentProps } from "../gameComponentTypes";

export default function ProfileWrapperComponent({ userName, money }: ProfileWrapperComponentProps) {


    return (
        <ProfileWrapper>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <InfoWrapper>
                <span>{userName}</span>
                <span>{money}</span>
            </InfoWrapper>
        </ProfileWrapper>
    )
}
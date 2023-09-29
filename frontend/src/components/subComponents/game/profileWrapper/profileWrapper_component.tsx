import { Avatar } from "antd"
import { ProfileWrapper, InfoWrapper } from "./profileWrapper_presenter"
import { UserOutlined } from '@ant-design/icons';

export default function ProfileWrapperComponent({ userName, money }) {


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
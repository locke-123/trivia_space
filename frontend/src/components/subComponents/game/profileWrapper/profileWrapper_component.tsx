import { Avatar } from "antd"
import { ProfileWrapper, InfoWrapper } from "./profileWrapper_presenter"
import { UserOutlined } from '@ant-design/icons';

export default function ProfileWrapperComponent({ userName }) {


    return (
        <ProfileWrapper>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <InfoWrapper>
                <span>{userName}</span>
                <span>156346</span>
            </InfoWrapper>
        </ProfileWrapper>
    )
}
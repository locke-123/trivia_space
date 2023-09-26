import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 0px 5px 2px #4a0f60;
`

export const LogoWrapper = styled.div`
    margin-right: 50px;
    &:first-child {
        pointer-events : none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }
`

export const AvatarWrapper = styled.div`
    margin-left: 50px;
    width: 130px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
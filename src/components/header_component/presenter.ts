import styled from '@emotion/styled';

export const Container = styled.div`
    width: 100%;
    min-width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 5px 2px #4a0e65;
`

export const LogoWrapper = styled.div`
    margin-right: 100px;
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
    margin-left: 100px;
    width: 120px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
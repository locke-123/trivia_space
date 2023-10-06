import type { GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import authOptions from "../api/auth/[...nextauth]";
import { Button } from "antd";
import styled from "@emotion/styled";
import Image from "next/image";
import logo from "../../../public/Trivia-Space-Logo.webp"
import { useRouter } from "next/router";
import Head from "next/head";

export default function SignIn() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Trivia Space</title>
        <meta name="description" content="실시간 상식 퀴즈 대결 웹사이트 Trivia Space" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <LogoWrapper><Image src={logo} alt="logo" /></LogoWrapper>
        <InfoText>네이버 로그인을 통해 게임에 참가하실 수 있습니다.</InfoText>
        <Button style={{width: '300px', height: '50px', fontSize: '18px', backgroundColor: '#03c75a', color:'white', fontWeight: 'bold'}} onClick={() => {signIn("naver", { callbackUrl: 'http://localhost:3000/game'});}}>
            네이버 로그인
        </Button>
        <Button style={{marginTop: '65px'}} onClick={() => {router.push('/')}}>
          돌아가기
        </Button>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }
  
  return {
    props: {},
  }
}

const Container = styled.div`
  border: 1px solid #895fadff;
  border-radius: 16px;
  box-shadow: 0px 0px 2px 1px #b475ebff;
  margin: 0 auto;
  margin-top: 100px;
  height: 500px;
  width: 1000px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InfoText = styled.div`
  margin: 50px 0px;
  font-size: 18px;
`

const LogoWrapper = styled.div`
    margin: 0 auto;
    &:first-of-type {
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
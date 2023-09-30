import { Button, Table, Tooltip } from "antd"
import { BottomWrapper, CategoryBlock, CategoryList, CategoryWrapper, CircleWrapper, Container, FooterWrapper, InfoWrapper, InnerImgWrapper, MainText, MainWrapper, OuterImgWrapper, RankingWrapper, Wrapper } from "./about_presenter" 
import Image from "next/image"
import aboutImg from '../../../../public/psd files/about.png'
import innerImg from '../../../../public/gameplay.png'
import rankingImg from '../../../../public/psd files/ranking.png'
import { useRouter } from "next/router"
import Link from "next/link"

export default function AboutComponent() {
    const router = useRouter();

    const onClickPlay = () => {
        router.push("/game");
    }

    const dataSource = [
        {
            key: '1',
            name: '알코올스왑',
            win: 63,
            point: 320500
        },
        {
            key: '2',
            name: 'Chocks',
            win: 53,
            point: 226100
        },
        {
            key: '2',
            name: '럭키의마법사',
            win: 42,
            point: 186300
        },
        {
            key: '2',
            name: 'Liseh',
            win: 15,
            point: 43800
        },
        ];
        
        const columns = [
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '우승',
            dataIndex: 'win',
            key: 'win',
        },
        {
            title: '총 점수',
            dataIndex: 'point',
            key: 'point',
        },
        ];

    return (
        <Container>
            <Wrapper>
                <Image style={{position: "absolute", zIndex: "-1"}} src={aboutImg} alt="about" />
                <MainText>실시간<span style={{color: "#885d9b"}}> 상식</span> <span style={{color: "#e2e8a6"}}>퀴즈</span>  서비스</MainText>
                <MainWrapper>
                    <InnerImgWrapper><Image width={500} height={300} src={innerImg} alt="game play image" /></InnerImgWrapper>
                    <InfoWrapper>
                        <h1><span style={{color: "#fff"}}>Socket.io 방식을 통한 실시간 상식 대결!</span></h1>
                        <h2 style={{margin: "20px", color: "#bb84eb"}}>SNS로그인을 통해 지금 당장 플레이하세요</h2>
                        <CircleWrapper>
                            <Tooltip title="Socket.io를 통한 실시간 대결">
                                <Button style={{width: "100px", height: "100px", fontSize: "20px"}} type="primary" shape="circle">
                                    실시간
                                </Button>
                            </Tooltip>
                            <Tooltip title="방을 만들어 친구들과 함께!">
                                <Button style={{width: "100px", height: "100px", fontSize: "20px"}} type="primary" shape="circle">
                                    방 만들기
                                </Button>
                            </Tooltip>
                            <Tooltip title="일반 상식부터 차량, 게임까지!">
                                <Button style={{width: "100px", height: "100px", fontSize: "20px"}} type="primary" shape="circle">
                                    24개 주제
                                </Button>
                            </Tooltip>
                            <Tooltip title="문제를 풀면서 이야기하는 재미!">
                                <Button style={{width: "100px", height: "100px", fontSize: "20px"}} type="primary" shape="circle">
                                    채팅
                                </Button>
                            </Tooltip>
                        </CircleWrapper>
                        <Button onClick={onClickPlay} style={{width: "200px", height: "50px", fontSize: "20px", margin: "40px"}}>
                            플레이하기
                        </Button>
                    </InfoWrapper>
                </MainWrapper>
            </Wrapper>
            <OuterImgWrapper><Image width={500} height={300} src={innerImg} alt="game play image" /></OuterImgWrapper>
            <BottomWrapper>
                <h1 style={{margin: "10px"}}>주요 특징</h1>
                <h3 style={{margin: "40px"}}>수많은 24가지의 주제들</h3>
                <CategoryWrapper>
                <CategoryList>
                        <CategoryBlock>일반 지식</CategoryBlock>
                        <CategoryBlock>도서</CategoryBlock>
                        <CategoryBlock>영화</CategoryBlock>
                        <CategoryBlock>음악</CategoryBlock>
                        <CategoryBlock>뮤지컬 및 극장</CategoryBlock>
                        <CategoryBlock>텔레비전</CategoryBlock>
                        <CategoryBlock>비디오 게임</CategoryBlock>
                        <CategoryBlock>보드게임</CategoryBlock>
                        <CategoryBlock>과학</CategoryBlock>
                        <CategoryBlock>컴퓨터 과학</CategoryBlock>
                        <CategoryBlock>수학</CategoryBlock>
                        <CategoryBlock>신화</CategoryBlock>
                        <CategoryBlock>스포츠</CategoryBlock>
                        <CategoryBlock>지리</CategoryBlock>
                        <CategoryBlock>역사</CategoryBlock>
                        <CategoryBlock>정치</CategoryBlock>
                        <CategoryBlock>예술</CategoryBlock>
                        <CategoryBlock>유명인</CategoryBlock>
                        <CategoryBlock>동물</CategoryBlock>
                        <CategoryBlock>차량</CategoryBlock>
                        <CategoryBlock>코믹스</CategoryBlock>
                        <CategoryBlock>가젯</CategoryBlock>
                        <CategoryBlock>일본 애니&만화</CategoryBlock>
                        <CategoryBlock>카툰&애니</CategoryBlock>
                    </CategoryList>
                    <CategoryList>
                        <CategoryBlock>일반 지식</CategoryBlock>
                        <CategoryBlock>도서</CategoryBlock>
                        <CategoryBlock>영화</CategoryBlock>
                        <CategoryBlock>음악</CategoryBlock>
                        <CategoryBlock>뮤지컬 및 극장</CategoryBlock>
                        <CategoryBlock>텔레비전</CategoryBlock>
                        <CategoryBlock>비디오 게임</CategoryBlock>
                        <CategoryBlock>보드게임</CategoryBlock>
                        <CategoryBlock>과학</CategoryBlock>
                        <CategoryBlock>컴퓨터 과학</CategoryBlock>
                        <CategoryBlock>수학</CategoryBlock>
                        <CategoryBlock>신화</CategoryBlock>
                        <CategoryBlock>스포츠</CategoryBlock>
                        <CategoryBlock>지리</CategoryBlock>
                        <CategoryBlock>역사</CategoryBlock>
                        <CategoryBlock>정치</CategoryBlock>
                        <CategoryBlock>예술</CategoryBlock>
                        <CategoryBlock>유명인</CategoryBlock>
                        <CategoryBlock>동물</CategoryBlock>
                        <CategoryBlock>차량</CategoryBlock>
                        <CategoryBlock>코믹스</CategoryBlock>
                        <CategoryBlock>가젯</CategoryBlock>
                        <CategoryBlock>일본 애니&만화</CategoryBlock>
                        <CategoryBlock>카툰&애니</CategoryBlock>
                    </CategoryList>
                </CategoryWrapper>
                <h3 style={{margin: "40px"}}>상식 대결을 통한 랭킹 시스템(미완)</h3>
                <RankingWrapper>
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                    <Image src={rankingImg} alt="ranking image" />
                </RankingWrapper>
            </BottomWrapper>
            <FooterWrapper>
                <Link style={{textDecoration: "none", color: "#000"}} href={'#'}>업데이트 내역</Link>
                <Link style={{textDecoration: "none", color: "#000"}} href={'#'}>Github</Link>
                <div>이 웹사이트는 상업적 목적이 아닌 개인 포트폴리오용으로 제작되었습니다.</div>
            </FooterWrapper>
        </Container>
    )
}
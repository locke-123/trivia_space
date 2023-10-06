import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import HeaderComponent from '@/components/mainPage/header/header_component'
import RoomComponent from '@/components/mainPage/room/room_component'
import GameComponent from '@/components/mainPage/game/game_component'
import { useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import router from 'next/router'
import { Howl } from 'howler';
import ChatComponent from '@/components/subComponents/chat/chat_component'

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [roomNumber, setRoomNumber] = useState();

  const socketRef = useRef<Socket | null>(null);

  const [soundVolume, setSoundVolume] = useState(0.1);
  const [sound, setSound] = useState({
    roomBGM : new Howl({ src: ['/inspirational-background-music-124020.mp3'], volume: soundVolume, loop: true,}),
    waitingBGM : new Howl({ src: ['/waiting-music-116216.mp3'], volume: soundVolume, loop: true,}),
    startGameBGM : new Howl({ src: ['/big-band-show-146321.mp3'], volume: soundVolume}),
    thinkingTime: new Howl({ src: ['/thinking-time-148496.mp3'], volume: soundVolume}),
    gameStart: new Howl({ src: ['/game-start-6104.mp3'], volume: soundVolume}),
    interface: new Howl({ src: ['/interface-124464.mp3'], volume: soundVolume}),
    gameBGM: new Howl({ src: ['/documentary-piano-ambient-166279.mp3'], volume: soundVolume, loop: true,}),
    bellRing: new Howl({ src: ['/service-bell-ring-14610.mp3'], volume: soundVolume}),
    newsTing: new Howl({ src: ['/news-ting-6832.mp3'], volume: soundVolume}),
  });

  useEffect(() => {
      socketRef.current = io(`${process.env.NEXT_PUBLIC_GAME_SERVER_IP}`, {
        withCredentials: false,
      });

      if (typeof window !== 'undefined') {
        socketRef.current.on("connect", () => {
            console.log("connection server");
        });

        socketRef.current.on("disconnect", () => {
          router.push("/");
          console.log("Disconnected from server");
        });

        socketRef.current.on("refresh room info", (res) => {
          setRoomList(res);
          console.log("room 정보 갱신");
        });

        socketRef.current.on("is room started",(res, number, duplicateAcc, member) => {
          if(duplicateAcc === true) {
            alert("이미 같은 계정으로 게임이 진행중 입니다.")
          } else {
            if(res === true) {
              alert("이미 시작한 방입니다.");
            } else {
              if(member >= 4) {
                alert("인원이 꽉 찼습니다.");
              } else {
                setIsEntered(true);
                setRoomNumber(number);
                socketRef.current!.emit("somebody enter room", number);
              }
            }
          }
        })

        socketRef.current.emit("init");

        return () => {
            socketRef.current!.disconnect();
            console.log('소켓 연결 해제');
            Howler.unload();
        };
      }
  },[])

  const onChangeVolume = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setSoundVolume(value);
    sound.roomBGM.volume(value);
    sound.startGameBGM.volume(value);
    sound.thinkingTime.volume(value);
    sound.waitingBGM.volume(value);
    sound.gameBGM.volume(value);
    sound.interface.volume(value);
    sound.gameStart.volume(value);
  }

  return (
    <>
      <Head>
        <title>Trivia Space</title>
        <meta name="description" content="실시간 상식 퀴즈 대결 웹사이트 Trivia Space" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HeaderComponent socketRef={socketRef} />
        {isEntered ? <GameComponent roomNumber={roomNumber} socketRef={socketRef} setIsEntered={setIsEntered} sound={sound} soundVolume={soundVolume} onChangeVolume={onChangeVolume} />
         : <RoomComponent socketRef={socketRef} roomList={roomList} setRoomNumber={setRoomNumber} setIsEntered={setIsEntered} sound={sound} soundVolume={soundVolume} onChangeVolume={onChangeVolume} />}
        {socketRef.current?.connected ? <ChatComponent socketRef={socketRef} roomNumber={roomNumber} isEntered={isEntered}/> : ''}
      </main>
    </>
  )
}
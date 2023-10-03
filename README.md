<div align="center">
  <img src="https://github.com/locke-123/trivia_space/assets/113772136/35988e9f-d043-4b88-ab02-6a5dd049919e">
</div>

Socket.io를 통한 실시간 상식 퀴즈 대결 사이트
## 🗨프로젝트 소개
> - 국내, 해외 상식 퀴즈 쇼를 착안해 제작한 실시간 4지선다 퀴즈 대결 사이트
> - Socket.io를 주력으로 해외 trivia open api를 사용해서 데이터를 가져온 다음 deepl api를 사용해 번역을 수행
> -  node.js 서버를 통해 문제와 답안을 화면에 동시에 표시하고 답안을 수집해 검증 후 점수 할당
## 🕐제작 기간
>2023년 9월 25일 ~ 2023년 10월 3일
## 🙍‍♂️참여 인원
>개인 프로젝트
## 🛠기술 및 도구
>##### 🔧언어 & 개발도구
![Static Badge](https://img.shields.io/badge/HTML5-%23E34F26?logo=html5&logoColor=fff)
![Static Badge](https://img.shields.io/badge/CSS3-%231572B6?logo=css3&logoColor=fff)
![Static Badge](https://img.shields.io/badge/javascript-%23F7DF1E?logo=javascript&logoColor=fff)
![Static Badge](https://img.shields.io/badge/React-%230088CC?logo=React&logoColor=fff)
![Static Badge](https://img.shields.io/badge/typescript-%233178C6?logo=typescript&logoColor=fff)
![Static Badge](https://img.shields.io/badge/Next.js-%23000000?logo=nextdotjs&logoColor=fff)
![Static Badge](https://img.shields.io/badge/socket.io-%23010101?logo=socketdotio&logoColor=fff)
![Static Badge](https://img.shields.io/badge/axios-%235A29E4?logo=axios&logoColor=fff)
![Static Badge](https://img.shields.io/badge/antdesign-%230170FE?logo=antdesign&logoColor=fff)
![Static Badge](https://img.shields.io/badge/express-%23000000?logo=express&logoColor=fff)
![Static Badge](https://img.shields.io/badge/Node.js-%23339933?logo=nodedotjs&logoColor=fff)
![Static Badge](https://img.shields.io/badge/Nginx-%23009639?logo=nginx&logoColor=fff)
![Static Badge](https://img.shields.io/badge/Ubuntu-%23E95420?logo=ubuntu&logoColor=fff)
>##### 🖥서비스&IDE
![Static Badge](https://img.shields.io/badge/VisualStudioCode-%23007ACC?logo=visualstudiocode&logoColor=fff)
![Static Badge](https://img.shields.io/badge/github-%23181717?logo=github&logoColor=fff)
![Static Badge](https://img.shields.io/badge/git-%23F05032?logo=git&logoColor=fff)
![Static Badge](https://img.shields.io/badge/Amazon%20AWS-%23232F3E?logo=amazonaws&logoColor=fff)
![Static Badge](https://img.shields.io/badge/AmazonEC2-%23FF9900?logo=amazonec2&logoColor=fff)
![Static Badge](https://img.shields.io/badge/AmazonRoute53-%238C4FFF?logo=amazonroute53&logoColor=fff)
![Static Badge](https://img.shields.io/badge/Vercel-%23000000?logo=vercel&logoColor=fff)
## ⚙핵심 기능
>### 📃메인페이지
![mainpage](https://github.com/locke-123/trivia_space/assets/113772136/81accca0-0823-4077-b519-3f81b5f07dbf)
- 사이트 소개 및 주요 기능을 소개하는 사이트입니다.
- 24개의 주제들을 emotion을 사용해 애니메이션을 적용했습니다.
- 기본적인 디자인은 ant-design의 컴포넌트를 사용했습니다.
>### 🎮게임페이지
#### 방목록
![방목록](https://github.com/locke-123/trivia_space/assets/113772136/c90f4b1a-2dfa-4096-b0ba-537b1f4e5c6f)
- SNS 로그인 인증 후 방 목록을 보여주는 페이지로 이동 -> NEXT.js의 middleware와 next-auth 사용해서 구현했습니다.
- Socket.io를 사용해 해당 게임 컴포넌트 할당시 Express 쪽의 소켓 서버와 연결합니다.
- 방 만들기를 통해 방 생성도 가능합니다.
- 방 인원이 4명 이상이거나 게임이 이미 시작된 경우 입장이 불가능합니다.
- 게임 페이지에서는 howler.js를 이용해 배경음악과 효과음을 삽입했습니다.
- 우측 상단의 볼륨 슬라이더로 게임의 전체적인 음량을 조절할 수 있습니다.
#### 게임 시작
![게임시작](https://github.com/locke-123/trivia_space/assets/113772136/67dc6ab1-b89d-43b6-b053-4512011701aa)
- 방 입장시 sokect.io의 room 기능을 이용해 namespace 구분했습니다.
- 인원이 1명일시 대기중을 표시하다 인원이 2명 이상이 될 경우 게임시작을 활성화합니다.
- 게임이 시작되면 socket.io를 사용해 해당 방 내부 인원들에게 event broadcasting을 통해 실시간으로 진행 텍스트를 출력합니다.
#### 문제 고르기
![퀴즈 고르기](https://github.com/locke-123/trivia_space/assets/113772136/083bc28e-c2d5-43a1-b864-f58ce65c1300)
- 주제는 랜덤으로 정해지고 난이도 별로 다른 점수를 가진 문제 30개를 표시합니다.
- 방에 있는 참가자 누구든 문제를 클릭할시 버튼 비활성화 및 axios를 이용한 data fetching을 시작합니다.
- 30문제 모두 풀 경우 게임 점수가 가장 높은 사람이 승리 후 게임 종료합니다.
#### 문제 풀기
![문제 풀기](https://github.com/locke-123/trivia_space/assets/113772136/be0c200c-0d1e-40b5-8a9b-dfef7ddf5a95)
- 이전 과정에서 받아온 data를 한번더 deepl을 통해 번역 과정을 거친 후 문제를 출력합니다.
- 문제 출력 후 정답과 오답을 섞은 data를 버튼에 할당한 후 서버단에서 10초 카운트 다운합니다.
- 버튼 클릭시 다른 버튼 비활성화 및 소켓 서버로 해당 유저의 답변을 저장합니다.
- 카운트 다운이 끝나면 정답 비교후 알맞는 유저에게 점수를 할당합니다.
- 이후 다시 문제 고르기 파트로 전환하고 반복합니다.
#### 추가 예정 기능
- 게임 페이지와 방 목록 페이지에서 소켓을 사용한 실시간 채팅기능을 구현 진행중입니다.
## 🕹DEMO 링크
https://trivia-space-chi.vercel.app/
## 🎞프로젝트 과정
![image](https://github.com/locke-123/trivia_space/assets/113772136/dd4c7f62-dd85-48fa-83a5-c71054db53b9)
>### IA설계
![image](https://github.com/locke-123/trivia_space/assets/113772136/20a4197c-5f2a-46a9-a921-b4b54c212dfb)
>### 시스템 구조
![image](https://github.com/locke-123/trivia_space/assets/113772136/995f1a82-6d83-42f5-aa85-2083183b67fc)
- 해당 시스템 구조의 경우 vercel에서 https 프로토콜을 사용하는데 해당 프로젝트의 node.js 서버는 http를 사용해 프로토콜 오류가 발생했습니다.
- 따라서 도메인 구입, AWS 등록 후 인증서를 발급받아 Route53과 로드밸런서를 이용해 https를 http로 전환했습니다.
- 그리고 해당 http 요청을 nginx에서 리버스프록시를 사용해 node.js의 소켓서버로 넘겨주는 방식을 사용했습니다.
## ✔느낀점
- Socket.io를 사용하면서 실시간 통신과 네트워크 관련 프로세스 관련 역량이 조금 더 강화되었음.
- 비록 데이터 베이스는 아니지만 backend 부분인 node.js 와 express 를 다루면서 다음에는 더 학습을 진행한 뒤 체계적으로 코드를 작성해야하는 필요성을 느낌.
- AWS를 처음 사용해보면서 여러가지 서비스를 파악했고, 특히 https 관련 문제를 해결하는데 있어서 매우 힘들었지만 배운점도 많음.
- 프론드엔드 단은 https이고, 백엔드 단은 http인 문제를 해결하려 도메인 등록, dns, ssl 같은 작업을 진행하면서 개념을 파악함.
- 이후 socket 부분에서 문제가 발생했고, socket server와 node.js server간의 포트 문제로 추정 후 nginx의 reserve proxy를 사용해 해결함.
- 결과적으로 앞으로 프론트엔드와 백엔드 사이의 프로세스에 대해서 더 이해할 수 있고, 네트워크 관련 문제에 대해서 자신감이 생기는 프로젝트였음.



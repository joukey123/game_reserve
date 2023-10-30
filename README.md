# GAME_RESERVE_SITE (World of Warcraft M)

HTML / CSS / 바닐라JS로 제작된 게임 사전예약 사이트입니다.  
가로 1440px / 500px 기준으로 반응형으로 제작하였습니다.  
사전예약 시 input 문자입력 감지, 인증번호 타이머를 구성하였습니다.  
인증번호 완료, 필수 동의사항 체크 검증 과정을 거쳐 모두 완료 되었을 때만 예약이 완료됩니다.  
조건에 맞지 않으면 에러 메세지가 출력됩니다.  

#### 📚 제작 방향
0. 전체사이즈 피씨-1440px, 모바일-500px
1. 모바일 메뉴 클릭시 좌->우 슬라이드 형태
2. 사이즈 rem으로 적용
3. 인증 시스템
4. 이미지 modal
   
#### 🎨 디자인 시안(피그마) 
<https://www.figma.com/file/LzqC8nfxDmbvZQEjAKeKj7/Untitled?type=design&node-id=0-1&mode=design>

---

#### ⭐️ 주요특징

1️⃣ modal
* 이미지 호버 효과
* 이미지 클릭 시 modal. 닫기버튼 클릭 해제

<img width="80%" src="https://server.movingtail.com/minwoo/projectImg/readme/modal.jpeg" />
<img width="80%" src="https://server.movingtail.com/minwoo/projectImg/readme/modal2.jpeg" />


2️⃣ 인증 시스템
* input 창은 번호만 입력가능.  문자입력시 에러메세지 출력
* 인증번호 전송시 인증시간(타이머) 작동.  타이머완료시 시간초과 메세지 출력
* 모두 동의 클릭시 아래 사항 모두 체크, 하나라도 해제시 모두 동의 체크 해제, 필수 사항 모두 체크시 모두 동의 체크
* 예약하기 클릭시 체크 사항
    * 인증이 완료되었는가? 미인증시 에러메세지 출력
    * 필수사항에 동의가 완료 되었는가? 미동의시 에러메세지 출력
* 인증 완료 && 필수사항 동의 완료 -> 예약 성공 팝업 출력

<img width="80%" src="https://server.movingtail.com/minwoo/projectImg/readme/token.gif" />






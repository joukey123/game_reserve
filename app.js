const nav = document.getElementById("nav");
const menu = document.querySelector(".nav__menu");
const subMenus = document.querySelectorAll(".subMenu");
const navBg = document.querySelector(".nav_bg");
const header = document.querySelector("header");
const reserveBtn = document.querySelector(".reserveBtn");
const box = document.getElementById("box");
const lis = menu.querySelectorAll("li");
const closeBtn = document.querySelector(".closeBtn");
const allAccess = document.querySelector("#all");
const infoAccess = document.querySelector("#info");
const adAccess = document.querySelector("#ad");
const phoneSendBtn = document.querySelector(
  ".access__phone input[type='button']"
);
const timerSpan = document.createElement("span");
const accessNumber = document.querySelector(".access__number");
const cards = document.querySelectorAll(".dungeon__bg");
const submit = document.querySelector("input[value='예약하기']");
const asd = () => {
  if (adAccess.checked && infoAccess.checked && allAccess.checked) {
    console.log("확인");
  } else {
    console.log("동의해주세요");
  }
};
submit.addEventListener("click", asd);
const mql = window.matchMedia("(max-width: 950px)");

let isClicked = true; //allAgree
let isInfoClicked = true; //infoAgree
let isAdClicked = true; //adAgree

const handleHideMenu = () => {
  for (const subMenu of subMenus) {
    subMenu.style.visibility = "hiddne";
    subMenu.style.opacity = 0;
  }
  navBg.style.visibility = "hidden";
  navBg.style.opacity = 0;
};

const handleShowMenu = () => {
  for (const subMenu of subMenus) {
    subMenu.style.visibility = "visible";
    subMenu.style.opacity = 1;
  }
  navBg.style.visibility = "visible";
  navBg.style.opacity = 1;
};

function handleHideMobileMenu(ul) {
  ul.id = "";
  ul.style.visibility = "hidden";
  ul.style.animation = "slideup .1s linear forwards";
}

function handleShowMobileMenu() {
  const ul = this.querySelector("ul");
  if (ul.id) {
    handleHideMobileMenu(ul);
  } else {
    ul.style.visibility = "visible";
    ul.style.animation = "slidedown .3s linear forwards";
    ul.id = "clicked";
  }
}

const handleSlideMenu = () => {
  menu.style.animation = "rightSlide .3s linear forwards";
  box.classList.remove("hidden");
  for (let li of lis) {
    li.addEventListener("click", handleShowMobileMenu);
  }
};
const handleCloseSlideMenu = () => {
  menu.style.animation = "leftSlide .3s linear forwards";
  box.classList.add("hidden");
};

const hadleMobileScreen = () => {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  const i = document.createElement("i");
  const logo = document.querySelector(".logo > a");

  if (mql.matches) {
    ul.className = "menuBtn";
    i.className = "fa-solid fa-bars";
    li.appendChild(i);
    ul.appendChild(li);
    nav.appendChild(ul);
    logo.style.background =
      "url('http://server.movingtail.com/minwoo/projectImg/mlogo.png') 50% 50% / 3rem no-repeat";
    closeBtn.classList.remove("hidden");
    menu.style.animation = "";
    box.classList.add("hidden");
    menu.querySelector(".reserveBtn").classList.remove("hidden");
    i.addEventListener("click", handleSlideMenu);
    menu.removeEventListener("mouseover", handleShowMenu);
    header.removeEventListener("mouseleave", handleHideMenu);
  } else {
    const menuUl = document.querySelector(".menuBtn");
    if (menuUl) {
      menuUl.remove();
      logo.style.background = "";
    }
    menu.style.animation = "";
    menu.addEventListener("mouseover", handleShowMenu);
    header.addEventListener("mouseleave", handleHideMenu);
    closeBtn.classList.add("hidden");
    menu.querySelector(".reserveBtn").classList.add("hidden");
  }
};

const handleClickAccess = () => {
  if (isClicked) {
    infoAccess.checked = true;
    adAccess.checked = true;
    isClicked = false;
    isInfoClicked = false;
    isAdClicked = false;
  } else {
    allAccess.checked = false;
    infoAccess.checked = false;
    adAccess.checked = false;
    isClicked = true;
    isInfoClicked = true;
    isAdClicked = true;
  }
};
const handleClickInfoAccess = () => {
  if (isInfoClicked) {
    infoAccess.checked = true;
    isInfoClicked = false;
  } else {
    infoAccess.checked = false;
    isInfoClicked = true;
  }
  handleCheckAccess();
};

const handleClickadAccess = () => {
  if (isAdClicked) {
    adAccess.checked = true;
    isAdClicked = false;
  } else {
    adAccess.checked = false;
    isAdClicked = true;
  }
  handleCheckAccess();
};

const handleCheckAccess = () => {
  if (infoAccess.checked && adAccess.checked) {
    allAccess.checked = true;
    isClicked = false;
  } else {
    allAccess.checked = false;
    isClicked = true;
  }
};

let time = 60;
let min = 0;
let sec = 0;
let intervalId;
const accessTokenConfirm = document.querySelector(
  ".access__number input[type='button']"
);
const reserveForm = document.querySelector(".reserveform");

const deleteErrorMessage = () => {
  reserveForm.querySelector(".message").remove();
  accessTokenConfirm.addEventListener("click", handleAccessToken);
};

const handleAccessToken = () => {
  const message = document.createElement("span");
  reserveForm.appendChild(message);
  message.className = "message";

  const inputToken = document.querySelector("input[name=access_token]");
  if (inputToken.value) {
    clearInterval(intervalId);
    timerSpan.innerText = "인증완료";
    time = 60;
    message.classList.add("ok");
    message.innerText = "인증을 완료했습니다.";
    accessTokenConfirm.removeEventListener("click", handleAccessToken);
    setTimeout(deleteErrorMessage, 2000);
    phoneSendBtn.addEventListener("click", handleSendPhone);
  } else {
    message.innerText = "인증번호를 입력해주세요.";
    accessTokenConfirm.removeEventListener("click", handleAccessToken);
    setTimeout(deleteErrorMessage, 2000);
  }
};
const handleSendPhone = () => {
  accessTokenConfirm.style.backgroundColor = "var(--yellow)";
  accessTokenConfirm.addEventListener("click", handleAccessToken);
  handleTimer();
};

//3분 타이머 함수
const timer = () => {
  min = String(Math.floor(time / 60)).padStart(2, 0);
  sec = String(time % 60).padStart(2, 0);

  timerSpan.innerText = `${min} : ${sec}`;
  timerSpan.className = "timer";
  accessNumber.appendChild(timerSpan);
  phoneSendBtn.removeEventListener("click", handleSendPhone);
  if (time < 0) {
    clearInterval(intervalId);
    timerSpan.innerText = "시간초과";
    time = 61;
    phoneSendBtn.addEventListener("click", handleSendPhone);
  }
  time--;
};
const handleTimer = () => {
  timer();
  intervalId = setInterval(timer, 1000);
};

const handleCloseModal = (event) => {
  const modal = event.target.parentElement.parentElement;
  modal.remove();
};
function handleCard() {
  const bigImgBox = document.createElement("div");
  const imgFrame = document.createElement("div");
  const bigImg = document.createElement("img");
  bigImgBox.className = "modal";
  const modalCloseBtn = document.createElement("button");
  modalCloseBtn.innerText = "X";
  modalCloseBtn.className = "modal__closeBtn";
  modalCloseBtn.addEventListener("click", handleCloseModal);
  const backgroundinfo = getComputedStyle(this).getPropertyValue("background");
  const regex = /"(.*)"/;
  const url = backgroundinfo.split(regex)[1];

  bigImg.src = `${url}`;
  bigImgBox.appendChild(imgFrame);
  imgFrame.appendChild(modalCloseBtn);
  imgFrame.appendChild(bigImg);
  document.body.appendChild(bigImgBox);
}

hadleMobileScreen();

const contents = document.querySelectorAll(".dungeon__contents-img");

for (let card of cards) {
  card.addEventListener("click", handleCard);
}
phoneSendBtn.addEventListener("click", handleSendPhone);
adAccess.addEventListener("click", handleClickadAccess);
infoAccess.addEventListener("click", handleClickInfoAccess);
allAccess.addEventListener("click", handleClickAccess);
reserveBtn.addEventListener("mouseover", handleHideMenu);
mql.addEventListener("change", hadleMobileScreen);
closeBtn.addEventListener("click", handleCloseSlideMenu);

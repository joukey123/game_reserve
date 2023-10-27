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
const inputNumber = document.querySelector("input[name=phoneNumber]");

const inputToken = document.querySelector("input[name=access_token]");
const contents = document.querySelectorAll(".dungeon__contents-img");
const accessTokenConfirm = document.querySelector(
  ".access__number input[type='button']"
);
const reserveForm = document.querySelector(".reserveform");

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

const deleteErrorMessage = () => {
  reserveForm.querySelector(".message").remove();
  submit.addEventListener("click", handleReserveBtn);
  if (seuccessToken) {
    accessTokenConfirm.removeEventListener("click", handleAccessToken);
  } else {
    accessTokenConfirm.addEventListener("click", handleAccessToken);
  }
};

let seuccessToken = true;
const createMessage = () => {
  const messageBox = document.createElement("span");
  reserveForm.appendChild(messageBox);
  messageBox.className = "message";
  return (message = document.querySelector(".message"));
};
const handleAccessToken = () => {
  createMessage();
  if (inputToken.value) {
    clearInterval(intervalId);
    time = 60;
    timerSpan.innerText = "";
    message.classList.add("ok");
    message.innerText = "인증을 완료했습니다.";
    accessTokenConfirm.style.backgroundColor = "teal";
    accessTokenConfirm.style.color = "var(--font-color)";
    accessTokenConfirm.value = "인증완료";
    setTimeout(deleteErrorMessage, 1000);
    accessTokenConfirm.removeEventListener("click", handleAccessToken);
    phoneSendBtn.addEventListener("click", handleSendPhone);
    seuccessToken = true;
    inputToken.value = "";
  } else {
    timerSpan.innerText = "";
    message.innerText = "인증번호를 입력해주세요.";
    accessTokenConfirm.removeEventListener("click", handleAccessToken);
    setTimeout(deleteErrorMessage, 1000);
    seuccessToken = false;
  }
};
const handleSendPhone = () => {
  if (inputNumber.value) {
    accessTokenConfirm.style.backgroundColor = "var(--yellow)";
    accessTokenConfirm.addEventListener("click", handleAccessToken);
    accessTokenConfirm.value = "인증번호 확인";
    inputToken.value = "";
    accessTokenConfirm.style.color = "black";
    seuccessToken = false;
    if (intervalId) {
      clearInterval(intervalId);
      time = 60;
      handleTimer();
    } else {
      handleTimer();
    }
  } else {
    timerSpan.innerText = "";
    createMessage();
    message.innerText = "전화번호를 입력해주세요.";
    setTimeout(deleteErrorMessage, 1000);
    clearInterval(intervalId);
    time = 60;
  }
};

//3분 타이머 함수
const timer = () => {
  min = String(Math.floor(time / 60)).padStart(2, 0);
  sec = String(time % 60).padStart(2, 0);
  timerSpan.innerText = `${min} : ${sec}`;
  timerSpan.className = "timer";
  accessNumber.appendChild(timerSpan);
  // phoneSendBtn.removeEventListener("click", handleSendPhone);
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

const handleReserveBtn = () => {
  if (
    adAccess.checked &&
    infoAccess.checked &&
    allAccess.checked &&
    accessTokenConfirm.value === "인증완료"
  ) {
    const popUpBox = document.createElement("div");

    const reserveSuccessBox = document.createElement("div");
    const succesBoxImg = document.createElement("img");
    const textBox = document.createElement("div");
    const downloadBox = document.createElement("div");
    const aosImg = document.createElement("div");
    const iosImg = document.createElement("div");
    const btn = document.createElement("input");
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    popUpBox.className = "popup__box";
    reserveSuccessBox.className = "success__box";
    // succesBoxImg.src = "/src/img/su1.png";
    btn.type = "button";
    btn.innerText = "완료";
    h1.innerText = "아제로스에서 다양한 모험을 경험하세요.";
    p.innerText = "예약해주셔서 감사합니다!";

    document.body.appendChild(popUpBox);
    popUpBox.appendChild(reserveSuccessBox);
    reserveSuccessBox.appendChild(succesBoxImg);
    reserveSuccessBox.appendChild(textBox);
    textBox.appendChild(h1);
    textBox.appendChild(p);
    reserveSuccessBox.appendChild(downloadBox);
    downloadBox.appendChild(aosImg);
    downloadBox.appendChild(iosImg);

    reserveSuccessBox.appendChild(btn);
  } else if (accessTokenConfirm.value === "인증번호 확인") {
    createMessage();
    message.innerText = "휴대전화 인증을 진행해주세요.";
    submit.removeEventListener("click", handleReserveBtn);
    setTimeout(deleteErrorMessage, 1000);
    seuccessToken = false;
  } else {
    createMessage();
    message.innerText = "필수사항에 동의해주세요.";
    submit.removeEventListener("click", handleReserveBtn);
    setTimeout(deleteErrorMessage, 1000);
    seuccessToken = false;
  }
};

const checkedNumber = (event) => {
  const text = event.target.value;
  const regex = /[^0-9]/g;

  if (regex.test(text)) {
    event.target.value = text.replace(regex, "");
    createMessage();
    message.innerText = "숫자만 입력해주세요.";
    setTimeout(deleteErrorMessage, 1000);
  }
};
hadleMobileScreen();

for (let card of cards) {
  card.addEventListener("click", handleCard);
}

inputNumber.addEventListener("input", checkedNumber);
inputToken.addEventListener("input", checkedNumber);
submit.addEventListener("click", handleReserveBtn);
phoneSendBtn.addEventListener("click", handleSendPhone);
adAccess.addEventListener("click", handleClickadAccess);
infoAccess.addEventListener("click", handleClickInfoAccess);
allAccess.addEventListener("click", handleClickAccess);
reserveBtn.addEventListener("mouseover", handleHideMenu);
mql.addEventListener("change", hadleMobileScreen);
closeBtn.addEventListener("click", handleCloseSlideMenu);

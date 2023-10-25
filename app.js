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
const handleSendPhone = () => {
  const accessTokenConfirm = document.querySelector(
    ".access__number input[type='button']"
  );
  accessTokenConfirm.style.backgroundColor = "var(--yellow)";
};

hadleMobileScreen();
phoneSendBtn.addEventListener("click", handleSendPhone);
adAccess.addEventListener("click", handleClickadAccess);
infoAccess.addEventListener("click", handleClickInfoAccess);
allAccess.addEventListener("click", handleClickAccess);
reserveBtn.addEventListener("mouseover", handleHideMenu);
mql.addEventListener("change", hadleMobileScreen);
closeBtn.addEventListener("click", handleCloseSlideMenu);

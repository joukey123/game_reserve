const nav = document.getElementById("nav");
const menu = document.querySelector(".nav__menu");
const subMenus = document.querySelectorAll(".subMenu");
const navBg = document.querySelector(".nav_bg");
const header = document.querySelector("header");
const reserveBtn = document.querySelector(".reserveBtn");
const box = document.getElementById("box");
const lis = menu.querySelectorAll("li");
const closeBtn = document.querySelector(".closeBtn");
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

const mql = window.matchMedia("(max-width: 950px)");

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

hadleMobileScreen();

reserveBtn.addEventListener("mouseover", handleHideMenu);
mql.addEventListener("change", hadleMobileScreen);
closeBtn.addEventListener("click", handleCloseSlideMenu);

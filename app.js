const menu = document.querySelector("#nav > ul");
const subMenus = document.querySelectorAll(".subMenu");
const navBg = document.querySelector(".nav_bg");
const header = document.querySelector("header");
const reserveBtn = document.querySelector(".reserveBtn");

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

menu.addEventListener("mouseover", handleShowMenu);
header.addEventListener("mouseleave", handleHideMenu);
reserveBtn.addEventListener("mouseover", handleHideMenu);

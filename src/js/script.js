const menuBtn = $(".header__menu-button");
const darkOverlay = $(".dark-overlay");
const mobMenu = $(".mob-menu");

$(document).on("click", ".header__menu-button", handleMenu);
$(document).on("click", ".mob-menu__is-submenu", handleToggleMenu);

function handleMenu(e) {
  e.preventDefault();
  darkOverlay.toggleClass("visible");
  mobMenu.toggleClass("visible");
}
function handleToggleMenu(e) {
  e.preventDefault();
  const $this = $(this);
  $this.parent(".mob-menu__has-submenu").toggleClass("opened");
  $this.next("ul").slideToggle(300, function () {
    $(this)
      .find(".mob-menu__has-submenu")
      .removeClass("opened")
      .children("ul")
      .hide();
    $this
      .parent(".mob-menu__has-submenu")
      .toggleClass("opened")
      .siblings("li")
      .removeClass("opened")
      .find("ul")
      .hide();
  });
}

function resetMobileMenu() {
  darkOverlay.removeClass("visible");
  mobMenu.removeClass("visible");
  $(".mob-menu__box .mob-menu__has-submenu")
    .removeClass("opened")
    .find("ul")
    .hide();
}

// ================================================================================================================

const menu = document.querySelector(".header__fixed-box");
let k;
function fixMenu() {
  menu.getBoundingClientRect().top + k < window.pageYOffset &&
    menu.classList.add("header__fixed");
  menu.getBoundingClientRect().top + k > window.pageYOffset &&
    menu.classList.remove("header__fixed");
}
function handleScroll() {
  fixMenu();
}

window.addEventListener("scroll", handleScroll);

function initMobile() {
  des = false;
  k = 80;
  console.log("is-mobile");
}

function initTablet() {
  des = true;
  k = 100;
  console.log("is-tablet");
}

function initDesktop() {
  des = true;
  animateHeader();
  k = 140;
  console.log("is-desktop");
}

ssm.addStates([
  {
    id: "mobile",
    query: "(max-width: 640px)",
    onEnter: function () {
      initMobile();
    },
  },
  {
    id: "tablet",
    query: "(min-width: 641px) and (max-width: 992px)",
    onEnter: function () {
      initTablet();
    },
  },
  {
    id: "desktop",
    query: "(min-width: 993px)",
    onEnter: function () {
      initDesktop();
    },
  },
]);

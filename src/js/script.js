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

function initMobile() {
  console.log("is-mobile");
}

function initTablet() {
  console.log("is-tablet");
}

function initDesktop() {
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

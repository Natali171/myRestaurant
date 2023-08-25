const menuBtn = $(".header__menu-button");
const darkOverlay = $(".dark-overlay");
const mobMenu = $(".mob-menu");

$(document).on("click", ".header__menu-button", handleMenu);
$(document).on("click", ".mob-menu__is-submenu", handleToggleMenu);
$(document).on("click", ".mob-menu__button", handleResetMobileMenu);

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

function handleResetMobileMenu(e) {
  e.preventDefault();
  resetMobMenu();
}

function resetMobMenu() {
  darkOverlay.removeClass("visible");
  mobMenu.removeClass("visible");
  $(".mob-menu__box .mob-menu__has-submenu")
    .removeClass("opened")
    .find("ul")
    .hide();
}

$(document).on("click", ".video__link", handleVideoOverlay);
$(document).on("click", ".video__overlay", handleVideoOverlay);

function handleVideoOverlay(e) {
  e.preventDefault();
  const videoOverlay = $(".video__overlay");
  videoOverlay.toggleClass("visible");
}

document.addEventListener("click", handleGoTo);

function handleGoTo(e) {
  const { target } = e;
  if (
    !target.classList.contains("favs__message-link") &&
    !target.classList.contains("favs__link") &&
    !target.classList.contains("find-table") &&
    !target.classList.contains("main-menu__link_chefs") &&
    !target.classList.contains("main-menu__link_home")
  ) {
    return;
  }
  resetMobMenu();
  closeFavourites();
}

function initMobile() {
  k = 80;
  console.log("is-mobile");
}

function initTablet() {
  k = 100;
  console.log("is-tablet");
}

function initDesktop() {
  k = 140;
  console.log("is-desktop");
  resetMobMenu();
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

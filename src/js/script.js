// ================================================================================================================
const tabs = document.querySelectorAll(".menu-cats__link");

document.addEventListener("click", handleTabs);

function handleTabs(e) {
  const { target } = e;
  if (![...tabs].includes(target)) {
    return;
  }
  handleTabContent(target);
  const activeLink = document.querySelector(".menu-cats__link_active");
  activeLink.classList.remove("menu-cats__link_active");
  target.classList.add("menu-cats__link_active");
}

function handleTabContent(target) {
  const visibleContEL = document.querySelector(`.content-visible`);
  visibleContEL.style.animation = "hide 1.2s linear";
  const contentEl = document.querySelector(`.dishes__${target.id}`);
  setTimeout(() => {
    visibleContEL.classList.remove("content-visible");
    contentEl.classList.add("content-visible");
    contentEl.style.animation = "display 1s linear";
  }, 500);
}
// ================================================================================================================

const menuBtn = $(".header__menu-button");
const darkOverlay = $(".dark-overlay");
const mobMenu = $(".mob-menu");

$(document).on("click", ".header__menu-button", handleMenu);
$(document).on("click", ".mob-menu__is-submenu", handleToggleMenu);
$(document).on("click", ".mob-menu__button", resetMobileMenu);

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

function resetMobileMenu(e) {
  e.preventDefault();
  darkOverlay.removeClass("visible");
  mobMenu.removeClass("visible");
  $(".mob-menu__box .mob-menu__has-submenu")
    .removeClass("opened")
    .find("ul")
    .hide();
}

// ================================================================================================================

const menu = document.querySelector(".header__fixed-box");
const menuSections = document.querySelector(".menu-sections__box");
const strengthBox = document.querySelector(".strength-cats__box");
const chefsBox = document.querySelector(".chefs__items-box");

let k;
function fixMenu() {
  menu.getBoundingClientRect().top + k < window.pageYOffset &&
    menu.classList.add("header__fixed");
  menu.getBoundingClientRect().top + k > window.pageYOffset &&
    menu.classList.remove("header__fixed");
}
function handleScroll() {
  menuSections.getBoundingClientRect().top <= 600 &&
    animateItems("menu-sections__item");

  strengthBox.getBoundingClientRect().top <= 600 &&
    animateItems("strength-cats__item");

  chefsBox.getBoundingClientRect().top <= 600 && animateItems("chefs__item");
  fixMenu();
  const counterBox = document.querySelector(".counter__box");
  if (counterBox.getBoundingClientRect().top < 600) {
    count("orders", 150);
    count("dishes", 82);
    count("chefs", 35);
    count("awards", 10);
  }
}

$(document).on("scroll", handleScroll);
// ================================================================================================================

function count(el, max) {
  const step = 20000 / max;
  const item = document.querySelector(`.counter__${el}`);
  const increaseItem = setInterval(() => {
    if (parseFloat(item.innerHTML) < max) {
      let val = parseFloat(item.innerHTML);
      val++;
      item.innerHTML = val + "+";
      val >= max && clearInterval(increaseItem);
    }
  }, step);
  return;
}

// ================================================================================================================
function animateItems(cl) {
  const items = document.querySelectorAll(`.${cl}`);
  items.forEach((el) => {
    el.style.animation = "moveTop 2s linear";
    el.style.opacity = 1;
  });
}

// ================================================================================================================

const videoOverlay = $(".video__play");

$(document).on("click", ".video__link", handleVideoOverlay);
$(document).on("click", ".video__play", handleVideoOverlay);

function handleVideoOverlay(e) {
  e.preventDefault();
  videoOverlay.toggleClass("visible");
}

// ================================================================================================================
const key = "53e3f78b152c4c658d3733a68a64566a";
// const key = "db254b5cd61744d39a2deebd9c361444";
const cuisine = document.querySelector("#cuisine");
const requestOb = {};
document.addEventListener("change", handleSelect);
document.addEventListener("click", createRequest);

function handleSelect(e) {
  const { target } = e;
  if (
    target.id === "cuisine" ||
    target.id === "excludeCuisine" ||
    target.id === "diet" ||
    target.id === "type"
  ) {
    requestOb[target.id] = target.value;
  }
}
function createRequest(e) {
  const { target } = e;
  e.preventDefault();
  if (target.id !== "recomendationBtn") {
    return;
  }
  const maxReadyTime = document.querySelector("#maxReadyTime");
  if (isFinite(parseFloat(maxReadyTime.value.trim()))) {
    requestOb[maxReadyTime.id] = parseFloat(maxReadyTime.value.trim());
  }

  const request = Object.entries(requestOb).reduce(
    (acc, item) => (acc += `&${item[0]}=${item[1]}`),
    ""
  );
  maxReadyTime.value = "";
  // getRecomendations(request);
}

// function getsource(id) {
//   $.ajax({
//     url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`,
//     success: function (res) {
//       document.getElementById("sourceLink").innerHTML = res.sourceUrl;
//       document.getElementById("sourceLink").href = res.sourceUrl;
//     },
//   });
// }
function getRecomendations(request) {
  console.log(request);
  $.ajax({
    url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&number=4${request}`,
    success: function (res) {
      const namesEl = document.querySelectorAll(".dishes-offered__name");
      const imgs = document.querySelectorAll(".dishes-offered__img");
      hideImg();
      if (res.results.length === 0) {
        hideEl("dishes-offered__wraper");
        displayEl("dishes-offered__message");
        delete requestOb.maxReadyTime;
        return;
      }
      namesEl.forEach((el, i) => (el.textContent = ""));
      imgs.forEach((img, i) => img.setAttribute("src", ""));
      namesEl.forEach(
        (el, i) =>
          i < res.results.length && (el.textContent = res.results[i].title)
      );
      imgs.forEach(
        (img, i) =>
          i < res.results.length &&
          img.setAttribute("src", res.results[i].image)
      );
      hideEl("dishes-offered__message");
      displayEl("dishes-offered__wraper");
      delete requestOb.maxReadyTime;
    },
  });
}

function hideEl(cl) {
  const el = document.querySelector(`.${cl}`);
  el.style.animation = "hide 1s linear";
  setTimeout(() => (el.style.display = "none"), 400);
}

$(document).on("click", ".menu-sections__data", () =>
  hideEl("menu-sections__data")
);
function displayEl(cl) {
  const el = document.querySelector(`.${cl}`);
  setTimeout(() => {
    el.style.display = "block";
    el.style.animation = "display 1s linear";
  }, 1200);
}

function hideImg() {
  const img = document.querySelector(".dishes-offered__main-img-box");
  img.classList.remove("dishes-offered__main-img-box_visible");
}

// ================================================================================================================
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

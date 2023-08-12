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
let k;
function fixMenu() {
  menu.getBoundingClientRect().top + k < window.pageYOffset &&
    menu.classList.add("header__fixed");
  menu.getBoundingClientRect().top + k > window.pageYOffset &&
    menu.classList.remove("header__fixed");
}
function handleScroll() {
  // menuSections.getBoundingClientRect().top <= 600 && animateMenuSections();
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
function animateMenuSections() {
  const items = document.querySelectorAll(".menu-sections__item");
  items.forEach((el) => {
    el.style.opacity = 0;
    el.style.top = 200 + "px";
    const moveText = setInterval(() => {
      el.style.top = `${parseFloat(el.style.top) - 0.5}px`;
      parseFloat(el.style.top) < 50 && clearInterval(moveText);
    }, 1);

    const changeTextOp = setInterval(() => {
      let val = parseFloat(el.style.opacity);
      if (val < 1) {
        val += 0.01;
        el.style.opacity = val;
        return;
      }
      clearInterval(changeTextOp);
    }, 1);
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
// const key = "53e3f78b152c4c658d3733a68a64566a";
const key = "db254b5cd61744d39a2deebd9c361444"; //
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
  $.ajax({
    url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&number=4${request}`,
    success: function (res) {
      const namesEl = document.querySelectorAll(".dishes-offered__name");
      const imgs = document.querySelectorAll(".dishes-offered__img");

      namesEl.forEach((el, i) => (el.textContent = res.results[i].title));
      imgs.forEach((img, i) => img.setAttribute("src", res.results[i].image));

      console.log(res);
    },
  });
}

// https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2

// $(document).on("click", "#testBtn", () =>
//   getrecepe(document.getElementById("testInput"))
// );

// console.log(getsource(id));
// getrecepe("italian");

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

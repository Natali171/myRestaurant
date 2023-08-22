const menu = document.querySelector(".header__fixed-box");
const menuSections = document.querySelector(".menu-sections__box");
const strengthBox = document.querySelector(".strength-cats__box");
const chefsBox = document.querySelector(".chefs__items-box");

let k;

$(document).on("scroll", handleScroll);

function fixMenu() {
  menu.getBoundingClientRect().top + k < window.pageYOffset &&
    menu.classList.add("header__fixed");
  menu.getBoundingClientRect().top + k > window.pageYOffset &&
    menu.classList.remove("header__fixed");
}
function handleScroll() {
  menuSections.getBoundingClientRect().top <= 600 &&
    animateItems("menu-sections__item");
  menuSections.getBoundingClientRect().top <= -600 &&
    animateItems("dishes__item", 250, 0.4);
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

function count(el, max) {
  const step = 15000 / max;
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

function animateItems(cl, step = 400, time = ".8") {
  const items = document.querySelectorAll(`.${cl}`);
  items.forEach((el, i) => {
    setTimeout(() => {
      el.style.animation = `moveTop ${time}s linear`;
      el.style.opacity = 1;
    }, i * step);
  });
}

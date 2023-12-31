const favsBlock = document.querySelector(".favs");
let favs = [];

document.addEventListener("click", handleFavouritesClick);
document.addEventListener("click", handleHeartClickFavs);
document.addEventListener("click", handleXmarkClick);

function handleFavouritesClick(e) {
  const { target } = e;
  if (
    !target.classList.contains("main-menu__link_fav") &&
    !target.classList.contains("mob-menu__link_fav") &&
    !target.classList.contains("main-menu__heart")
  ) {
    return;
  }
  resetMobMenu();
  if (favsBlock.classList.contains("visible")) {
    closeFavourites();
    return;
  }
  getFavourites();
  displayFavourites();
}

function displayFavourites() {
  document.querySelector(".wrapper").style.display = "none";
  favsBlock.classList.add("visible");
  ["chosen-dish", "dishes-offered__wraper", "dishes-offered__message"].forEach(
    (cl) => hideEl(cl)
  );
  displayEl("dishes-offered__main-img-box");
}

function getFavourites() {
  let keys = Object.keys(localStorage);
  favs = [];
  if (localStorage.length === 0) {
    displayEl("favs__message");
    hideEl("favs__wraper");
    return;
  }
  keys.forEach((key) => {
    favs.push(JSON.parse(localStorage.getItem(key)));
  });
  renderFavs();
}

function createFavItem() {
  const lis = favs.reduce((acc, ob) => {
    acc += ` <li class="favs__item">
  <div class="favs__img-box">
    <img src="${ob.img}" alt="" class="favs__img" />
  </div>
  <div class="favs__name">${ob.name}</div>
  <div class="favs__meta">
    <i class="favs__heart ${
      ob.fav ? "favs__heart_liked" : "".trim()
    } fa-solid fa-heart"></i>
    <div class="favs__more">
      more info
    </div>
  </div>
  </li> `;
    return acc;
  }, "");
  return lis;
}

function renderFavs() {
  const favsBox = document.querySelector(".favs__box");
  favsBox.innerHTML = "";
  favsBox.innerHTML = createFavItem();
  hideEl("favs__message");
  displayEl("favs__wraper");
}

function handleHeartClickFavs(e) {
  const { target } = e;
  if (!target.classList.contains("favs__heart")) {
    return;
  }
  animateHeart();
  favs;
  const hearts = document.querySelectorAll(".favs__heart");
  indx = [...hearts].findIndex((el) => el == target);

  const favItems = document.querySelectorAll(".favs__item");

  target.classList.contains("favs__heart_liked")
    ? handleDislikeFav(indx)
    : handleLikeFav(indx);
  target.classList.toggle("favs__heart_liked");
}

function handleLikeFav(indx) {
  favs[indx].fav = true;
  const favItems = document.querySelectorAll(".favs__item");
  favItems[indx].style.opacity = 1;
  localStorage.setItem(`Fav${favs[indx].id}`, JSON.stringify(favs[indx]));
}

function handleDislikeFav(indx) {
  favs[indx].fav = false;
  const favItems = document.querySelectorAll(".favs__item");
  favItems[indx].style.opacity = 0.4;
  delete localStorage[`Fav${favs[indx].id}`];
}

function animateHeart() {
  const headerHeart = document.querySelector(".main-menu__heart");
  headerHeart.style.animation = "heart 1.4s linear";
  setTimeout(() => (headerHeart.style.animation = ""), 1000);
}

function closeFavourites() {
  favsBlock.classList.remove("visible");
  hideEl("favs-more");
  document.querySelector(".wrapper").style.display = "block";
}

function handleXmarkClick(e) {
  const { target } = e;
  if (!target.classList.contains("favs__xmark-img")) {
    return;
  }
  closeFavourites();
}

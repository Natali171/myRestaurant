let favs = [];

document.addEventListener("click", function (e) {
  const { target } = e;
  if (!target.classList.contains("favs__xmark-img")) {
    return;
  }
  favsBlock.classList.remove("visible");
  document.querySelector(".wrapper").style.display = "block";
});

//==========================================================================================================================================
const favsBlock = document.querySelector(".favs");

document.addEventListener("click", handleFavouritesClick);

function handleFavouritesClick(e) {
  const { target } = e;
  if (!target.classList.contains("main-menu__link_fav")) {
    return;
  }
  const wrapper = document.querySelector(".wrapper");

  favsBlock.classList.toggle("visible");
  favsBlock.classList.contains("visible")
    ? (wrapper.style.display = "none")
    : (wrapper.style.display = "block");

  getFavourites();
}
function getFavourites() {
  let keys = Object.keys(localStorage);
  favs = [];
  keys.forEach((key) => {
    favs.push(JSON.parse(localStorage.getItem(key)));
  });
  console.log(favs);
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
  // hideEl("favs__message");
  // displayEl("fav-dish__pointer");
  // displayEl("fav-dish__wraper");
}
//==========================================================================================================================================
document.addEventListener("click", handleHeartClickFavs);

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

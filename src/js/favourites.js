document.addEventListener("click", handleHeartClick);

function handleHeartClick(e) {
  const { target } = e;
  if (!target.classList.contains("dishes-offered__heart")) {
    return;
  }
  const headerHeart = document.querySelector(".main-menu__heart");
  headerHeart.style.animation = "heart 1.4s linear";
  setTimeout(() => (headerHeart.style.animation = ""), 1000);
  const hearts = document.querySelectorAll(".dishes-offered__heart");
  indx = [...hearts].findIndex((el) => el == target);
  target.classList.contains("dishes-offered__heart_liked")
    ? handleDislike(indx)
    : handleLike(indx);
  target.classList.toggle("dishes-offered__heart_liked");
}

function handleLike(indx) {
  dishes[indx].fav = true;
  localStorage.setItem(`Fav${dishes[indx].id}`, JSON.stringify(dishes[indx]));
}

function handleDislike(indx) {
  delete localStorage[`Fav${dishes[indx].id}`];
}
//============================================================================================================================

document.addEventListener("click", handleFavourites);

function handleFavourites(e) {
  const { target } = e;
  if (!target.classList.contains("main-menu__link_fav")) {
    return;
  }
  getFavourites();
}
function getFavourites() {
  let keys = Object.keys(localStorage);
  const favs = keys.map((key) => JSON.parse(localStorage.getItem(key)));
  console.log(favs);
}

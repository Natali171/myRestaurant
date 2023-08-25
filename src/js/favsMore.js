document.addEventListener("click", handleFavsMore);
let indx;
function handleFavsMore(e) {
  const { target } = e;
  if (!target.classList.contains("favs__more")) {
    return;
  }
  const moreInfo = document.querySelectorAll(".favs__more");
  indx = [...moreInfo].findIndex((el) => el == target);
  favs[indx].ingredients ? renderFavsMore() : getFavsMore();
}

async function getFavsMore() {
  id = favs[indx].id;
  try {
    let response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}&includeNutrition=false`
    );
    let res = await response.json();
    handleFavsMoreResponse(res);
  } catch (err) {
    console.error(err);
    displayMessage("Sorry, something went wrong. Please try again later");
  }
}

function handleFavsMoreResponse(res) {
  hideEl("favs-more__wines-box");
  favs[indx].ingredients = res.extendedIngredients
    .reduce((str, ing) => (str += ing.name + ", "), "")
    .slice(0, -2);
  favs[indx].time = res.readyInMinutes + " m";
  favs[indx].price = res.pricePerServing;
  res.winePairing?.pairedWines?.length &&
    (favs[indx].wines = res.winePairing.pairedWines.reduce(
      (str, w) => (str += `<li class="favs-more__wine">${w}</li>`),
      ""
    )) &&
    displayEl("favs-more__wines-box");
  renderFavsMore();
}

function renderFavsMore() {
  hideEl("favs__wraper");
  hideEl("favs-more__wines");
  displayEl("favs-more__pointer");
  displayEl("favs-more");
  for (let key in favs[indx]) {
    key === "name" &&
      (document.querySelector(`.favs-more__${key}`).textContent =
        favs[indx][key]);
  }
  document.querySelector(".favs-more__img").setAttribute("src", favs[indx].img);
}

// =====================================================================================================================================

document.addEventListener("click", handleFavsGoBack);

function handleFavsGoBack(e) {
  const { target } = e;
  if (!target.classList.contains("favs-more__back-svg")) {
    return;
  }
  hideEl("favs-more");
  displayEl("favs__wraper");
}

// =====================================================================================================================================
document.addEventListener("click", handleFavsWinesDisplay);

function handleFavsWinesDisplay(e) {
  const { target } = e;
  if (!target.classList.contains("favs-more__wines-tab-text")) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  document.querySelector(".favs-more__wines").innerHTML = favs[indx].wines;

  hideEl("favs-more__pointer");
  displayEl("favs-more__wines");
}

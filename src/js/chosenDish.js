let i;
let dishes = [];

document.addEventListener("click", handleDishInfo);
document.addEventListener("click", handleGoBack);
document.addEventListener("click", handleWinesDisplay);

function handleDishInfo(e) {
  const { target } = e;
  if (!target.classList.contains("dishes-offered__more")) {
    return;
  }
  const moreInfo = document.querySelectorAll(".dishes-offered__more");
  i = [...moreInfo].findIndex((el) => el == target);
  dishes[i].ingredients ? renderDishInfo() : getDishInfo();
}

async function getDishInfo() {
  const id = dishes[i].id;
  try {
    let response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}&includeNutrition=false`
    );
    let res = await response.json();
    handleDishInfoResponse(res);
  } catch (err) {
    console.error(err);
    displayMessage("Sorry, something went wrong. Please try again later");
  }
}

function handleDishInfoResponse(res) {
  hideEl("chosen-dish__wines-box");
  dishes[i].ingredients = res.extendedIngredients
    .reduce((str, ing) => (str += ing.name + ", "), "")
    .slice(0, -2);
  dishes[i].time = res.readyInMinutes + " m";
  dishes[i].price = res.pricePerServing;
  res.winePairing?.pairedWines?.length &&
    (dishes[i].wines = res.winePairing.pairedWines.reduce(
      (str, w) => (str += `<li class="chosen-dish__wine">${w}</li>`),
      ""
    )) &&
    displayEl("chosen-dish__wines-box");
  renderDishInfo();
}

function renderDishInfo() {
  hideEl("dishes-offered__wraper");
  hideEl("chosen-dish__wines");
  displayEl("chosen-dish__pointer");
  displayEl("chosen-dish");
  for (let key in dishes[i]) {
    key === "name" &&
      (document.querySelector(`.chosen-dish__${key}`).textContent =
        dishes[i][key]);
  }
  document
    .querySelector(".chosen-dish__img")
    .setAttribute("src", dishes[i].img);
}

function handleGoBack(e) {
  const { target } = e;
  if (!target.classList.contains("chosen-dish__back-svg")) {
    return;
  }
  hideEl("chosen-dish");
  displayEl("dishes-offered__wraper");
}

function handleWinesDisplay(e) {
  const { target } = e;
  if (!target.classList.contains("chosen-dish__wines-tab-text")) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  document.querySelector(".chosen-dish__wines").innerHTML = dishes[i].wines;

  hideEl("chosen-dish__pointer");
  displayEl("chosen-dish__wines");
}

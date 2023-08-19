// =====================================================================================================================================
document.addEventListener("click", handleWinesDisplay);

function handleWinesDisplay(e) {
  const { target } = e;
  e.preventDefault();
  e.stopPropagation();
  if (target.classList[0] !== "chosen-dish__wines-tab-text") {
    return;
  }
  document.querySelector(".chosen-dish__wines").innerHTML = dishes[i].wines;
  hideEl("chosen-dish__pointer");
  displayEl("chosen-dish__wines");
}

// =====================================================================================================================================

const moreInfo = document.querySelectorAll(".dishes-offered__more");
let i;
let dishes = [];
document.addEventListener("click", handleDishInfo);
function handleDishInfo(e) {
  const { target } = e;
  if (target.classList[0] !== "dishes-offered__more") {
    return;
  }
  i = [...moreInfo].findIndex((el) => el == target);
  getMoreInfo(i);
}

function getMoreInfo() {
  id = dishes[i].id;
  $.ajax({
    url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}&includeNutrition=false`,
    success: function (res) {
      hideEl("chosen-dish__wines-box");
      console.log(res);
      dishes[i].ingredients = res.extendedIngredients
        .reduce((str, ing) => (str += ing.name + ", "), "")
        .slice(0, -2);
      dishes[i].time = res.readyInMinutes + " m";
      dishes[i].price = res.pricePerServing;
      res.winePairing.pairedWines.length &&
        (dishes[i].wines = res.winePairing.pairedWines.reduce(
          (str, w) => (str += `<li class="chosen-dish__wine">${w}</li>`),
          ""
        )) &&
        displayEl("chosen-dish__wines-box");

      renderChosenDish(i);
    },
    error: function () {
      displayMessage("Sorry, something went wrong. Please try again later");
    },
  });
}

function renderChosenDish(i) {
  hideEl("dishes-offered__wraper");
  displayEl("chosen-dish");
  hideEl("chosen-dish__wines");
  for (let key in dishes[i]) {
    key !== "img" &&
      key !== "id" &&
      key !== "wines" &&
      (document.querySelector(`.chosen-dish__${key}`).textContent =
        dishes[i][key]);
  }
  document
    .querySelector(".chosen-dish__img")
    .setAttribute("src", dishes[i].img);
}

// =====================================================================================================================================
const key = "53e3f78b152c4c658d3733a68a64566a";
// const key = "db254b5cd61744d39a2deebd9c361444";
const requestOb = {};

const message = document.querySelector(".dishes-offered__message");
const maxReadyTime = document.querySelector("#maxReadyTime");

document.addEventListener("change", handleSelect);
document.addEventListener("click", handleRecomendationSubmit);

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

function handleRecomendationSubmit(e) {
  const { target } = e;
  if (target.id !== "recomendationBtn") {
    return;
  }
  e.preventDefault();
  validateRecomendationForm();
}

function validateRecomendationForm() {
  if (
    isNaN(parseFloat(maxReadyTime.value.trim())) &&
    maxReadyTime.value != ""
  ) {
    maxReadyTime.value = "";
    maxReadyTime.classList.add("recomendation__input_invalid");
    maxReadyTime.placeholder = "Please enter a numeric value";
    return;
  }
  maxReadyTime.classList.remove("recomendation__input_invalid");
  maxReadyTime.placeholder = "Cooking time";

  maxReadyTime.value != "" &&
    (requestOb[maxReadyTime.id] = parseFloat(maxReadyTime.value.trim()));
  createRequest();
}

function createRequest() {
  const request = Object.entries(requestOb).reduce(
    (acc, item) => (acc += `&${item[0]}=${item[1]}`),
    ""
  );
  getRecomendations(request);
}

function getRecomendations(request) {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&number=4${request}`,
    success: function (res) {
      hideEl("dishes-offered__main-img-box");
      hideEl("chosen-dish");
      if (res.results.length === 0) {
        displayMessage(
          "Sorry, no results found, please try to change filter criteria"
        );
        delete requestOb.maxReadyTime;
        return;
      }
      hideEl("dishes-offered__wraper");
      displayEl("dishes-offered__wraper");

      dishes = [];
      res.results.forEach((el) => {
        dishes.push({
          id: el.id,
          name: el.title,
          img: el.image,
        });
      });
      console.log(dishes);
      renderRecomendations();
    },
    error: function () {
      displayMessage("Sorry, something went wrong. Please try again later");
    },
  });
}

function renderRecomendations() {
  const namesEl = document.querySelectorAll(".dishes-offered__name");
  const imgs = document.querySelectorAll(".dishes-offered__img");
  namesEl.forEach((el, i) => {
    el.textContent = "";
    i < dishes.length && (el.textContent = dishes[i].name);
  });
  imgs.forEach((img, i) => {
    img.setAttribute("src", "");
    i < dishes.length && img.setAttribute("src", dishes[i].img);
  });

  hideEl("dishes-offered__message");
  displayEl("chosen-dish__pointer");
  displayEl("dishes-offered__wraper");
  delete requestOb.maxReadyTime;
}

function displayMessage(msg) {
  hideEl("dishes-offered__main-img-box");
  hideEl("dishes-offered__wraper");
  message.textContent = msg;
  displayEl("dishes-offered__message");
}

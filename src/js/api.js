// const key = "53e3f78b152c4c658d3733a68a64566a";
const key = "db254b5cd61744d39a2deebd9c361444";
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
      const namesEl = document.querySelectorAll(".dishes-offered__name");
      const imgs = document.querySelectorAll(".dishes-offered__img");
      hideEl("dishes-offered__main-img-box");
      if (res.results.length === 0) {
        displayMessage(
          "Sorry, no results found, please try to change filter criteria"
        );
        delete requestOb.maxReadyTime;
        return;
      }
      hideEl("dishes-offered__wraper");
      displayEl("dishes-offered__wraper");
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
    error: function () {
      displayMessage("Sorry, something went wrong. Please try again later");
    },
  });
}

function displayMessage(msg) {
  hideEl("dishes-offered__main-img-box");
  hideEl("dishes-offered__wraper");
  message.textContent = msg;
  displayEl("dishes-offered__message");
}

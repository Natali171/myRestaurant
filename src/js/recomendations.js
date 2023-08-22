const key = "53e3f78b152c4c658d3733a68a64566a";
// const key = "db254b5cd61744d39a2deebd9c361444";
const requestOb = {};

const message = document.querySelector(".dishes-offered__message");

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
  const maxReadyTime = document.querySelector("#maxReadyTime");
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

async function getRecomendations(request) {
  try {
    let response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&number=4${request}`
    );
    let res = await response.json();
    handleRecomendations(res);
  } catch (err) {
    console.error(err);
    displayMessage("Sorry, something went wrong. Please try again later");
  }
}

function handleRecomendations(res) {
  hideEl("dishes-offered__main-img-box");
  hideEl("chosen-dish");
  hideEl("dishes-offered__wraper");
  dishes = [];
  document.querySelector(".dishes-offered__wraper").innerHTML = "";
  if (res.results.length === 0) {
    displayMessage(
      "Sorry, no results found, please try to change filter criteria"
    );
    delete requestOb.maxReadyTime;
    return;
  }
  displayEl("dishes-offered__wraper");
  res.results.forEach((el, i) => {
    i <= 4 &&
      dishes.push({
        id: el.id,
        name: el.title,
        img: el.image,
        fav: localStorage.getItem(`Fav${el.id}`) ? true : false,
      });
  });
  renderRecomendations();
}

function renderRecomendations() {
  // const namesEl = document.querySelectorAll(".dishes-offered__name");
  // const imgs = document.querySelectorAll(".dishes-offered__img");
  // namesEl.forEach((el, i) => {
  //   el.textContent = "";
  //   i < dishes.length && (el.textContent = dishes[i].name);
  // });
  // imgs.forEach((img, i) => {
  //   img.setAttribute("src", "");
  //   i < dishes.length && img.setAttribute("src", dishes[i].img);
  // });
  const ul = document.createElement("ul");
  ul.classList.add("dishes-offered__box");
  ul.innerHTML = createRecomendationItem();
  document.querySelector(".dishes-offered__wraper").appendChild(ul);

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

function createRecomendationItem() {
  const lis = dishes.reduce((acc, ob) => {
    acc += ` <li class="dishes-offered__item">
  <div class="dishes-offered__img-box">
    <img src="${ob.img}" alt="" class="dishes-offered__img" />
  </div>
  <div class="dishes-offered__name">${ob.name}</div>
  <div class="dishes-offered__meta">
    <i class="dishes-offered__heart ${
      ob.fav ? "dishes-offered__heart_liked" : "".trim()
    } fa-solid fa-heart"></i>
    <div id="more-info" class="dishes-offered__more">
      more info
    </div>
  </div>
  </li> `;
    return acc;
  }, "");
  return lis;
}

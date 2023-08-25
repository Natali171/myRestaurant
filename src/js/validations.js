const dateInput = document.querySelector(".reservation__input_date");
const time = document.querySelector(".reservation__select_time");

dateInput.valueAsDate = new Date();

document.addEventListener("click", handleReservationSubmit);
document.addEventListener("click", handleSubscription);

function handleSubscription(e) {
  const { target } = e;
  if (!target.classList.contains("subscription__btn")) {
    return;
  }
  e.preventDefault();
  validateEmail("footer-subscription__email") && handleSuccessSubscription();
}

function validateEmail(cl) {
  email = document.querySelector("." + cl);
  if (!email.value.includes("@")) {
    showInvalid(email, 'Please include an "@".');
    handleInput(email, 5);
    return false;
  }
  if (email.value.length <= 5) {
    showInvalid(email, "At least 5 characters required");
    handleInput(email, 5);
    return false;
  }
  return true;
}

function handleSuccessSubscription() {
  const message = document.querySelector(".footer-subscription__message");
  message.innerHTML =
    "You have successfully subscribed to our news and offers.";
  displayEl("footer-subscription__message");
  setTimeout(() => hideEl("footer-subscription__form"), 800);
}

// ====================================================================================================================================

function handleReservationSubmit(e) {
  const { target } = e;
  if (!target.classList.contains("reservation__btn")) {
    return;
  }
  e.preventDefault();
  validateReservation();
}

function validateReservation() {
  const funcs = [validateName, validateEmail, validateDateTime];
  let res = 0;
  validateName() && res++;
  validateEmail("reservation__input_email") && res++;
  validateDateTime() && res++;
  res === 3 && handleSuccessReservation();
}

function validateName() {
  const name = document.querySelector(".reservation__input_name");
  if (name.value.trim().length < 4) {
    showInvalid(name, "At least 4 characters required");
    handleInput(name, 4);
    return false;
  }
  return true;
}

function showInvalid(el, msg) {
  el.classList.add("invalid-input");
  el.placeholder = msg;
  el.value = "";
}

function handleInput(el, num) {
  el.addEventListener("keyup", () => {
    el.value.trim().length >= num && el.classList.remove("invalid-input");
  });
}

function validateDateTime() {
  date = new Date(dateInput.value);
  let tenDaysLater = Date.now() + 864000000;
  const h = 3600000;

  if (Date.now() >= +date + (time.value - 3) * h) {
    return handleInvalidDayTime(
      "You have entered a past date or time. Please try again"
    );
  }
  if (date > tenDaysLater) {
    return handleInvalidDayTime(
      "You can only book a table for the next 10 days. Please try again"
    );
  }
  hideEl("reservation__date-message");
  dateInput.classList.remove("invalid-input");
  return true;
}

function handleInvalidDayTime(msg) {
  const message = document.querySelector(".reservation__date-message");
  message.innerHTML = msg;
  displayEl("reservation__date-message");
  dateInput.classList.add("invalid-input");
  dateInput.addEventListener("focus", () => {
    dateInput.classList.remove("invalid-input");
  });
  time.addEventListener("focus", () => {
    dateInput.classList.remove("invalid-input");
  });
  return false;
}

function handleSuccessReservation() {
  const message = document.querySelector(".reservation__message");
  const name = document.querySelector(".reservation__input_name").value.trim();
  const people = document.querySelector(".reservation__select_people").value;
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  message.innerHTML = ` Table for  <span class="reservation__highlighted">${
    people == 1 ? "1 person" : `${people} persons`
  }</span>  for <span class="reservation__highlighted">${name}</span> successfully booked. <br>
  We are looking forward to seeing you on <span class="reservation__highlighted">${date.toLocaleDateString(
    "en-US",
    options
  )}</span> at <span class="reservation__highlighted">${time.value}:00</span>.`;
  displayEl("reservation__message");
  setTimeout(() => hideEl("reservation__form"), 800);
}

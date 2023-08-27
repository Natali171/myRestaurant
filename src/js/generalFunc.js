function hideEl(cl) {
  const el = document.querySelector(`.${cl}`);
  el.style.animation = "hide .5s linear";
  setTimeout(() => (el.style.display = "none"), 400);
}

function displayEl(cl) {
  const el = document.querySelector(`.${cl}`);
  setTimeout(() => {
    el.style.display = "block";
    el.style.animation = "display 1s linear";
  }, 1000);
}

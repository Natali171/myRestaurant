const tabs = document.querySelectorAll(".menu-cats__link");

document.addEventListener("click", handleTabs);

function handleTabs(e) {
  const { target } = e;
  if (![...tabs].includes(target)) {
    return;
  }
  e.preventDefault();
  handleTabContent(target);
  const activeLink = document.querySelector(".menu-cats__link_active");
  activeLink.classList.remove("menu-cats__link_active");
  target.classList.add("menu-cats__link_active");
}

function handleTabContent(target) {
  const visibleContEL = document.querySelector(`.content-visible`);
  visibleContEL.style.animation = "hide 1.2s linear";
  const contentEl = document.querySelector(`.dishes__${target.id}`);
  setTimeout(() => {
    visibleContEL.classList.remove("content-visible");
    contentEl.classList.add("content-visible");
    contentEl.style.animation = "display .8s linear";
  }, 500);
}

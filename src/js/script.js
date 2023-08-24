const videoOverlay = $(".video__overlay");

$(document).on("click", ".video__link", handleVideoOverlay);
$(document).on("click", ".video__overlay", handleVideoOverlay);

function handleVideoOverlay(e) {
  e.preventDefault();
  videoOverlay.toggleClass("visible");
}

// ================================================================================================================
function initMobile() {
  k = 80;
  console.log("is-mobile");
}

function initTablet() {
  k = 100;
  console.log("is-tablet");
}

function initDesktop() {
  k = 140;
  console.log("is-desktop");
}

ssm.addStates([
  {
    id: "mobile",
    query: "(max-width: 640px)",
    onEnter: function () {
      initMobile();
    },
  },
  {
    id: "tablet",
    query: "(min-width: 641px) and (max-width: 992px)",
    onEnter: function () {
      initTablet();
    },
  },
  {
    id: "desktop",
    query: "(min-width: 993px)",
    onEnter: function () {
      initDesktop();
    },
  },
]);

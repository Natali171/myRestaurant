$("#slider").slick({
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  appendArrows: ".special-cats",
  infinity: true,
  prevArrow:
    '<div class="special-cats__arrow special-cats__arrow_left">&lt</div>',
  nextArrow:
    '<div class="special-cats__arrow special-cats__arrow_right">&gt</div>',
  responsive: [
    {
      breakpoint: 1399,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

let des;

function animateHeader() {
  const text = document.querySelector(".slick-current .heading__item-box");
  text.style.animation = "moveTop 1.4s ease";
  setTimeout(() => {
    text.style.animation = "";
    text.style.opacity = 1;
  }, 1400);
}

$(".heading")
  .slick({
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1,
    pauseOnHover: false,
    fade: true,
    arrows: true,
    appendArrows: ".header__arrows",
    prevArrow: '<div class="header__arrow header__arrow_left">&lt</div>',
    nextArrow: '<div class="header__arrow header__arrow_right">&gt</div>',
  })
  .on("afterChange", animateHeader);
animateHeader();

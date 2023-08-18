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
  text.style.opacity = 0;
  text.style.top = `100px`;
  setTimeout(() => {
    const moveText = setInterval(() => {
      text.style.top = `${parseFloat(text.style.top) - 0.5}px`;
      parseFloat(text.style.top) < 50 && clearInterval(moveText);
    }, 1);
    const changeTextOp = setInterval(() => {
      let val = parseFloat(text.style.opacity);
      if (val < 1) {
        val += 0.003;
        text.style.opacity = val;
        return;
      }
      clearInterval(changeTextOp);
    }, 1);
  }, 600);
  return;
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

$("#slider").slick({
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 3,
  appendArrows: ".special-cats",
  centerMode: true,
  prevArrow:
    '<div class="special-cats__arrow special-cats__arrow_left">&lt</div>',
  nextArrow:
    '<div class="special-cats__arrow special-cats__arrow_right">&gt</div>',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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

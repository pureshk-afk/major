const swiper = new Swiper("#feedback-slider", {
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false
  },
  speed: 5000,

  slidesPerView: "auto",
  spaceBetween: 30,

  allowTouchMove: false,

  freeMode: {
    enabled: true,
    momentum: false
  }
});
const swiper = new Swiper("#review-slider", {
  loop: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: false
  },
  speed: 5000,
  slidesPerView: 5,
  spaceBetween: 30,
  allowTouchMove: false,
  freeMode: {
    enabled: true,
    momentum: false
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
      centeredSlides: true
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
      centeredSlides: false
    },
    780: {
      slidesPerView: 4,
      spaceBetween: 20,
      centeredSlides: false
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 30,
      centeredSlides: false
    }
  }
});
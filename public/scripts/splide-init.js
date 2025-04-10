window.addEventListener("DOMContentLoaded", () => {
  const main = new Splide("#main-slider", {
    type: 'fade',
    heightRatio: 0.5,
    pagination: false,
    arrows: true,
    cover: false,
  });

  const thumbnails = new Splide("#thumbnail-slider", {
    fixedWidth: 100,
    height: 64,
    isNavigation: true,
    gap: 10,
    focus: 'number',
    pagination: false,
    cover: true,
    arrows: false,
    breakpoints: {
      640: {
        fixedWidth: 66,
        height: 48,
      },
    },
  }).mount();

  main.sync(thumbnails).mount();
});
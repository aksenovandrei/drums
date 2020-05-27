(function ($) {
  const Component = function (container) {
    this.$container = $(container);
    this.imageSlide = this.$container.find('.slider-image');
    this.slideToShow = 1;
  };

  $.extend(true, Component.prototype, {
    init() {
      this.configureVideSlider();
      this.initializeSlider();
      this.checkSliderType();
      this.$container.addClass('initialized');
    },

    checkSliderType() {
      if (this.$container.hasClass('mixed-content')) {
        this.setImageToBakcground();
      }
    },

    configureVideSlider() {
      if (this.$container.hasClass('video-slider')) {
        this.slideToShow = 2;
      }
    },

    setImageToBakcground() {
      this.imageSlide.each((index, item) => {
        const imagePath = $(item).find('img')[0].src;
        $(item).closest('.slick-slide').css('background-image', `url("${imagePath}")`)
      })
    },

    initializeSlider() {
      // console.log(this.slideToShow);
      this.$container.slick({
        infinite: false,
        slidesToShow: this.slideToShow,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              dots: true
            }
          }
        ]
      });

    },
  });
  const $component = $('.slider:not(.initialized)');
  let instance;

  $component.each((i, item) => {
    instance = new Component(item);
    instance.init();
  });
}(jQuery));

const $showButton = $('.show-btn');

$('.show-btn').on('click', function () {
  $('.hidden-text').slideDown();
  $('.show-btn').hide();
})
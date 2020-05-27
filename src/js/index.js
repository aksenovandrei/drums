(function ($) {
  const Component = function (container) {
    this.$container = $(container);
    this.imageSlide = this.$container.find('.slider-image');
    this.videoSlider = false;
  };

  $.extend(true, Component.prototype, {
    init() {
      this.configureVideoSlider();
      this.initializeSlider();
      this.checkSliderType();
      this.$container.addClass('initialized');
    },

    checkSliderType() {
      if (this.$container.hasClass('mixed-content')) {
        this.setImageToBakcground();
      }
    },

    configureVideoSlider() {
      if (this.$container.hasClass('video-slider')) {
        this.videoSlider = true;
      }
    },

    setImageToBakcground() {
      this.imageSlide.each((index, item) => {
        const imagePath = $(item).find('img')[0].src;
        console.log(imagePath)
        $(item).closest('.slick-slide').css('background-image', `url("${imagePath}")`)
      })
    },

    initializeSlider() {
      const options = {
        infinite: false,
        slidesToShow: this.slideToShow,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
      }
      const VideoOptions = {
        infinite: false,
        slidesToShow: 2,
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
      }
      
      this.$container.slick(this.videoSlider ? VideoOptions : options);
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
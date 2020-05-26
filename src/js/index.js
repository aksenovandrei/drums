(function ($) {
  const Component = function (container) {
    this.$container = $(container);
    this.imageSlide = this.$container.find('.slider-image');
  };

  $.extend(true, Component.prototype, {
    init() {
      this.initializeSlider();
      this.checkSliderType();
      this.$container.addClass('initialized');
    },

    checkSliderType() {
      console.log(this.$container.hasClass('mixed-content'));
      if (this.$container.hasClass('mixed-content')) {
        this.setImageToBakcground();
      }
    },

    setImageToBakcground() {
      this.imageSlide.each((index, item) => {
        console.log($(item).find('img')[0].src);
        const imagePath = $(item).find('img')[0].src;
        $(item).closest('.slick-slide').css('background-image', `url("${imagePath}")`)
      })
    },

    initializeSlider() {
      this.$container.slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
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
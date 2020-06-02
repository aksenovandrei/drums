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


(function ($) {
  const $showBtn = $('.show-btn');
  $showBtn.on('click', function () {
    $('.hidden-text').slideDown();
    $showBtn.hide();
  })
}(jQuery));

(function ($) {
  const Component = function (container) {
    this.$container = $(container);
  };

  $.extend(true, Component.prototype, {
    init() {
      this._bindInteractions();
      this.$container.addClass('initialized');
    },

    _scrollTo() {
      event.preventDefault();
      event.stopPropagation();
      const targetSection = this.$container.attr('href');
      console.log(this.$container.attr('href'));
      $('html, body').animate({
        scrollTop: $(`.${targetSection}`).offset().top
      }, 500);
    },

    checkScrollValue() {
      const scrollTop = $(window).scrollTop();
      const $toTopBtn = $('.toTop');
      if (scrollTop > 800) {
        $toTopBtn.fadeIn(200);
      } else {
        $toTopBtn.fadeOut(200);
      }
    },

    _bindInteractions() {
      this.$container.on('click', this._scrollTo.bind(this));
      $(window).scroll(this.checkScrollValue.bind(this));
    },
  });
  const $component = $('.scroll-button:not(.initialized)');
  let instance;

  $component.each((i, item) => {
    instance = new Component(item);
    instance.init();
  });
}(jQuery));

$('#callback').on('submit', function () {
  event.preventDefault();
  const form = $('#callback').find('form')[0];
  const data = new FormData(form);

  $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "callback.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 800000,
      success: function (data) {
          console.log("SUCCESS : ", data);
          const $modal = $('#success');
          const $callbackModal = $('#callback');
          const result = $($modal[0]).find('.result');
          result.text(data);
          $callbackModal.modal('hide');
          $modal.modal('show');
      },
      error: function (e) {
          console.log("ERROR : ", e);
          const $modal = $('#fail');
          const result = $($modal[0]).find('.result');
          result.text('Произошла ошибка отправки формы. Свяжитесь с нами по телефону +7-9999-777-550');
          $modal.modal('show');

      }
  });
  return;
})
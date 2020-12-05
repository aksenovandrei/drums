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
        arrows: true,
        dots: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              dots: true,
              arrows: true,
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

    _scrollTo(event) {
      event.preventDefault();
      event.stopPropagation();
      const targetSection = this.$container.attr('href');
      const targetElements = $(`.${targetSection}`);
      let $elem;
      if ($(targetElements[0]).is(':visible')) {
        $elem = $(targetElements[0]);
      } else {
        $elem = $(targetElements[1]);
      }
      $('html, body').animate({
        scrollTop: $elem.offset().top
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

$('#callbackForm').on('submit', function () {
  event.preventDefault();
  const form = $('#signUp').find('form')[0];
  const data = new FormData(form);

  $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "signup.php",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 800000,
      success: function (data) {
          console.log("SUCCESS : ", data);
          const $modal = $('#success');
          const $signUp = $('#signUp');
          const result = $($modal[0]).find('.result');
          result.text(data);
          $(form).closest('.modal').modal('hide');
          $signUp.modal('hide');
          $modal.modal('show');
      },
      error: function (e) {
          console.log("ERROR : ", e);
          const $modal = $('#fail');
          const result = $($modal[0]).find('.result');
          $(form).closest('.modal').modal('hide');
          result.text('Произошла ошибка отправки формы. Свяжитесь со мной по телефону +7-926-246-47-59');
          $modal.modal('show');

      }
  });
  return;
})

$('#askQuestionForm').on('submit', function () {
  event.preventDefault();
  const form = $('#askQuestion').find('form')[0];
  const data = new FormData(form);

  $.ajax({
    type: "POST",
    enctype: 'multipart/form-data',
    url: "askquestion.php",
    data: data,
    processData: false,
    contentType: false,
    cache: false,
    timeout: 800000,
    success: function (data) {
      console.log("SUCCESS : ", data);
      const $modal = $('#success');
      const $askQuestion = $('#askQuestion');
      const result = $($modal[0]).find('.result');
      result.text(data);
      $(form).closest('.modal').modal('hide');
      $askQuestion.modal('hide');
      $modal.modal('show');
    },
    error: function (e) {
      console.log("ERROR : ", e);
      const $modal = $('#fail');
      const result = $($modal[0]).find('.result');
      $(form).closest('.modal').modal('hide');
      result.text('Произошла ошибка отправки формы. Свяжитесь со мной по телефону +7-926-246-47-59');
      $modal.modal('show');

    }
  });
  return;
})
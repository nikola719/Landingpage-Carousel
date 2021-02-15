/**
 * This is script for index page
 */
$(document).ready(function () {
  // Wow init
  new WOW().init();

  //hamburger event
  $(document).on("click", ".hamburger", function () {
    $(".header").toggleClass("active");
    if ($(".header").hasClass("active")) {
      $("html,body").css("overflow-y", "hidden");
    } else {
      $("html, body").css("overflow-y", "visible");
    }
  });

  // header menu anchor link
  $(document).on("click", ".menu-item a", function () {
    let target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      800
    );
    if ($(".header").hasClass("active")) {
      $(".header").removeClass("active");
      $("html, body").css("overflow-y", "visible");
    }
  });
  //viewport check
  $.fn.isInViewport = function () {
    if ($(this).length > 0) {
      let elementTop = $(this).offset().top;
      let elementBottom = elementTop + $(this).outerHeight();

      let viewportTop = $(window).scrollTop();
      let viewportBottom = viewportTop + $(window).height();

      return elementBottom > viewportTop && elementTop < viewportBottom;
    }
  };

  //scroll effect
  // var lastScrollTop = 0;
  // $(window).scroll(function (event) {
  //   var st = $(this).scrollTop();
  //   if (st > lastScrollTop && st > $(".header").outerHeight()) {
  //     // downscroll code
  //     if (!$(".header").hasClass("active")) {
  //       $(".header").addClass("is-hidden");
  //     }
  //   } else {
  //     // upscroll code
  //     $(".header").removeClass("is-hidden");
  //   }
  //   if ($(".article-content__statistics").isInViewport()) {
  //     $(".article-content__statistics").addClass("active");
  //   } else {
  //     $(".article-content__statistics").removeClass("active");
  //   }
  //   lastScrollTop = st;
  // });

  //Slick Carousel
  if ($(".client-carousel").length) {
    $(".client-carousel .client-carousel__container").slick({
      arrows: true,
      cssEase: "ease",
      easing: "linear",
      autoplay: false,
      // infinite: true,
      fade: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [],
    });
    blog_posts_height_adjust();
    $(window).on("resize", function () {
      blog_posts_height_adjust();
    });
  }
  $(".client-carousel__container").on(
    "init afterChange",
    function (event, slick, currentSlide) {
      let total = $(this).find(".client-carousel__single").length;
      let start = (currentSlide ? currentSlide : 0) + 1;
      $(this)
        .closest(".client-carousel")
        .find(".client-meta__right p")
        .html(`${start} / ${total}`);
    }
  );
  function blog_posts_height_adjust() {
    var max_height = 0;
    $(".podcast-carousel__container .podcast-carousel__single").each(
      function () {
        if (max_height < $(this).height()) {
          max_height = $(this).height();
        }
      }
    );
    $(".podcast-carousel__container .podcast-carousel__single").each(
      function () {
        $(this).height(max_height);
      }
    );
  }
});

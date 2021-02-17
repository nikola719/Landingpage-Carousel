/**
 * This is script for index page
 */
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

// Check section is on screen
$.fn.isOnScreen = function (x, y) {
  if (x == null || typeof x == "undefined") x = 1;
  if (y == null || typeof y == "undefined") y = 1;

  var win = $(window);

  var viewport = {
    top: win.scrollTop(),
    left: win.scrollLeft(),
  };
  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();

  var height = this.outerHeight();
  var width = this.outerWidth();

  if (!width || !height) {
    return false;
  }

  var bounds = this.offset();
  bounds.right = bounds.left + width;
  bounds.bottom = bounds.top + height;

  var visible = !(
    viewport.right < bounds.left ||
    viewport.left > bounds.right ||
    viewport.bottom < bounds.top ||
    viewport.top > bounds.bottom
  );

  if (!visible) {
    return false;
  }

  var deltas = {
    top: Math.min(1, (bounds.bottom - viewport.top) / height),
    bottom: Math.min(1, (viewport.bottom - bounds.top) / height),
    left: Math.min(1, (bounds.right - viewport.left) / width),
    right: Math.min(1, (viewport.right - bounds.left) / width),
  };

  return deltas.left * deltas.right >= x && deltas.top * deltas.bottom >= y;
};

$(document).ready(function () {
  // Wow init
  new WOW().init();

  $(".text-block").each(function () {
    if ($(this).isInViewport(0, 0.5)) {
      $(this).addClass("is-visible");
    }
  });

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
    if (target != "index.html") {
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top && $(target).offset().top,
        },
        800
      );
    }
    if ($(".header").hasClass("active")) {
      $(".header").removeClass("active");
      $("html, body").css("overflow-y", "visible");
    }
  });

  $(document).on("click", ".section-content__map", function () {
    let target = $("#map");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      800
    );
  });

  // active page scroller when element in view
  $(window).on("resize scroll", function () {
    $(".viewport").each(function () {
      let currentId = $(this).attr("id");
      if ($(this).isInViewport(0, 0.5)) {
        $('a[href="#' + currentId + '"]').addClass("active");
      } else {
        $('a[href="#' + currentId + '"]').removeClass("active");
      }
      if ($(this).width() <= 768) $(".header").removeClass("is-sticky");
    });
    $(".text-block").each(function () {
      if ($(this).isInViewport(0, 0.5)) {
        $(this).addClass("is-visible");
      }
    });
  });

  // scroll effect
  var lastScrollTop = 0;
  $(window).scroll(function (event) {
    var st = $(this).scrollTop();
    var headerTop = $(".banner").outerHeight() - $(".header").outerHeight();
    // var headerTop = $(".header").offset().top;
    if (st >= headerTop) {
      if ($(this).width() > 768) $(".header").addClass("is-sticky");
    } else {
      $(".header").removeClass("is-sticky");
    }
    if (st > lastScrollTop && st > $(".banner").outerHeight() + 100) {
      // downscroll code
      if (!$(".header").hasClass("active")) {
        $(".header").addClass("is-hidden");
      }
    } else {
      // upscroll code
      $(".header").removeClass("is-hidden");
    }
    lastScrollTop = st;
  });

  // Initialize the slick carousel
  $(".client-carousel .client-carousel__container").on(
    "init",
    function (event, slick, direction) {
      $(".slick-prev").css("display", "none");
    }
  );
  //Slick Carousel
  if ($(".client-carousel").length) {
    $(".client-carousel .client-carousel__container").slick({
      arrows: true,
      cssEase: "ease",
      easing: "linear",
      autoplay: false,
      adaptiveHeight: false,
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

  //slick arrow event
  $(".client-carousel__container").on(
    "init afterChange",
    function (event, slick, currentSlide) {
      let total = $(this).find(".client-carousel__single").length;
      let start = (currentSlide ? currentSlide : 0) + 1;
      if (start == total) {
        $(this).find(".slick-next").css("display", "none");
      } else if (start == 1) {
        $(this).find(".slick-prev").css("display", "none");
      } else {
        $(this).find(".slick-next").css("display", "block");
        $(this).find(".slick-prev").css("display", "block");
      }
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

  const loadingScreen = document.querySelector(".loading-screen");

  // Function to add and remove the page transition screen
  function pageTransitionIn() {
    // GSAP methods can be chained and return directly a promise
    // but here, a simple tween is enough
    return (
      gsap
        // .timeline()
        // .set(loadingScreen, { transformOrigin: 'bottom left'})
        // .to(loadingScreen, { duration: .5, scaleY: 1 })
        .to(loadingScreen, {
          duration: 0.5,
          scaleY: 1,
          transformOrigin: "bottom left",
        })
    );
  }

  // Function to add and remove the page transition screen
  function pageTransitionOut(container) {
    // GSAP methods can be chained and return directly a promise
    return gsap
      .timeline({ delay: 1 }) // More readable to put it here
      .add("start") // Use a label to sync screen and content animation
      .to(
        loadingScreen,
        {
          duration: 0.5,
          scaleY: 0,
          skewX: 0,
          transformOrigin: "top left",
          ease: "power1.out",
        },
        "start"
      )
      .call(contentAnimation, [container], "start");
  }

  // Function to animate the content of each page
  function contentAnimation(container) {
    new WOW().init();

    $(".text-block").each(function () {
      if ($(this).isInViewport(0, 0.5)) {
        $(this).addClass("is-visible");
      }
    });

    $(".client-carousel .client-carousel__container").slick({
      arrows: true,
      cssEase: "ease",
      easing: "linear",
      autoplay: false,
      adaptiveHeight: false,
      // infinite: true,
      fade: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [],
    });

    // slick arrow event
    $(".client-carousel__container").on(
      "init afterChange",
      function (event, slick, currentSlide) {
        let total = $(this).find(".client-carousel__single").length;
        let start = (currentSlide ? currentSlide : 0) + 1;
        if (start == total) {
          $(this).find(".slick-next").css("display", "none");
        } else if (start == 1) {
          $(this).find(".slick-prev").css("display", "none");
        } else {
          $(this).find(".slick-next").css("display", "block");
          $(this).find(".slick-prev").css("display", "block");
        }
        $(this)
          .closest(".client-carousel")
          .find(".client-meta__right p")
          .html(`${start} / ${total}`);
      }
    );

    // Query from container
    $("html, body").animate(
      {
        scrollTop: $(window).scrollTop(0),
      },
      800
    );
  }

  $(function () {
    barba.init({
      // We don't want "synced transition"
      // because both content are not visible at the same time
      // and we don't need next content is available to start the page transition
      // sync: true,
      transitions: [
        {
          // NB: `data` was not used.
          // But usually, it's safer (and more efficient)
          // to pass the right container as a paramater to the function
          // and get DOM elements directly from it
          async leave(data) {
            // Not needed with async/await or promises
            // const done = this.async();
            console.log("leave page");
            await pageTransitionIn();
            // No more needed as we "await" for pageTransition
            // And i we change the transition duration, no need to update the delay…
            // await delay(1000)

            // Not needed with async/await or promises
            // done()

            // Loading screen is hiding everything, time to remove old content!
            data.current.container.remove();
          },

          async enter(data) {
            console.log("enter page");
            await pageTransitionOut(data.next.container);
          },
          // Variations for didactical purpose…
          // Better browser support than async/await
          // enter({ next }) {
          //   return pageTransitionOut(next.container);
          // },
          // More concise way
          // enter: ({ next }) => pageTransitionOut(next.container),

          // async once(data) {
          //   await contentAnimation(data.next.container);
          // },
        },
      ],
    });
  });
});

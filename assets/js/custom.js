$(document).ready(function () {
	"use strict";

	/* ==================================
	   0. Load Spinner + Menu cho mọi trang
	================================== */

	async function loadPartials() {

		async function loadAndInsert(paths, position) {
			for (const path of paths) {
				try {
					const res = await fetch(path);
					if (res.ok) {
						const html = await res.text();
						document.body.insertAdjacentHTML(position, html);
						return true;
					}
				} catch (e) {
					// ignore
				}
			}
			return false;
		}

		// 1. Load spinner trước (để chắn màn hình)
		await loadAndInsert(
			["/spinner.html", "spinner.html", "../spinner.html"],
			"afterbegin"
		);

		// 2. Load menu điều hướng
		await loadAndInsert(
			["/menu.html", "menu.html", "../menu.html"],
			"afterbegin"
		);

		// 3. Tắt spinner khi load xong
		setTimeout(function () {
			let spinner = document.getElementById("spinner");
			if (spinner) spinner.classList.remove("show");

			let overlay = document.querySelector(".spinner-overlay");
			if (overlay) overlay.classList.add("d-none");
		}, 500);
	}

	loadPartials();



	/* ==================================
	   1. Scroll To Top
	================================== */

	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 300) {
			$('.return-to-top').fadeIn();
		} else {
			$('.return-to-top').fadeOut();
		}
	});

	$('.return-to-top').on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 1500);
		return false;
	});



	/* ==================================
	   2. Welcome Animation
	================================== */

	$(window).on("load", function () {
		$(".welcome-hero-txt h2,.welcome-hero-txt p")
			.addClass("animated fadeInUp")
			.css({ opacity: "1" });

		$(".welcome-hero-txt button")
			.addClass("animated fadeInDown")
			.css({ opacity: "1" });
	});



	/* ==================================
	   3. Owl Carousels
	================================== */

	// i. New Cars Carousel
	$("#new-cars-carousel").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		dots: true,
		mouseDrag: true,
		nav: false,
		smartSpeed: 1000,
		transitionStyle: "fade",
		animateIn: "fadeIn",
		animateOut: "fadeOutLeft"
	});

	// ii. Testimonial Carousel
	var owl = $(".testimonial-carousel");
	owl.owlCarousel({
		items: 3,
		margin: 0,
		loop: true,
		autoplay: true,
		smartSpeed: 1000,
		dots: false,
		responsive: {
			0: { items: 1 },
			640: { items: 2 },
			992: { items: 3 }
		}
	});

	$(".play").on("click", function () {
		owl.trigger("play.owl.autoplay", [1000]);
	});

	$(".stop").on("click", function () {
		owl.trigger("stop.owl.autoplay");
	});

	// iii. Brand Carousel
	$(".brand-item").owlCarousel({
		items: 6,
		loop: true,
		smartSpeed: 1000,
		autoplay: true,
		dots: false,
		responsive: {
			0: { items: 2 },
			415: { items: 2 },
			600: { items: 3 },
			1000: { items: 6 }
		}
	});

});

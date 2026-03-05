(function ($) {
    "use strict";

    async function loadPartials() {
        // Helper: thử lần lượt các path, path nào ok thì dùng
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
                    // Bỏ qua lỗi, thử path tiếp theo
                }
            }
            return false;
        }

        // 1. Load spinner (luôn nằm trên cùng)
        await loadAndInsert(
            [
                "../spinner.html"   // nếu trang nằm trong 1 folder con
            ],
            "afterbegin"
        );

        // 2. Load menu (sau spinner, trên nội dung trang)
        await loadAndInsert(
            [
                "../header.html"
            ],
            "afterbegin"
        );

        await loadAndInsert(
            [
                "../footer.html"
            ],
            "beforeend"
        );

        // 3. Ẩn spinner sau một lúc
        setTimeout(function () {
            var spinnerEl = document.getElementById("spinner");
            if (spinnerEl && spinnerEl.classList.contains("show")) {
                spinnerEl.classList.remove("show");
            }
            var overlay = document.querySelector(".spinner-overlay");
            if (overlay) overlay.classList.add("d-none");
        }, 800);
    }

    function setActiveMenu() {

        const current = window.location.pathname;
        document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {

            const href = link.getAttribute("href");
            if (!href) return;

            if (href.includes("brands") && current.includes("brands")) {
                link.classList.add("active");
            }

            if (href.endsWith(current)) {
                link.classList.add("active");
            }
        });
    }

    function initUI() {
        // Initiate the wowjs
        new WOW().init();

        // Dropdown on mouse hover
        const $dropdown = $(".dropdown");
        const $dropdownToggle = $(".dropdown-toggle");
        const $dropdownMenu = $(".dropdown-menu");
        const showClass = "show";

        $(window).on("load resize", function () {
            if (this.matchMedia("(min-width: 992px)").matches) {
                $dropdown.hover(
                    function () {
                        const $this = $(this);
                        $this.addClass(showClass);
                        $this.find($dropdownToggle).attr("aria-expanded", "true");
                        $this.find($dropdownMenu).addClass(showClass);
                    },
                    function () {
                        const $this = $(this);
                        $this.removeClass(showClass);
                        $this.find($dropdownToggle).attr("aria-expanded", "false");
                        $this.find($dropdownMenu).removeClass(showClass);
                    }
                );
            } else {
                $dropdown.off("mouseenter mouseleave");
            }
        });

        // Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        $('.back-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        });

        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('.sticky-top').css('top', '0px');
            } else {
                $('.sticky-top').css('top', '-100px');
            }
        });

        // Header carousel
        $(".header-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            items: 1,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ]
        });


        // Testimonials carousel
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: true,
            margin: 24,
            dots: true,
            loop: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4   // Desktop hiển thị 4 hình
                }
            }
        });
    }
    $(function () {
        // Load spinner + menu, xong rồi mới init UI
        loadPartials().then(() => {
            initUI();
            setActiveMenu();
        });
    });
})(jQuery);


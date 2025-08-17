import Swiper from "swiper";
import { Navigation } from "swiper/modules";

(() => {

    const newsSwiper = new Swiper('.news__items', {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: document.querySelector('.news .navigation-button_next'),
            prevEl: document.querySelector('.news .navigation-button_prev'),
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            960: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }
    });
})();

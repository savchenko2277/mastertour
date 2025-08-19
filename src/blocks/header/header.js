import scrollLock from 'scroll-lock';

(() => {

    const header = document.querySelector('.header');
    const headerBurger = header.querySelector('.header__burger');
    const headerMenu = header.querySelector('.header__menu');

    headerBurger.addEventListener('click', () => {
        headerMenu.classList.toggle('active');
        headerBurger.classList.toggle('active');

        if(headerMenu.classList.contains('active')) {
            scrollLock.disablePageScroll();
        } else {
            scrollLock.enablePageScroll();
        }
    });

    window.addEventListener('scroll', () => {
        header.classList.toggle('is-scroll', window.scrollY > 0);
    });

})();

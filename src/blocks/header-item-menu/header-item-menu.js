export const headerNav = (props = {}) => {
    class Tabs {
        constructor(props) {
            this.props = {
                cls: 'active',
                events: 'click',
                ...props
            }

            this.container = (this.props.container instanceof Element)
                ? this.props.container
                : document.querySelector(this.props.container);

            this.controls = (this.props.controls instanceof NodeList)
                ? this.props.controls
                : this.container.querySelectorAll(this.props.controls);

            this.selects = (this.props.selects instanceof NodeList)
                ? [...[this.props.selects]]
                : [this.props.selects].flat().map(set => this.container.querySelectorAll(set));

            this.currentActive = [...this.controls].findIndex(ctrl => ctrl.classList.contains(this.props.cls));
            this.events = this.props.events.split(',').map(ev => ev.trim());

            this.init();
        }

        #setActive = (i, e) => {
            e && this.props.onClick?.call(this, i);

            if (!this.controls[i].classList.contains(this.props.cls)) {
                this.close();
                this.controls[i].classList.add(this.props.cls);

                this.selects.map(set => {
                    set[i].classList.add(this.props.cls);

                    this.props.onTab?.call(this, set, i);
                });
            }

            this.props.onTick?.call(this, i);
        }

        close = () => this.controls.forEach((button, i) => {
            button.classList.remove(this.props.cls);
            this.selects.map(set => set[i].classList.remove(this.props.cls));
        });

        move = (direction = 1) => {
            this.currentActive += direction;

            if (this.currentActive >= this.controls.length) {
                this.currentActive = 0;
            } else if (this.currentActive < 0) {
                this.currentActive = this.controls.length - 1;
            }

            this.#setActive(this.currentActive);
        }

        init() {
            for (const [i, set] of this.selects.entries()) {
                if (this.controls.length !== set.length) {
                    console.error(
                        `Tabs warning: Controls count (${this.controls.length}) ` +
                        `doesn't match targets set #${i} count (${set.length})`
                    );
                    return;
                }
            }

            this.controls.forEach((button, i) => {
                this.events.forEach(event => {
                    button.addEventListener(event, (e) => this.#setActive(i, e));
                });
            });

            this.props.onInit?.call(this);
        }
    }

    return new Tabs(props);
}

(() => {

    const tabs = headerNav({
        container: '.header-item-menu',
        controls: '.header-item-menu__btn',
        selects: ['.header-item-menu__tab'],
        cls: 'active',
        events: 'mouseenter, click',
        onInit() {

        },
        onClick(i) {

        },
        onTab(set, i) {

        },
        onTick(i) {

        },
    });

    const header = document.querySelector('.header');
    const headerMenu = header.querySelector('.header__menu');
    const headerBurger = header.querySelector('.header__burger');
    const headerItemsMenu = document.querySelectorAll('.header-item-menu');

    const isMobile = () => window.matchMedia('(max-width: 1440px)').matches;

    header.querySelectorAll('.header__list-item[data-menu-open]').forEach(item => {
        const menuClass = item.getAttribute('data-menu-open');
        const menu = document.querySelector(`.${menuClass}`);
        if (!menu) return;

        item.addEventListener('mouseenter', () => {
            if (isMobile()) return;
            closeAllMenus();
            menu.classList.add('active');
        });

        item.addEventListener('mouseleave', (e) => {
            if (isMobile()) return;
            const related = e.relatedTarget;
            if (!menu.contains(related)) {
                menu.classList.remove('active');
            }
        });

        menu.addEventListener('mouseleave', (e) => {
            if (isMobile()) return;
            const related = e.relatedTarget;
            if (!item.contains(related)) {
                menu.classList.remove('active');
            }
        });
    });

    header.querySelectorAll('.header__list-item[data-menu-open]').forEach(item => {
        const btn = item.querySelector('.header__arrow');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!isMobile()) return;

            closeAllMenus();

            const menuClass = item.getAttribute('data-menu-open');
            const menu = document.querySelector(`.${menuClass}`);
            menu?.classList.add('active');
            console.log('открыли');
        });
    });

    document.addEventListener('click', (e) => {
        if (!isMobile()) return;
        if (e.target.closest('.header__list-item')) return;
        if (e.target.closest('.header-item-menu')) return;
        closeAllMenus();
        console.log('закрыли');
    });

    function closeAllMenus() {
        headerItemsMenu.forEach(menu => menu.classList.remove('active'));
    }

    headerItemsMenu.forEach(menu => {
        const closeBtn = menu.querySelector('.header-item-menu__close');
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', (e) => {
        const openMenu = document.querySelector('.header-item-menu.active');
        if (openMenu && !openMenu.contains(e.target)) {
            openMenu.classList.remove('active');
            console.log('закрыли');
        }
    });

    // ПК: открытие по наведению
    if (window.innerWidth > 1440) {
        document.querySelectorAll('.header__list-item').forEach(item => {
            const menuClass = item.getAttribute('data-menu-open');
            if (!menuClass) return;
            const targetMenu = document.querySelector(`.${menuClass}`);

            item.addEventListener('mouseenter', () => {
                headerItemsMenu.forEach(menu => menu.classList.remove('active'));
                if (targetMenu) targetMenu.classList.add('active');
            });

            item.addEventListener('mouseleave', (e) => {
                if (targetMenu && !targetMenu.contains(e.relatedTarget)) {
                    targetMenu.classList.remove('active');
                }
            });

            if (targetMenu) {
                targetMenu.addEventListener('mouseleave', () => {
                    targetMenu.classList.remove('active');
                });
            }
        });
    }

    // Мобилка: клик по кнопке (ссылка работает отдельно)
    document.querySelectorAll('.header__list-item').forEach(item => {
        const btn = item.querySelector('.header__arrow');
        const link = item.querySelector('.header-item-menu__btn');
        if (!btn || !link) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            headerItemsMenu.forEach(menu => menu.classList.remove('active'));
            headerBurger.classList.remove('active');

            const menuClass = item.getAttribute('data-menu-open');
            const targetMenu = document.querySelector(`.${menuClass}`);

            if (targetMenu) {
                targetMenu.classList.add('active');
                console.log('открыли');
            }
        });

        link.addEventListener('click', (e) => {
            if (e.target.closest('.header__arrow')) {
                e.preventDefault(); // клик по кнопке — блокируем переход
            } else {
                console.log('переход по ссылке', link.href);
            }
        });
    });

    // ============== Аккордеон ==============

    const buildHeaderMenuAccordeon = (headerMenuEl) => {
        if (!headerMenuEl) return null;

        const topBtns = headerMenuEl.querySelectorAll('.header-item-menu__top .header-item-menu__btn');
        const tabs = headerMenuEl.querySelectorAll('.header-item-menu__tabs .header-item-menu__tab');

        if (!topBtns.length || !tabs.length) return null;

        const accordeon = document.createElement('div');
        accordeon.classList.add('header-item-menu__accordeon');

        topBtns.forEach((btn, index) => {
            const item = document.createElement('div');
            item.classList.add('header-item-menu__accordeon-item');

            const header = document.createElement('div');
            header.classList.add('header-item-menu__accordeon-header');
            header.appendChild(btn.cloneNode(true));

            const content = document.createElement('div');
            content.classList.add('header-item-menu__accordeon-content');
            if (tabs[index]) {
                content.appendChild(tabs[index].cloneNode(true));
            }

            item.appendChild(header);
            item.appendChild(content);
            accordeon.appendChild(item);
        });

        accordeon.addEventListener('click', (e) => {
            const arrow = e.target.closest('.header__arrow');
            if (!arrow) return; // если кликнули не по кнопке - не трогаем аккордеон

            e.preventDefault(); // блокируем переход по ссылке у кнопки
            e.stopPropagation();

            const header = arrow.closest('.header-item-menu__accordeon-header');
            if (!header) return;

            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            accordeon.querySelectorAll('.header-item-menu__accordeon-item').forEach(el => {
                el.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });


        return accordeon;
    };

    const initResponsiveHeaderMenu = () => {
        const menus = document.querySelectorAll('.header-item-menu');

        menus.forEach(menu => {
            if (window.innerWidth <= 1440) {
                if (!menu.querySelector('.header-item-menu__accordeon')) {
                    const accordeon = buildHeaderMenuAccordeon(menu);
                    if (accordeon) {
                        menu.appendChild(accordeon);
                    }
                }
            } else {
                const acc = menu.querySelector('.header-item-menu__accordeon');
                if (acc) acc.remove();
            }
        });
    };

    window.addEventListener('resize', initResponsiveHeaderMenu);
    document.addEventListener('DOMContentLoaded', initResponsiveHeaderMenu);



})();

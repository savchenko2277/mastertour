import { throttle } from "./libs/utils";
import JustValidate from 'just-validate';
import Inputmask from "inputmask";
// import { driveAdaptive } from "./libs/driveAdaptive.js";
import "./polyfills.js";
import "./blocks.js";

/* Тут можно писать код общий для всего проекта и требующий единого пространства имен */

// Ширина скроллбара
document.documentElement.style.setProperty('--sw', `${window.innerWidth - document.documentElement.clientWidth}px`);

// Единицы высоты (ширины) экрана
function updateVH() {
    const { height = window.innerHeight, width = window.innerWidth } = window.visualViewport || {};
    document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);
    // document.documentElement.style.setProperty('--vw', `${width * 0.01}px`);
}

['resize', 'orientationchange'].forEach(event => {
    window.addEventListener(event, throttle(updateVH, 200), { passive: true });
});

updateVH();

// Динамический адаптив
/* new driveAdaptive({
    type: 'max',
    className: 'moved',
    aliases: {
        xxxs: 360,
        xxs: 480,
        xs: 640,
        sm: 780,
        md: 960,
        lg: 1100,
        xlg: 1280,
        xxlg: 1440,
        xxxlg: 1680,
        xxxxlg: 1920
    }
}); */

const resizeElements = () => {
    const items = document.querySelectorAll('[data-resize]');
    let resizeTimer;

    window.addEventListener('resize', () => {
        items.forEach(item => {
            item.classList.add('resize');
        });

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            items.forEach(item => {
                item.classList.remove('resize');
            });
        }, 150);
    });
}

resizeElements();

const validation = new JustValidate('#form-callback');

validation
  .addField('[name="tel"]', [
    {
      rule: 'required',
      errorMessage: '#',
    },
    {
      rule: 'minLength',
      value: 18,
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: '#',
    },
]);

document.querySelectorAll("input[type='tel']").forEach(input => {
    Inputmask({
        mask: "+7 (999) 999-99-99",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true,
        jitMasking: true
    }).mask(input);
});
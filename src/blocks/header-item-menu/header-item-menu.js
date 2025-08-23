import { driveTabs } from "../../js/libs/driveTabs";

(() => {

    const tabs = driveTabs({
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

})();

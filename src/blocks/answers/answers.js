(() => {

    const section = document.querySelector('.answers');
    if(!section) return;
    const container = section?.querySelector('.answers__items');
    const items = section.querySelectorAll('.answers-item');

    items.forEach(item => {
        const itemTitle = item.querySelector('.answers-item__title');
        itemTitle.addEventListener('click', () => {
            items.forEach(item => item.classList.remove('active'));
            item.classList.toggle('active');
        })
    });

})();

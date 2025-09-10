(() => {

    const buttonsEvents = () => {
        document.querySelectorAll('[data-modal-open]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelector(btn.getAttribute('data-modal-open')).classList.add('active');
            });
        });
    };

    document.querySelectorAll(".modal__close").forEach(item => {
        item.addEventListener('click', () => {
            item.closest('.modal').classList.remove('active');
        });
    });

    document.querySelectorAll(".modal").forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.modal__content')) {
                item.classList.remove('active');
            }
        });
    })

    buttonsEvents();

    document.querySelectorAll('[data-set-type]').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.modal').querySelector('[name="typetour"]').value = item.getAttribute('data-set-type');
        });
    });

})();

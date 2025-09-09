(() => {

    document.addEventListener('DOMContentLoaded', () => {
        const cookiesBlock = document.querySelector(".cookies");
        const acceptBtn = document.querySelector(".cookies__button.btn-blue");
        const declineBtn = document.querySelector(".cookies__button.btn-border");

        const cookieChoice = localStorage.getItem("cookiesChoice");
        if (!cookieChoice) {
            cookiesBlock.classList.add("active");
        }

        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("cookiesChoice", "accepted");
            cookiesBlock.classList.remove("active");
        });

        declineBtn.addEventListener("click", () => {
            localStorage.setItem("cookiesChoice", "declined");
            cookiesBlock.classList.remove("active");
        });
    });

})();

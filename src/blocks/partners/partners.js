(() => {
    class RunningLine {
        constructor(container, options) {
            this.container = container;
            this.options = options || {};
            
            const duration = parseFloat(this.options.speed || container.dataset.speed) || 15;

            this.scrolls = [...container.querySelectorAll('.partners__scroll')];
            this.scrollWidth = this.scrolls[0].scrollWidth;

            this.speed = this.scrollWidth / duration;

            this.position = 0;
            this.currentSpeed = this.speed;

            this.lastTime = performance.now();

            this.initEvents();
            this.animate();
        }

        initEvents() {
            this.container.addEventListener("mouseenter", () => this.slowDown());
            this.container.addEventListener("mouseleave", () => this.speedUp());
        }

        slowDown() {
            this.stopAccel();
            this.accel = setInterval(() => {
                this.currentSpeed = Math.max(0, this.currentSpeed - this.speed * 0.05);
                if (this.currentSpeed <= 0) {
                    this.currentSpeed = 0;
                    this.stopAccel();
                }
            }, 50);
        }

        speedUp() {
            this.stopAccel();
            this.accel = setInterval(() => {
                this.currentSpeed = Math.min(this.speed, this.currentSpeed + this.speed * 0.05);
                if (this.currentSpeed >= this.speed) {
                    this.currentSpeed = this.speed;
                    this.stopAccel();
                }
            }, 50);
        }

        stopAccel() {
            if (this.accel) {
                clearInterval(this.accel);
                this.accel = null;
            }
        }

        animate() {
            const now = performance.now();
            const delta = (now - this.lastTime) / 1000;
            this.lastTime = now;

            this.position -= this.currentSpeed * delta;

            if (Math.abs(this.position) >= this.scrollWidth) {
                this.position = 0;
            }

            this.scrolls.forEach(scroll => {
                scroll.style.transform = `translateX(${this.position}px)`;
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    document.querySelectorAll('.partners__running-line').forEach(container => {
        new RunningLine(container, {});
    });
})();

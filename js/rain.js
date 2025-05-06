class RainEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.canvas.className = 'rain-canvas';
        this.raindrops = [];
        this.lastTime = 0;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
        this.init();
    }

    init() {
        this.resize();
        this.createRaindrops();
        this.animate();
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        this.resize();
        this.createRaindrops();
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.scale(dpr, dpr);
    }

    createRaindrops() {
        const density = window.innerWidth < 768 ? 0.15 : 0.25;
        const numberOfDrops = Math.floor(window.innerWidth * density);
        this.raindrops = [];

        for (let i = 0; i < numberOfDrops; i++) {
            this.raindrops.push(this.createDrop());
        }
    }

    createDrop() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 15 + 14,
            thickness: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.2 + 0.3
        };
    }

    animate(currentTime) {
        requestAnimationFrame(this.animate.bind(this));

        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.ctx.lineCap = 'round';

        for (let i = 0; i < this.raindrops.length; i++) {
            const drop = this.raindrops[i];
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`;
            this.ctx.lineWidth = drop.thickness;
            
            // Add slight angle to rain
            const angle = Math.PI / 16;
            const endX = drop.x + Math.sin(angle) * drop.length;
            const endY = drop.y + Math.cos(angle) * drop.length;
            
            this.ctx.moveTo(drop.x, drop.y);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();

            drop.y += drop.speed;
            drop.x += drop.speed * Math.sin(angle);

            if (drop.y > window.innerHeight) {
                Object.assign(drop, this.createDrop());
                drop.y = -drop.length;
            }
        }
    }

    getCanvas() {
        return this.canvas;
    }
}

// Export for use in main app
window.RainEffect = RainEffect;

// Interactive cursor effects
export class CursorEffects {
    constructor() {
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        // Create cursor trail container
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        this.canvas.style.mixBlendMode = 'screen';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        // Track mouse movement
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        window.addEventListener('resize', () => this.resize());

        // Start animation loop
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.createParticle(e.clientX, e.clientY);
    }

    handleTouchMove(e) {
        const touch = e.touches[0];
        this.mouseX = touch.clientX;
        this.mouseY = touch.clientY;
        this.createParticle(touch.clientX, touch.clientY);
    }

    createParticle(x, y) {
        const colors = ['#ff00ff', '#00ffff', '#ffff00'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        this.particles.push({
            x: x,
            y: y,
            size: Math.random() * 8 + 4,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            life: 1,
            color: color
        });

        // Limit particle count
        if (this.particles.length > 50) {
            this.particles.shift();
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Clear with fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 0.02;
            p.size *= 0.97;

            // Remove dead particles
            if (p.life <= 0 || p.size < 0.5) {
                this.particles.splice(i, 1);
                continue;
            }

            // Draw particle with glow
            this.ctx.save();
            this.ctx.globalAlpha = p.life;

            // Outer glow
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            this.ctx.fill();

            // Inner bright core
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        }

        // Draw cursor ring
        if (this.mouseX > 0 && this.mouseY > 0) {
            this.ctx.save();
            this.ctx.strokeStyle = '#00ffff';
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = 0.5;
            this.ctx.beginPath();
            this.ctx.arc(this.mouseX, this.mouseY, 20, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }

    getMousePosition() {
        return { x: this.mouseX, y: this.mouseY };
    }
}

// Interactive 3D scene that responds to mouse
export function makeSceneInteractive(scene3D, cursorEffects) {
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    function update() {
        const mouse = cursorEffects.getMousePosition();

        // Calculate rotation based on mouse position
        if (mouse.x > 0 && mouse.y > 0) {
            targetRotationX = ((mouse.y / window.innerHeight) - 0.5) * 0.5;
            targetRotationY = ((mouse.x / window.innerWidth) - 0.5) * 0.5;
        }

        // Smooth interpolation
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        // Apply rotation to scene
        if (scene3D.scene) {
            scene3D.scene.rotation.x = currentRotationX;
            scene3D.scene.rotation.y = currentRotationY;
        }

        requestAnimationFrame(update);
    }

    update();
}

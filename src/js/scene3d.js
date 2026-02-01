import * as THREE from 'three';

export class Scene3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 30;

        // Create particles
        this.createParticles();

        // Create animated shapes
        this.createShapes();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Start animation
        this.animate();
    }

    createParticles() {
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100;

            // Random colors (purple, cyan, yellow)
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i] = 1; colors[i + 1] = 0; colors[i + 2] = 1; // Magenta
            } else if (colorChoice < 0.66) {
                colors[i] = 0; colors[i + 1] = 1; colors[i + 2] = 1; // Cyan
            } else {
                colors[i] = 1; colors[i + 1] = 1; colors[i + 2] = 0; // Yellow
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createShapes() {
        this.shapes = [];

        // Create glowing torus
        const torusGeometry = new THREE.TorusGeometry(5, 1, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(-15, 5, -20);
        this.scene.add(torus);
        this.shapes.push(torus);

        // Create glowing rings
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.RingGeometry(3 + i * 2, 3.5 + i * 2, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x00ffff : 0xffff00,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.2
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.set(15, -5 + i * 3, -25);
            ring.rotation.x = Math.PI / 4;
            this.scene.add(ring);
            this.shapes.push(ring);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.y += 0.001;
            this.particles.rotation.x += 0.0005;
        }

        // Animate shapes
        this.shapes.forEach((shape, index) => {
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.005 * (index + 1);
        });

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    destroy() {
        window.removeEventListener('resize', () => this.onResize());
        if (this.container && this.renderer.domElement) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}

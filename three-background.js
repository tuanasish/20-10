// Three.js 3D Background for Luxury Romantic Theme
class ThreeBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.hearts = [];
        this.petals = [];
        this.animationId = null;
        this.isInitialized = false;
        
        // Performance settings
        this.isLowEndDevice = this.detectLowEndDevice();
        this.particleCount = this.isLowEndDevice ? 20 : 50;
        
        this.init();
    }
    
    detectLowEndDevice() {
        // Simple device detection based on hardware concurrency and memory
        const cores = navigator.hardwareConcurrency || 2;
        const memory = navigator.deviceMemory || 4;
        return cores <= 2 || memory <= 2;
    }
    
    init() {
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded, skipping 3D background');
            return;
        }
        
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLights();
        this.createHearts();
        this.createPetals();
        this.animate();
        this.handleResize();
        
        this.isInitialized = true;
    }
    
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x120005, 50, 200);
    }
    
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 30;
    }
    
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: !this.isLowEndDevice 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // Add to background container
        const backgroundContainer = document.getElementById('three-background');
        if (backgroundContainer) {
            backgroundContainer.appendChild(this.renderer.domElement);
        } else {
            // Create container if it doesn't exist
            const container = document.createElement('div');
            container.id = 'three-background';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '-1';
            container.style.pointerEvents = 'none';
            document.body.appendChild(container);
            container.appendChild(this.renderer.domElement);
        }
    }
    
    createLights() {
        // Ambient light for soft overall illumination
        const ambientLight = new THREE.AmbientLight(0xE8B4BC, 0.3);
        this.scene.add(ambientLight);
        
        // Point light for warm romantic glow
        const pointLight = new THREE.PointLight(0xD4AF37, 0.8, 100);
        pointLight.position.set(0, 0, 20);
        this.scene.add(pointLight);
        
        // Directional light for subtle shadows
        const directionalLight = new THREE.DirectionalLight(0xA8324E, 0.2);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);
    }
    
    createHearts() {
        const heartGeometry = this.createHeartGeometry();
        const heartMaterial = new THREE.MeshLambertMaterial({
            color: 0xA8324E,
            transparent: true,
            opacity: 0.6
        });
        
        for (let i = 0; i < this.particleCount; i++) {
            const heart = new THREE.Mesh(heartGeometry, heartMaterial);
            
            // Random position
            heart.position.x = (Math.random() - 0.5) * 100;
            heart.position.y = (Math.random() - 0.5) * 100;
            heart.position.z = (Math.random() - 0.5) * 100;
            
            // Random scale
            const scale = Math.random() * 0.5 + 0.3;
            heart.scale.set(scale, scale, scale);
            
            // Random rotation
            heart.rotation.x = Math.random() * Math.PI;
            heart.rotation.y = Math.random() * Math.PI;
            heart.rotation.z = Math.random() * Math.PI;
            
            this.hearts.push(heart);
            this.scene.add(heart);
        }
    }
    
    createPetals() {
        const petalGeometry = new THREE.PlaneGeometry(1, 2);
        const petalMaterial = new THREE.MeshLambertMaterial({
            color: 0xE8B4BC,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        
        for (let i = 0; i < this.particleCount / 2; i++) {
            const petal = new THREE.Mesh(petalGeometry, petalMaterial);
            
            // Random position
            petal.position.x = (Math.random() - 0.5) * 120;
            petal.position.y = (Math.random() - 0.5) * 120;
            petal.position.z = (Math.random() - 0.5) * 120;
            
            // Random scale
            const scale = Math.random() * 0.8 + 0.4;
            petal.scale.set(scale, scale, scale);
            
            // Random rotation
            petal.rotation.x = Math.random() * Math.PI;
            petal.rotation.y = Math.random() * Math.PI;
            petal.rotation.z = Math.random() * Math.PI;
            
            this.petals.push(petal);
            this.scene.add(petal);
        }
    }
    
    createHeartGeometry() {
        const shape = new THREE.Shape();
        const x = 0, y = 0;
        
        shape.moveTo(x + 5, y + 5);
        shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
        shape.bezierCurveTo(x - 6, y, x - 6, y + 3.5, x - 6, y + 3.5);
        shape.bezierCurveTo(x - 6, y + 5.5, x - 4, y + 7.7, x, y + 10);
        shape.bezierCurveTo(x + 4, y + 7.7, x + 6, y + 5.5, x + 6, y + 3.5);
        shape.bezierCurveTo(x + 6, y + 3.5, x + 6, y, x, y);
        shape.bezierCurveTo(x + 4, y, x + 5, y + 5, x + 5, y + 5);
        
        const extrudeSettings = {
            depth: 0.5,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 0.1,
            bevelThickness: 0.1
        };
        
        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        if (!this.isInitialized) return;
        
        const time = Date.now() * 0.001;
        
        // Animate hearts
        this.hearts.forEach((heart, index) => {
            heart.rotation.x += 0.01;
            heart.rotation.y += 0.005;
            heart.rotation.z += 0.008;
            
            // Floating motion
            heart.position.y += Math.sin(time + index) * 0.02;
            heart.position.x += Math.cos(time + index * 0.5) * 0.01;
        });
        
        // Animate petals
        this.petals.forEach((petal, index) => {
            petal.rotation.x += 0.02;
            petal.rotation.z += 0.01;
            
            // Gentle floating
            petal.position.y += Math.sin(time * 0.5 + index) * 0.03;
            petal.position.x += Math.cos(time * 0.3 + index) * 0.015;
        });
        
        // Slow camera rotation
        this.camera.position.x = Math.cos(time * 0.1) * 5;
        this.camera.position.y = Math.sin(time * 0.1) * 5;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            if (!this.isInitialized) return;
            
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // Remove from DOM
        const container = document.getElementById('three-background');
        if (container) {
            container.remove();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on desktop and if Three.js is available
    if (window.innerWidth > 768 && typeof THREE !== 'undefined') {
        window.threeBackground = new ThreeBackground();
    }
});

// Export for use in other scripts
window.ThreeBackground = ThreeBackground;

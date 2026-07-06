import React, { useRef, useEffect, useMemo } from "react";
import {
    Clock, PerspectiveCamera, Scene, WebGLRenderer, SRGBColorSpace, MathUtils,
    Vector2, Vector3, MeshPhysicalMaterial, Color, Object3D, InstancedMesh,
    PMREMGenerator, SphereGeometry, AmbientLight, PointLight, ACESFilmicToneMapping,
    Raycaster, Plane
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { cn } from "@/src/lib/utils";

// --- Three.js Boilerplate Class (X) ---
class X {
    #config: any;
    #resizeObserver?: ResizeObserver;
    #intersectionObserver?: IntersectionObserver;
    #resizeTimer?: number;
    #animationFrameId: number = 0;
    #clock: Clock = new Clock();
    #animationState = { elapsed: 0, delta: 0 };
    #isAnimating: boolean = false;
    #isVisible: boolean = false;
    canvas: HTMLCanvasElement;
    camera: PerspectiveCamera;
    scene: Scene;
    renderer: WebGLRenderer;
    size: any = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
    onBeforeRender: (state: { elapsed: number; delta: number }) => void = () => {};
    onAfterResize: (size: any) => void = () => {};

    constructor(config: any) {
        this.#config = config;
        this.canvas = this.#config.canvas;
        this.camera = new PerspectiveCamera(50, 1, 0.1, 100);
        this.scene = new Scene();
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            powerPreference: "default",
            alpha: true,
            antialias: window.innerWidth > 768,
            ...this.#config.rendererOptions,
        });
        this.renderer.outputColorSpace = SRGBColorSpace;
        this.canvas.style.display = "block";
        this.#initObservers();
        this.resize();
    }
    #initObservers() {
        const parentEl = this.#config.size === "parent" ? this.canvas.parentNode as Element : null;
        if(parentEl) {
            this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this));
            this.#resizeObserver.observe(parentEl);
        } else {
            window.addEventListener("resize", this.#onResize.bind(this));
        }
        this.#intersectionObserver = new IntersectionObserver(this.#onIntersection.bind(this), { threshold: 0 });
        this.#intersectionObserver.observe(this.canvas);
        document.addEventListener("visibilitychange", this.#onVisibilityChange.bind(this));
    }
    #onResize() { if (this.#resizeTimer) clearTimeout(this.#resizeTimer); this.#resizeTimer = window.setTimeout(this.resize.bind(this), 100); }
    resize() {
        const parentEl = this.#config.size === "parent" ? this.canvas.parentNode as HTMLElement : null;
        const w = parentEl ? parentEl.offsetWidth : window.innerWidth;
        const h = parentEl ? parentEl.offsetHeight : window.innerHeight;
        this.size.width = w; this.size.height = h; this.size.ratio = w / h;
        this.camera.aspect = this.size.ratio; this.camera.updateProjectionMatrix();
        const fovRad = (this.camera.fov * Math.PI) / 180;
        this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.z; this.size.wWidth = this.size.wHeight * this.camera.aspect;
        this.renderer.setSize(w, h); this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        this.onAfterResize(this.size);
    }
    #onIntersection(e: any) { this.#isAnimating = e[0].isIntersecting; this.#isAnimating ? this.#startAnimation() : this.#stopAnimation(); }
    #onVisibilityChange() { if (this.#isAnimating) document.hidden ? this.#stopAnimation() : this.#startAnimation(); }
    #startAnimation() { if (this.#isVisible) return; this.#isVisible = true; this.#clock.start(); const f = () => { this.#animationFrameId = requestAnimationFrame(f); this.#animationState.delta = this.#clock.getDelta(); this.#animationState.elapsed += this.#animationState.delta; this.onBeforeRender(this.#animationState); this.renderer.render(this.scene, this.camera); }; f(); }
    #stopAnimation() { if (this.#isVisible) { cancelAnimationFrame(this.#animationFrameId); this.#isVisible = false; this.#clock.stop(); } }
    dispose() { this.#stopAnimation(); this.#resizeObserver?.disconnect(); this.#intersectionObserver?.disconnect(); window.removeEventListener("resize", this.#onResize.bind(this)); document.removeEventListener("visibilitychange", this.#onVisibilityChange.bind(this)); this.scene.clear(); this.renderer.dispose(); }
}

// Preallocated static Vector3 objects to prevent GC thrashing and reduce memory allocations inside the 60fps physics loop
const _pos = new Vector3();
const _vel = new Vector3();
const _otherPos = new Vector3();
const _diff = new Vector3();
const _headPos = new Vector3();

// --- Physics Engine Class (W) ---
class W {
    config: any;
    positionData: Float32Array;
    velocityData: Float32Array;
    sizeData: Float32Array;
    targetSizeData: Float32Array;
    center: Vector3 = new Vector3();

    #respawnTimer = 0;
    #respawnInterval = 30;
    constructor(config: any) {
        this.config = config;
        this.positionData = new Float32Array(3 * config.count);
        this.velocityData = new Float32Array(3 * config.count);
        this.sizeData = new Float32Array(config.count);
        this.targetSizeData = new Float32Array(config.count);
        this.#initializePositions(); this.setSizes();
        this.#respawnInterval = MathUtils.randFloat(30, 40);
    }
    #initializePositions() { 
        const { count, maxX, maxY, maxZ } = this.config; 
        this.center.toArray(this.positionData, 0); 
        for (let i = 1; i < count; i++) { 
            const idx = 3 * i; 
            this.positionData[idx] = MathUtils.randFloatSpread(2 * maxX); 
            // Bias towards the top (from middle to top)
            this.positionData[idx + 1] = MathUtils.randFloat(-0.2 * maxY, maxY); 
            this.positionData[idx + 2] = MathUtils.randFloatSpread(2 * maxZ); 
        } 
    }
    setSizes() { 
        const { count, size0, minSize, maxSize } = this.config; 
        this.sizeData[0] = size0; 
        this.targetSizeData[0] = size0;
        for (let i = 1; i < count; i++) {
            const s = MathUtils.randFloat(minSize, maxSize);
            this.sizeData[i] = s;
            this.targetSizeData[i] = s;
        }
    }
    update(deltaInfo: { delta: number }) {
        const { config, center, positionData, sizeData, velocityData } = this;
        const startIdx = config.controlSphere0 ? 1 : 0;
        
        // Continuous falling respawn logic (Rain effect)
        this.#respawnTimer += deltaInfo.delta;
        if (this.#respawnTimer > 1.5) { // Check more frequently
            this.#respawnTimer = 0;
            
            // Try to respawn multiple balls
            const countToRespawn = 3;
            let respawned = 0;
            
            for (let i = 1; i < config.count; i++) {
                if (respawned >= countToRespawn) break;
                
                const base = 3 * i;
                
                // Only respawn if ball is resting on the bottom or fell off-screen
                if (positionData[base + 1] < -config.maxY + 6) {
                    positionData[base] = MathUtils.randFloatSpread(2 * config.maxX);
                    // Scatter them high above so they fall slowly like rain
                    positionData[base + 1] = config.maxY + 10 + MathUtils.randFloat(0, 5);
                    positionData[base + 2] = MathUtils.randFloatSpread(2 * config.maxZ);
                    
                    velocityData[base] = 0;
                    velocityData[base + 1] = -MathUtils.randFloat(0.02, 0.05); // Slight initial downward velocity
                    velocityData[base + 2] = 0;
                    
                    // Reset size animation
                    sizeData[i] = 0.05;
                    respawned++;
                }
            }
        }

        if (config.controlSphere0) { 
            _headPos.fromArray(positionData, 0);
            _headPos.lerp(center, 0.1).toArray(positionData, 0); 
            _vel.set(0, 0, 0).toArray(velocityData, 0); 
        }
        for (let i = startIdx; i < config.count; i++) {
            const base = 3 * i;
            
            // Smoothly scale towards target size
            if (sizeData[i] < this.targetSizeData[i]) {
                sizeData[i] += deltaInfo.delta * 0.8; 
                if (sizeData[i] > this.targetSizeData[i]) sizeData[i] = this.targetSizeData[i];
            }

            _pos.fromArray(positionData, base); 
            _vel.fromArray(velocityData, base);
            _vel.y -= deltaInfo.delta * config.gravity * sizeData[i]; 
            _vel.multiplyScalar(config.friction); 
            _vel.clampLength(0, config.maxVelocity); 
            _pos.add(_vel);
            
            for (let j = 0; j < config.count; j++) { 
                if (i === j) continue;
                const otherBase = 3 * j; 
                _otherPos.fromArray(positionData, otherBase); 
                _diff.subVectors(_pos, _otherPos); 
                const dist = _diff.length(); 
                const sumRadius = sizeData[i] + sizeData[j]; 
                if (dist < sumRadius) { 
                    const overlap = (sumRadius - dist) * 0.5; 
                    _diff.normalize(); 
                    _pos.addScaledVector(_diff, overlap); 
                } 
            }
            if (Math.abs(_pos.x) + sizeData[i] > config.maxX) { _pos.x = Math.sign(_pos.x) * (config.maxX - sizeData[i]); _vel.x *= -config.wallBounce; }
            const floorY = -config.maxY + 3; // Raised floor
            
            if (config.pileUp) {
                if (_pos.y - sizeData[i] < floorY) { _pos.y = floorY + sizeData[i]; _vel.y *= -config.wallBounce; }
            } else {
                if (_pos.y < floorY - 20) {
                    _pos.y = config.maxY + 20;
                    _vel.y = 0;
                }
            }

            // Removed top wall bounce for "snowing" effect from above.
            // But we still want some limit if they go CRAZY high, though unlikely.
            if (_pos.y > config.maxY + 20) { _pos.y = config.maxY + 20; _vel.y = 0; }
            if (Math.abs(_pos.z) + sizeData[i] > config.maxZ) { _pos.z = Math.sign(_pos.z) * (config.maxZ - sizeData[i]); _vel.z *= -config.wallBounce; }
            _pos.toArray(positionData, base); _vel.toArray(velocityData, base);
        }
    }
}

// --- Instanced Spheres Class (Z) ---
const U = new Object3D();
class Z extends InstancedMesh {
    config: any;
    physics: W;
    ambientLight: AmbientLight;
    light: PointLight;
    constructor(renderer: WebGLRenderer, params: any) {
        const pmrem = new PMREMGenerator(renderer); const envTexture = pmrem.fromScene(new RoomEnvironment()).texture; pmrem.dispose();
        const geometry = new SphereGeometry(1, 24, 24);
        const material = new MeshPhysicalMaterial({ envMap: envTexture, ...params.materialParams });
        super(geometry, material, params.count);
        this.config = params; this.physics = new W(this.config);
        this.ambientLight = new AmbientLight(0xffffff, params.ambientIntensity); this.add(this.ambientLight);
        this.light = new PointLight(0xffffff, params.lightIntensity, 100, 1); this.add(this.light);
        this.setColors(this.config.colors);
    }
    setColors(colors: (string | Color)[]) {
        if (!Array.isArray(colors) || !colors.length) return;
        const colorObjs = colors.map(c => c instanceof Color ? c : new Color(c));
        for (let i = 0; i < this.count; i++) this.setColorAt(i, colorObjs[i % colorObjs.length]);
        if (this.instanceColor) this.instanceColor.needsUpdate = true;
    }
    update(deltaInfo: { delta: number }) {
        this.physics.update(deltaInfo);
        for (let i = 0; i < this.count; i++) {
            U.position.fromArray(this.physics.positionData, 3 * i);
            U.scale.setScalar(this.physics.sizeData[i]);
            U.updateMatrix();
            this.setMatrixAt(i, U.matrix);
        }
        this.instanceMatrix.needsUpdate = true;
        if (this.config.controlSphere0) this.light.position.fromArray(this.physics.positionData, 0);
    }
}

const pointer = new Vector2();
function onPointerMove(e: PointerEvent) {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
}

const defaultBallpitConfig = {
    count: 80,
    materialParams: { metalness: 0.8, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.1 },
    minSize: 1.2, maxSize: 1.8, size0: 1.8,
    gravity: 0.1, friction: 0.99, wallBounce: 0.6, maxVelocity: 0.15,
    maxX: 10, maxY: 10, maxZ: 10,
    controlSphere0: true, followCursor: true, pileUp: true,
    lightIntensity: 3, ambientIntensity: 1,
};

// Niya Brand Colors (Purple and subtle variations)
const niyaColors = ["#9333ea", "#7e22ce", "#a855f7", "#c084fc", "#6b21a8"];

export function InteractiveBallpit({ className, count, followCursor = true, pileUp = true, style }: { className?: string; count?: number; followCursor?: boolean; pileUp?: boolean; style?: React.CSSProperties }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const config = useMemo(() => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        return {
            ...defaultBallpitConfig,
            count: count ?? (isMobile ? 35 : 80), // Optimized subset of spheres to prevent calculation overload
            followCursor,
            controlSphere0: followCursor,
            pileUp,
            gravity: isMobile ? 0.03 : 0.1,
            maxVelocity: isMobile ? 0.08 : 0.15,
            minSize: isMobile ? 1.0 : 1.2,
            maxSize: isMobile ? 1.5 : 1.8,
            colors: niyaColors,
        };
    }, [count, followCursor, pileUp]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const three = new X({ canvas, size: "parent" });
        three.renderer.toneMapping = ACESFilmicToneMapping;
        three.camera.position.set(0, 0, 25);

        const spheres = new Z(three.renderer, config);
        three.scene.add(spheres);

        const raycaster = new Raycaster();
        const plane = new Plane(new Vector3(0, 0, 1), 0);
        const intersectionPoint = new Vector3();

        if (config.followCursor) {
            window.addEventListener("pointermove", onPointerMove);
        }

        three.onBeforeRender = (deltaInfo) => {
            if (config.followCursor) {
                raycaster.setFromCamera(pointer, three.camera);
                if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
                    spheres.physics.center.copy(intersectionPoint);
                }
            }
            spheres.update(deltaInfo);
        };
        
        three.onAfterResize = (size) => {
            spheres.physics.config.maxX = size.wWidth / 2;
            spheres.physics.config.maxY = size.wHeight / 2;
            spheres.physics.config.maxZ = size.wWidth / 4;
        };

        return () => {
            if (config.followCursor) {
                window.removeEventListener("pointermove", onPointerMove);
            }
            three.dispose();
        };
    }, [config]);

    return (
        <div className={cn("absolute inset-0 z-0 opacity-40 pointer-events-none", className)} style={style}>
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
}

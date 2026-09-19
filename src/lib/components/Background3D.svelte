<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let canvasEl: HTMLCanvasElement | undefined;

	onMount(() => {
		if (!canvasEl) return;

		const scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x121212, 12, 45);

		const camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.set(0, 0, 9);

		const renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance'
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, window.innerHeight);

		// === Main icosahedron (red wireframe) ===
		const mainGeo = new THREE.IcosahedronGeometry(2.6, 1);
		const mainMat = new THREE.MeshBasicMaterial({
			color: 0xe50914,
			wireframe: true,
			transparent: true,
			opacity: 0.35
		});
		const mainMesh = new THREE.Mesh(mainGeo, mainMat);
		scene.add(mainMesh);

		// === Outer dodecahedron (yellow, slow counter-rotation) ===
		const outerGeo = new THREE.DodecahedronGeometry(4.0, 0);
		const outerMat = new THREE.MeshBasicMaterial({
			color: 0xfcd116,
			wireframe: true,
			transparent: true,
			opacity: 0.12
		});
		const outerMesh = new THREE.Mesh(outerGeo, outerMat);
		scene.add(outerMesh);

		// === Torus knot accent ===
		const knotGeo = new THREE.TorusKnotGeometry(1.2, 0.015, 128, 16);
		const knotMat = new THREE.MeshBasicMaterial({
			color: 0xe50914,
			transparent: true,
			opacity: 0.45
		});
		const knot = new THREE.Mesh(knotGeo, knotMat);
		knot.rotation.x = Math.PI / 2;
		scene.add(knot);

		// === Particles ===
		const particleCount = 1200;
		const positions = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount);
		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 45;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 45;
			velocities[i] = Math.random() * 0.015 + 0.003;
		}
		const particleGeo = new THREE.BufferGeometry();
		particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		const particleMat = new THREE.PointsMaterial({
			color: 0xffffff,
			size: 0.025,
			transparent: true,
			opacity: 0.55,
			sizeAttenuation: true,
			depthWrite: false
		});
		const particles = new THREE.Points(particleGeo, particleMat);
		scene.add(particles);

		// === Orbiting cubes ===
		const orbiters: THREE.Mesh[] = [];
		const orbiterColors = [0xe50914, 0xfcd116, 0xffffff];
		for (let i = 0; i < 8; i++) {
			const geo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
			const mat = new THREE.MeshBasicMaterial({
				color: orbiterColors[i % orbiterColors.length],
				transparent: true,
				opacity: 0.7
			});
			const mesh = new THREE.Mesh(geo, mat);
			mesh.userData = {
				angle: (i / 8) * Math.PI * 2,
				radius: 4.2 + Math.random() * 1.6,
				speed: 0.15 + Math.random() * 0.25,
				yOffset: (Math.random() - 0.5) * 3.5
			};
			scene.add(mesh);
			orbiters.push(mesh);
		}

		// === Interaction state ===
		let mouseX = 0;
		let mouseY = 0;
		let targetX = 0;
		let targetY = 0;
		let scrollY = 0;

		const onMouseMove = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth) * 2 - 1;
			mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
		};
		const onScroll = () => {
			scrollY = window.scrollY;
		};
		const onResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);

		// === Animation loop ===
		const clock = new THREE.Clock();
		let frameId = 0;

		const animate = () => {
			frameId = requestAnimationFrame(animate);
			const t = clock.getElapsedTime();

			mainMesh.rotation.x = t * 0.15;
			mainMesh.rotation.y = t * 0.2;

			outerMesh.rotation.x = -t * 0.07;
			outerMesh.rotation.y = -t * 0.11;
			outerMesh.rotation.z = t * 0.04;

			knot.rotation.z = t * 0.35;
			knot.rotation.y = t * 0.12;

			particles.rotation.y = t * 0.02;
			particles.rotation.x = t * 0.008;

			// Particle drift
			const posAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute;
			const arr = posAttr.array as Float32Array;
			for (let i = 0; i < particleCount; i++) {
				arr[i * 3 + 1] += velocities[i];
				if (arr[i * 3 + 1] > 22) arr[i * 3 + 1] = -22;
			}
			posAttr.needsUpdate = true;

			// Orbiting cubes
			orbiters.forEach((orb, i) => {
				const d = orb.userData;
				d.angle += d.speed * 0.01;
				orb.position.x = Math.cos(d.angle) * d.radius;
				orb.position.z = Math.sin(d.angle) * d.radius;
				orb.position.y = d.yOffset + Math.sin(t * 0.8 + i) * 0.6;
				orb.rotation.x = t * 0.5 + i;
				orb.rotation.y = t * 0.7 + i;
			});

			// Camera parallax
			targetX = mouseX * 0.9;
			targetY = mouseY * 0.9 - scrollY * 0.0015;
			camera.position.x += (targetX - camera.position.x) * 0.05;
			camera.position.y += (targetY - camera.position.y) * 0.05;
			camera.lookAt(0, 0, 0);

			renderer.render(scene, camera);
		};
		animate();

		return () => {
			cancelAnimationFrame(frameId);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);

			mainGeo.dispose();
			mainMat.dispose();
			outerGeo.dispose();
			outerMat.dispose();
			knotGeo.dispose();
			knotMat.dispose();
			particleGeo.dispose();
			particleMat.dispose();
			orbiters.forEach((o) => {
				o.geometry.dispose();
				(o.material as THREE.Material).dispose();
			});
			renderer.dispose();
		};
	});
</script>

<canvas
	bind:this={canvasEl}
	class="pointer-events-none fixed inset-0 h-full w-full"
	style="z-index: 0;"
	aria-hidden="true"
></canvas>

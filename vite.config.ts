import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit()
	],
	build: {
		// Важно: заставляет Vite инлайнить все ассеты (шрифты, картинки, wasm и т.п.)
		assetsInlineLimit: Infinity,
		// Убираем предупреждение про чанки > 500 КБ (Three.js большой, это нормально)
		chunkSizeWarningLimit: 2000
	}
});

<script lang="ts">
	import Background3D from '$lib/components/Background3D.svelte';
	import { translations, LANGS, type Lang } from '$lib/i18n';

	let lang = $state<Lang>('ru');

	function t(key: string): string {
		return translations[lang]?.[key] ?? key;
	}

	$effect(() => {
		document.documentElement.setAttribute('lang', lang);
	});
</script>

<Background3D />

<div class="bg-grid relative z-10 min-h-screen">
	<!-- HEADER -->
	<header class="bg-cdp-dark/85 sticky top-0 z-50 border-b border-gray-800 backdrop-blur">
		<div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
			<div class="flex items-center space-x-3">
				<div class="bg-cdp-red cyber-clip px-3 py-1 text-xl font-black tracking-wider text-white">
					SOSHIMI
				</div>
			</div>

			<div class="flex items-center space-x-6">
				<nav class="hidden space-x-8 text-sm font-semibold tracking-wider uppercase md:flex">
					<a href="#about" class="hover:text-cdp-red transition-colors">{t('nav_about')}</a>
					<a href="#projects" class="hover:text-cdp-red transition-colors">{t('nav_projects')}</a>
					<a href="#contact" class="hover:text-cdp-red transition-colors">{t('nav_contact')}</a>
				</nav>

				<select
					bind:value={lang}
					class="bg-cdp-gray cursor-pointer rounded border border-gray-700 px-3 py-1.5 font-mono text-sm text-gray-200 uppercase focus:border-cdp-red focus:outline-none"
				>
					{#each LANGS as { code, label } (code)}
						<option value={code}>{label}</option>
					{/each}
				</select>
			</div>
		</div>
	</header>

	<!-- HERO -->
	<section class="relative overflow-hidden border-b border-gray-800 py-24 lg:py-36">
		<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="max-w-3xl">
				<h1
					class="mb-6 text-4xl leading-tight font-black tracking-tight break-words uppercase sm:text-7xl"
				>
					SOSHIMI <span class="text-cdp-red">GAMES</span>
				</h1>
				<p class="mb-10 text-base font-light text-gray-400 sm:text-xl">
					{t('hero_desc')}
				</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="#projects"
						class="bg-cdp-red cyber-btn px-8 py-4 text-center font-bold tracking-wider text-white uppercase transition-transform hover:-translate-y-0.5 hover:bg-red-700"
					>
						{t('hero_btn')}
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- ABOUT -->
	<section id="about" class="border-b border-gray-800 bg-black/50 py-20 backdrop-blur-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
				<div>
					<h2 class="text-cdp-red mb-2 font-mono text-xs tracking-widest uppercase">
						{t('about_subtitle')}
					</h2>
					<h3 class="mb-6 text-3xl font-extrabold uppercase sm:text-4xl">
						{t('about_title')}
					</h3>
					<p class="mb-6 leading-relaxed text-gray-400">{t('about_text1')}</p>
					<p class="mb-6 leading-relaxed text-gray-400">{t('about_text2')}</p>
				</div>
				<div class="bg-cdp-gray cyber-clip relative border border-gray-800 p-6 sm:p-8">
					<div class="mt-2 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
						<div
							class="flex flex-col items-center justify-center rounded border border-gray-800 bg-black/40 p-4"
						>
							<div class="text-cdp-red mb-1 text-3xl font-black">2026</div>
							<div class="text-[10px] tracking-wider text-gray-400 uppercase sm:text-xs">
								{t('stat_founded')}
							</div>
						</div>
						<div
							class="flex flex-col items-center justify-center rounded border border-gray-800 bg-black/40 p-4"
						>
							<div class="text-cdp-yellow mb-1 w-full truncate text-3xl font-black">
								{t('stat_location_val')}
							</div>
							<div class="text-[10px] tracking-wider text-gray-400 uppercase sm:text-xs">
								{t('stat_location')}
							</div>
						</div>
						<div
							class="flex flex-col items-center justify-center rounded border border-gray-800 bg-black/40 p-4"
						>
							<div class="mb-1 text-3xl font-black text-white">2</div>
							<div class="text-[10px] tracking-wider text-gray-400 uppercase sm:text-xs">
								{t('stat_projects')}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- PROJECTS -->
	<section id="projects" class="py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-16">
				<h2 class="text-cdp-red mb-2 font-mono text-xs tracking-widest uppercase">
					{t('projects_subtitle')}
				</h2>
				<h3 class="text-3xl font-black uppercase sm:text-5xl">{t('projects_title')}</h3>
			</div>

			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<!-- Project 1 -->
				<div
					class="bg-cdp-gray cyber-clip group flex flex-col justify-between overflow-hidden border border-gray-800 backdrop-blur-sm"
				>
					<div class="p-6 sm:p-8">
						<div class="mb-6 flex flex-wrap items-start justify-between gap-2">
							<span
								class="bg-cdp-red rounded px-3 py-1 font-mono text-xs font-bold text-white uppercase"
							>
								{t('proj1_badge')}
							</span>
							<span class="font-mono text-xs text-gray-500 sm:text-sm">PLUGIN / NEXT-GEN</span>
						</div>
						<h4
							class="group-hover:text-cdp-red mb-4 text-3xl font-black uppercase transition-colors"
						>
							ARKA ENGINE
						</h4>
						<p class="mb-6 leading-relaxed text-gray-400">{t('proj1_desc')}</p>
						<div class="flex flex-wrap gap-2">
							<span
								class="rounded border border-gray-700 bg-black/40 px-3 py-1 font-mono text-xs text-gray-300 uppercase"
							>
								{t('tag_plugin')}
							</span>
							<span
								class="rounded border border-gray-700 bg-black/40 px-3 py-1 font-mono text-xs text-gray-300 uppercase"
							>
								{t('tag_engine')}
							</span>
							<span
								class="rounded border border-gray-700 bg-black/40 px-3 py-1 font-mono text-xs text-gray-300 uppercase"
							>
								{t('tag_nextgen')}
							</span>
						</div>
					</div>
					<div
						class="flex flex-wrap items-center justify-between gap-2 border-t border-gray-800 bg-black/40 p-4 font-mono text-xs text-gray-500"
					>
						<span>{t('status_dev')}</span>
						<span class="text-cdp-red">#ARKA_ENGINE</span>
					</div>
				</div>

				<!-- Project 2 -->
				<div
					class="bg-cdp-gray cyber-clip group relative flex flex-col justify-between overflow-hidden border border-gray-800 backdrop-blur-sm"
				>
					<div
						class="from-cdp-red/5 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent"
					></div>
					<div class="relative z-10 p-6 sm:p-8">
						<div class="mb-6 flex flex-wrap items-start justify-between gap-2">
							<span
								class="text-cdp-yellow border-cdp-yellow/30 rounded border bg-gray-800 px-3 py-1 font-mono text-xs font-bold uppercase"
							>
								{t('proj2_badge')}
							</span>
							<span class="font-mono text-xs text-gray-500 sm:text-sm">TBA</span>
						</div>
						<h4
							class="group-hover:text-cdp-yellow mb-4 text-3xl font-black uppercase transition-colors"
						>
							{t('proj2_title')}
						</h4>
						<p class="mb-6 leading-relaxed text-gray-400">{t('proj2_desc')}</p>
						<div class="flex flex-wrap gap-2">
							<span
								class="rounded border border-gray-700 bg-black/40 px-3 py-1 font-mono text-xs text-gray-300 uppercase"
								>CLASSIFIED</span
							>
							<span
								class="rounded border border-gray-700 bg-black/40 px-3 py-1 font-mono text-xs text-gray-300 uppercase"
								>TOP SECRET</span
							>
						</div>
					</div>
					<div
						class="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-gray-800 bg-black/40 p-4 font-mono text-xs text-gray-500"
					>
						<span>{t('status_classified')}</span>
						<span class="text-cdp-yellow">#PROJECT_X</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CONTACT -->
	<section
		id="contact"
		class="border-t border-gray-800 bg-black/70 py-20 backdrop-blur-sm"
	>
		<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
			<h2 class="text-cdp-red mb-2 font-mono text-xs tracking-widest uppercase">
				{t('contact_subtitle')}
			</h2>
			<h3 class="mb-6 text-3xl font-black uppercase sm:text-4xl">{t('contact_title')}</h3>
			<p class="mx-auto mb-8 max-w-xl text-gray-400">{t('contact_desc')}</p>
			<div
				class="bg-cdp-gray cyber-clip text-cdp-red inline-block w-full overflow-x-auto border border-gray-700 px-6 py-4 font-mono text-lg font-bold select-all sm:w-auto sm:text-xl"
			>
				soshimigames@inbox.ru
			</div>
		</div>
	</section>

	<!-- FOOTER -->
	<footer class="border-t border-gray-900 bg-black/80 py-12 text-sm text-gray-500 backdrop-blur-sm">
		<div
			class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8"
		>
			<div class="flex items-center space-x-3">
				<div class="bg-cdp-red cyber-clip px-3 py-1 text-xl font-black tracking-wider text-white">
					SOSHIMI
				</div>
				<span class="font-mono text-xs text-gray-400 sm:text-sm">2026 SOSHIMI GAMES</span>
			</div>
			<div class="flex flex-wrap justify-center gap-4 font-mono text-xs uppercase">
				<a href="#about" class="hover:text-cdp-red transition-colors">{t('nav_about')}</a>
				<a href="#projects" class="hover:text-cdp-red transition-colors">{t('nav_projects')}</a>
				<a href="#contact" class="hover:text-cdp-red transition-colors">{t('nav_contact')}</a>
			</div>
		</div>
	</footer>
</div>

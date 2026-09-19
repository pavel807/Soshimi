<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>SOSHIMI GAMES | Независимая студия разработки игр</title>
	<meta
		name="description"
		content="SOSHIMI GAMES — независимая студия разработки игр. ARKA ENGINE и секретный проект."
	/>
</svelte:head>

{@render children()}

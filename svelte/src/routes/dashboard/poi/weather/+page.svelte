<script>
    import { page } from '$app/stores';
	import DashboardHeader from '$lib/DashboardHeader.svelte';
	import WeatherData from '$lib/WeatherData.svelte'; 
    const url = $page.url;
    const poiID = url.searchParams.get('_id')
</script>

<DashboardHeader />

<div class="columns is-vcentered">
    <div class="column box is-three-thirds">
		<h1 class="title is-4">Weather Details </h1>
		<WeatherData poiID={poiID} />
	</div>
</div>

<!-- src/routes/maps/+page.svelte -->
<script>
	import DashboardHeader from '$lib/DashboardHeader.svelte';
    import CategoryMap from '$lib/CategoryMap.svelte';
	import GpsLocation from '$lib/GPSLocation.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<DashboardHeader />

<div class="columns is-vcentered">
	<div class="column" >
		<img alt="logo" src="/logo_2.jpg" width="300" />
	</div>
	
	<div class="column box is-two-thirds">
		<h1 class="title is-4">Category Map </h1>
		<CategoryMap />
	</div>
</div>

<div class="columns is-vcentered">
	
	<div class="column box is-three-thirds">
		<h1 class="title is-4">Show Current Location</h1>
		<GpsLocation />
	</div>
</div>

<Footer />
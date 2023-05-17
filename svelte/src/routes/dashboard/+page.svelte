<!-- src/routes/dashboard/+page.svelte -->
<script>
	import DashboardHeader from '$lib/DashboardHeader.svelte';
	import CategoryList from '$lib/CategoryList.svelte';
	import CategoryMap from '$lib/CategoryMap.svelte';
	import ChartPOIByCategory from '$lib/ChartPOIByCategory.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<DashboardHeader />

<div class="columns is-vcentered">
	<div class="column">
		<img alt="logo" src="/logo_2.jpg" width="300" />
	</div>
	<div class="column box is-two-thirds">
		<h1 class="title is-4">POI Categories</h1>
		<CategoryList />
	</div>
</div>

<div class="columns is-vcentered">
	<div class="column box">
		<div class="columns is-vcentered">
			<div class="column box is-two-thirds">
				<CategoryMap mapSize="250" />
			</div>
			<div class="column">
				<img alt="logo" src="/logo_1.jpg" width="325" />
			</div>
		</div>
	</div>
</div>

<div class="columns is-vcentered">
	<div class="column box">
		<div class="columns is-vcentered">
			<div class="column">
				<img alt="logo" src="/logo_03.png" width="325" />
			</div>
			<div class="column box is-two-thirds">
				<ChartPOIByCategory mapSize="250" />
			</div>
		</div>
	</div>
</div>

<div class="columns is-vcentered">
	<div class="column box">
		<Footer />
	</div>
</div>

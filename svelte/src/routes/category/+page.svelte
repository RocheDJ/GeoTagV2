<script>
	import DashboardHeader from '$lib/DashboardHeader.svelte';
	import CategoryList from '$lib/CategoryList.svelte';
	import CategoryEdit from '$lib/CategoryEdit.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<DashboardHeader />

<div class="columns is-vcentered">
	<div class="column box ">
		<h1 class="title is-4">POI Categories</h1>
		<CategoryList />
	</div>
</div>

<div class="columns is-vcentered">
	<div class="column box ">
		<h1 class="title is-4">Add New Category</h1>
		<CategoryEdit />
	</div>
</div>

<div class="columns is-vcentered">
	<div class="column box">
		<Footer />
	</div>
</div>

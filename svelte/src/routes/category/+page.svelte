<!-- src/routes/category/+page.svelte -->
<script>
	import DashboardHeader from '$lib/DashboardHeader.svelte';
	import CategoryList from '$lib/CategoryList.svelte';
	import CategoryForm from '$lib/CategoryForm.svelte';
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
		<CategoryForm />
	</div>
</div>

<div class="columns is-vcentered">
	<div class="column box">
		<Footer />
	</div>
</div>

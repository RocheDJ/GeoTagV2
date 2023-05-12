<script>
	import { page } from '$app/stores';
	import DashboardHeader from '$lib/DashboardHeader.svelte';
	import PoiList from '$lib/PoiList.svelte';
	import PoiForm from '$lib/PoiForm.svelte';
	const url = $page.url;
	const categoryID = url.searchParams.get('_id');
</script>

<DashboardHeader />

<div class="columns is-vcentered">
	<div class="column box is-three-thirds">
		<h1 class="title is-4">POI List</h1>
		<PoiList {categoryID} />
	</div>
</div>
<div class="columns is-vcentered ">
	<div class="column box is-three-thirds has-background-success">
		<h1 class="title is-4">POI Update and Edit</h1>
		<PoiForm cID={categoryID} />
	</div>
</div>

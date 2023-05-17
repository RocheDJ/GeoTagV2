<!-- src/routes/dashboard/poi/+page.svelte -->

<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import DashboardHeader from '$lib/DashboardHeader.svelte';
	import PoiList from '$lib/PoiList.svelte';
	import PoiForm from '$lib/PoiForm.svelte';
	const url = $page.url;
	
	const iData = url.searchParams.get('_id');
	const dataParameters = iData?.split("-");
	const categoryID : string = dataParameters[0];
	const categoryTitle : string = dataParameters[1]


</script>

<DashboardHeader />
<div class="box  m-2">
	<div class="columns is-vcentered">
		<div class="column box is-three-thirds">
			<h1 class="title is-4">{categoryTitle}</h1>
			<PoiList {categoryID} />
		</div>
	</div>

</div>

<div class="box  m-2">
	<div class="columns is-vcentered ">
		<div class="column box is-three-thirds">
			<h1 class="title is-4">POI Edit</h1>
			<PoiForm cID={categoryID} />
		</div>
	</div>
	
</div>

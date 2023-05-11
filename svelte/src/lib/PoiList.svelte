<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { geotagService } from '../services/geotag-service';
	/**
	 * @type {any}
	 */
	export let poiID;
	const geotagCredentials = localStorage.geotag;
	const userData = JSON.parse(geotagCredentials);
	/**
	 * @type {any}
	 */
	let userPoiList = [];


	async function readPoiList(){
		userPoiList = await geotagService.getPoiList(poiID); // ToDo: change to user specific
	} 

	onMount(async () => {
		readPoiList();
	});


	async function deletePoi(poiID){
		const retValue = await geotagService.deletePoi(poiID);
		alert("Deleted - " + poiID);
		readPoiList();
	}

</script>

<table class="table is-fullwidth">
	<thead>
		<th>Name</th>
		<th>Description</th>
		<th>Image</th>
		<th>Edit</th>
		<th>Delete</th>
	</thead>
	<tbody>
		{#each userPoiList as poi}
			<tr>
				<td>
					{poi.name}
				</td>
				<td>
					{poi.description}
				</td>
				<td>
					<img src={poi.image} width="50" alt="img" />
				</td>
				<td>
					<i class="fas fa-gear" />
				</td>
				<td>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<i class="fas fa-trash" on:click={deletePoi(poi._id)}>{''}</i>
				</td>
			</tr>
		{/each}
	</tbody>
	<div class="box has-text-centered columns m-3">
		<div class="column">
			<a href="/dashboard"> 
				<i class="fas fa-home fa-2x" aria-hidden="true"></i>
			</a>
		</div>	
		<div class="column">
			<a href="/dashboard"> 
				<i class="fas fa-plus fa-2x" aria-hidden="true"></i>
			</a>
		</div>
	</div>
</table>

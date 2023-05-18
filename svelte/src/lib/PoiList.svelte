<script>
	// list the Poi in a category
	/**
	 * @type {any}
	 */
	export let categoryID; // categoryID;

	// @ts-nocheck
	import { onMount } from 'svelte';
	import { geotagService } from '../services/geotag-service';
	import { latestPOI } from '../stores';
	import { Confirm } from 'svelte-confirm';
	import '../css/confirm.css';

	/**
	 * @type {any}
	 */
	let userPoiList = [];

	async function readPoiList() {
		userPoiList = await geotagService.getPoiList(categoryID); // ToDo: change to user specific
	}

	onMount(async () => {
		readPoiList();
	});

	async function deletePoi(poiID) {
		const retValue = await geotagService.deletePoi(poiID);
		readPoiList();
	}

	function getPOILocal(id) {
		let retValue;
		let i = 0;
		for (i in userPoiList) {
			if (userPoiList[i]._id === id) {
				retValue = userPoiList[i];
				return retValue;
			}
		}
	}

	function setSelected(poiID) {
		latestPOI.set(getPOILocal(poiID));
	}

	function onChange(event) {
		if (event) {
			const selected = event.currentTarget.value;
			setSelected(selected);
		}
	}

	// subscribe to event to auto-update the list of categories on write
	latestPOI.subscribe(async (poi) => {
		if (poi) {
			readPoiList();
		}
	});
</script>

<table class="table is-fullwidth">
	<thead>
		<th>Select</th>
		<th>Name</th>
		<th>Description</th>
		<th>Image</th>
		<th>Weather</th>
		<th>Delete</th>
	</thead>
	<tbody>
		{#each userPoiList as poi}
			<tr>
				<td>
					<input
						type="radio"
						on:change={onChange}
						group={1}
						name="selectedPOI"
						value={poi._id}
						checked
					/>
				</td>
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
					<a href="/dashboard/poi/weather/?_id={poi._id}"
						><i class="fa fa-cloud" /><i class="fa fa-sun-o" aria-hidden="true" />
					</a>
				</td>

				<td>
					<Confirm confirmTitle="Delete" cancelTitle="Cancel" let:confirm={confirmThis}>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<svg
							style="width:24px;height:24px"
							viewBox="0 0 24 24"
							class="delete-icon"
							on:click={() => confirmThis(deletePoi, poi._id)}
						>
							<path
								fill="hsl(200, 40%, 20%)"
								d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
							/>
						</svg>
						<span slot="title"> Delete this POI ? </span>
						<span slot="description"> You won't be able to undo! </span>
					</Confirm>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<script>
	// list the Poi in a category
	/**
	 * @type {any}
	 */

	// @ts-nocheck
	import { onMount } from 'svelte';
	import { geotagService } from '../services/geotag-service';
	import { latestPOI,selectedGallery} from '../stores';
	
	import { Confirm } from 'svelte-confirm';
	import '../css/confirm.css';

	/**
	 * @type {any}
	 */
	let poiGallery = [];
	

	async function readPoiGallery(poiID) {
		 //poiGallery = await geotagService.getAllGallery(); 
		 poiGallery = await geotagService.getGallery(poiID); 
	}

	onMount(async () => {
		readPoiGallery();
	});

	async function deleteGalleryImage(imageID) {
		const sucess = await geotagService.deleteGalleryImage(imageID);
		if (!sucess){
			alert("Failed to remove image");
		}else{
			readPoiGallery();
		}

	}
	// subscribe to event to auto-update the list of categories on write
	latestPOI.subscribe(async (poi) => {
		if (poi) {
			readPoiGallery(poi._id);
		}
	});

	selectedGallery.subscribe(async (poi) => {
		if (poi) {
			readPoiGallery(poi);
		}
	});
</script>

<table class="table is-fullwidth">
	<thead>
		<th>Image</th>
		<th>Delete</th>
	</thead>
	<tbody>
		{#each poiGallery as image}
			<tr>
				<td>
					<a href="{image.img}" target="_blank"> 
					<img src={image.img} width="100" alt="img" />
					</a>
				</td>
<td>
					<Confirm confirmTitle="Delete" cancelTitle="Cancel" let:confirm={confirmThis}>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<svg
							style="width:24px;height:24px"
							viewBox="0 0 24 24"
							class="delete-icon"
							on:click={() => confirmThis(deleteGalleryImage, image._id)}
						>
							<path
								fill="hsl(200, 40%, 20%)"
								d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
							/>
						</svg>
						<span slot="title"> Delete this Image ? </span>
						<span slot="description"> You won't be able to undo! </span>
					</Confirm>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

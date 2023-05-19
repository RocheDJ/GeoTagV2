<script lang="ts">
	
	import { onMount } from 'svelte';
	import { latestCategory,selectedCategory } from '../stores';
	import { geotagService } from '../services/geotag-service';
	import { goto } from '$app/navigation';

	//read in the user ID
	
	let userCategoriesList: any = [];
	const geotagCredentials = localStorage.geotag;
	const userData = JSON.parse(geotagCredentials);
	let userID = userData._id;

	onMount(async () => {
		userCategoriesList = await geotagService.getUserCategories(userID);
	});

	// delete the category by id
	async function deleteCategory(categoryID:any) {
		const retValue = await geotagService.deleteCategory(categoryID);
		userCategoriesList = await geotagService.getUserCategories(userID);
	};

	// subscribe to event to auto-update the list of categories on write
	latestCategory.subscribe(async (category) => {
		if (category) {
			userCategoriesList = await geotagService.getUserCategories(userID);
		}
	});

	//  
	function showPlaces(categoryID: string,categoryTitle: string){
		let cID : string = categoryID;
		let route : string = `/dashboard/poi/?_id=`;
		let cName : string = categoryTitle;
		route = route + cID + `-` + cName;
		goto(route);
	}

	function onChange(event : any) {
		const selected = event.currentTarget.value;
		selectedCategory.set(selected);
	}

</script>

<table class="table is-fullwidth">
	<thead>
		<th>Select</th>
		<th>Name</th>
		<th>Open</th>
		<th>Delete</th>
	</thead>
	<tbody>
		{#each userCategoriesList as category}
			<tr>
				<td>
					<input type="radio" on:change={onChange} group={1} name="selectedCAT" value={category._id} checked/>
				</td>
				<td>
					{category.title}
				</td>
				<td>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
						<i class="fas fa-folder is-clickable" on:click={showPlaces(category._id,category.title)}/>
				</td>

				<td>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<i class="fas fa-trash is-clickable" on:click={deleteCategory(category._id)}>{''}</i>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<div class="box has-text-centered columns m-2">
	<div class="column">
		<a href="/category">
			<i class="fas fa-gear" aria-hidden="true" title="Edit" />
		</a>
	</div>
	<div class="column">
		<a href="/maps">
			<i class="fa fa-map" aria-hidden="true" title="Show Map" />
		</a>
	</div>
</div>

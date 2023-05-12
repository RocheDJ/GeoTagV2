<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { latestCategory } from '../stores';
	import { geotagService } from '../services/geotag-service';
	
	//read in the user ID
	/**
	 * @type {any}
	 */ 
	let userCategoriesList = [];
	const geotagCredentials = localStorage.geotag;
	const userData = JSON.parse(geotagCredentials);
	let userID = userData._id;

	onMount(async () => {
		userCategoriesList = await geotagService.getUserCategories(userID);
	});

	// delete the category by id
	async function deleteCategory(categoryID){
		const retValue = await geotagService.deleteCategory(categoryID);
		alert("Deleted - " + categoryID);
		userCategoriesList = await geotagService.getUserCategories(userID);
	}


	// subscribe to event to auto-update the list of categories on write
	latestCategory.subscribe(async (category) => {
		if (category) {
			userCategoriesList = await geotagService.getUserCategories(userID);
		}
	});
</script>

<table class="table is-fullwidth">
	<thead>
		<th>Name</th>
		<th>Image</th>
		<th>Open</th>
		<th>Edit</th>
		<th>Delete</th>
	</thead>
	<tbody>
		{#each userCategoriesList as category}
			<tr>
				<td>
					{category.title}
				</td>
				<td>
					<img src={category.img} width="50" alt="img" />
				</td>
				<td>
					<a href="/dashboard/poi/?_id={category._id}">
						<i class="fas fa-folder-open" />
					</a>
				</td>

				<td>
					<a href="/dashboard/poi/?_id={category._id}">
						<i class="fas fa-gear" />
					</a>
				</td>
				<td>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<i class="fas fa-trash" on:click={deleteCategory(category._id)}>{''}</i>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
<div class="box has-text-centered columns m-2">
	<div class="column">
		<a href="/category">
			<i class="fas fa-plus" aria-hidden="true">Add </i>
		</a>
	</div>
	<div class="column">
		<a href="/maps">
			<i class="fa fa-map" aria-hidden="true" />
		</a>
	</div>
</div>

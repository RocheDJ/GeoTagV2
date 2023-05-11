<script>
	import { onMount } from 'svelte';
	import { geotagService } from '../services/geotag-service';
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
</script>

<table class="table is-fullwidth">
	<thead>
		<th>Name</th>
		<th>Image</th>
		<th>Open</th>
		<th>Edit</th>
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
			</tr>
		{/each}
	</tbody>
</table>
<div class="box has-text-centered columns m-2">
	<div class="column">
		<a href="/dashboard"> 
			<i class="fas fa-plus" aria-hidden="true">Add </i>
		</a>
	</div>
</div>

<script lang="ts">
	import { geotagService } from '../services/geotag-service';
	import { selectedCategory } from '../stores';
	const geotagCredentials = localStorage.geotag;
	const userData = JSON.parse(geotagCredentials);

	let categoryTitle = '';
	let categoryImage =
		'http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png';

	let message = 'Add Category';
	let cat_ID: any;
	// when we add a new poi we add default info
	const onNewCatClicked = (e:any) => {
		categoryTitle = 'New Category';
		cat_ID = null;
	};

	async function saveCategory() {
		if (!cat_ID) {
			if (categoryTitle) {
				const newCategory = {
					title: categoryTitle,
					img: categoryImage,
					userID: userData._id
				};
				const success = await geotagService.addCategory(newCategory);
				if (!success) {
					message = 'Category Not Added - some error occurred';
					return;
				}
				message = `Added ` + newCategory.title;
			} else {
				message = 'Please Enter Category Information';
			}
		} else {
			if (categoryTitle) {
				const updatedCategory = {
					title: categoryTitle,
					img: categoryImage,
					userID: userData._id,
					_id: cat_ID
				};
				const success = await geotagService.updateCategory(updatedCategory);
				if (!success) {
					message = 'Category Not Updated - some error occurred';
					return;
				}
				message = `Updated ` + updatedCategory.title;
			} else {
				message = 'Please Enter Category Information';
			}
		}
	}

	// listen for Poi changes
	selectedCategory.subscribe(async (categoryID) => {
		if (categoryID) {
			const categoryData = await geotagService.getCategory(categoryID);
			if (categoryData) {
				categoryTitle = categoryData.title;
				categoryImage = categoryData.img;
				cat_ID = categoryID;
			}
		}
	});
</script>

<form on:submit|preventDefault={saveCategory}>
	<div class="columns is-vcentered">
		<div class="column">
			<p class="subtitle is-6 has-background-black has-text-warning">{message}</p>
		</div>
		<div class="column">
			<div class="field">
				<button class="button is-info is-rounded" on:click={(e) => onNewCatClicked(e)}>
					Add
				</button>
			</div>
		</div>
		<div class="column">
			<div class="field">
				<div class="control">
					<button class="button is-danger is-rounded">Save</button>
				</div>
			</div>
		</div>
	</div>
	<div class="field">
		<label class="label" for="categoryTitle">Enter Category Title</label>
		<input
			bind:value={categoryTitle}
			class="input"
			id="categoryTitle"
			name="categoryTitle"
			type="string"
			minlength="4" 
			maxlength="80"
			required
		/>
	</div>
</form>

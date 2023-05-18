<script>
	// @ts-nocheck
	import { geotagService } from '../services/geotag-service';
	import { selectedCategory } from '../stores';
	const geotagCredentials = localStorage.geotag;
	const userData = JSON.parse(geotagCredentials);

	let categoryTitle = '';
    let categoryImage = 'http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png';
	
	let message = 'Add Category';

	async function addCategory() {
		if (categoryTitle ) {
			const newCategory = {
				title: categoryTitle,
				img: categoryImage,
				userID : userData._id,
			};
            const success = await geotagService.addCategory(newCategory);
			if (!success) {
				message = 'Category Not Added - some error occurred';
				return;
			};
			message = `Added ` + newCategory.title;
			
		} else {
			message = 'Please Enter Category Information';
		}
	};


	// listen for Poi changes
	selectedCategory.subscribe(async (categoryID) => {
		if (categoryID) {
			const categoryData = await geotagService.getCategory(categoryID);
			if(categoryData){
				categoryTitle = categoryData.title;
				categoryImage = categoryData.img;
				userID		  = userData._id;	
			}
		}
	});
</script>

<form on:submit|preventDefault={addCategory}>
	<div class="field">
		<label class="label" for="categoryTitle">Enter Category Title</label>
		<input bind:value={categoryTitle} class="input" id="categoryTitle" name="categoryTitle" type="string" />
	</div>
	<div class="field">

	</div>

	<div class="field">
		<div class="control">
			<button class="button is-link is-light"> Add </button>
		</div>
	</div>
	<div class="box">
		{message}
	</div>
</form>

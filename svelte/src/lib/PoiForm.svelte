<script lang="ts">
	import { latestPOI } from '../stores';
	import { geotagService } from '../services/geotag-service';
	import { Confirm } from 'svelte-confirm';
	import Coordinates from './Coordinates.svelte';
	import '../css/fileupload.css';
	export let cID: any;

	const defaultImage =
		'http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png';

	let poi_ID: any;
	let nameOfPoi = '';
	let lat = 52.160858;
	let lng = -7.15242;
	let poiDescription = 'Description of Point';
	let newImageData: any = null;
	let poiImage: string = defaultImage;
	let message = 'Select POI from list to edit or add new';
	let avatar: any, fileinput: any;

	// add or update the poi
	async function SavePoi() {
		// if the id is set we are updating else we are adding new
		if (!poi_ID) {
			message = 'Adding POI, Please wait';
			const newPOI = {
				name: nameOfPoi,
				latitude: lat,
				longitude: lng,
				description: poiDescription,
				image: defaultImage,
				categoryID: cID
			};
			const success = await geotagService.addPoi(newPOI);
			if (!success) {
				message = 'Update not completed - trouble happen!';
				return;
			}
			message = `Added ${newPOI.name}`;
		} else {
			message = 'Updating Please wait';
			//update the image
			if (newImageData) {
				// add as avatar
				poiImage = await geotagService.createImage(newImageData);

				// add to gallery
				const galleryImage = {
					img: poiImage,
					poiID: poi_ID
				};
				const gallery = await geotagService.addGalleryImage(galleryImage);

				newImageData = null;
			}
			// update the POI
			const updatedPOI = {
				name: nameOfPoi,
				latitude: lat,
				longitude: lng,
				description: poiDescription,
				image: poiImage,
				categoryID: cID,
				_id: poi_ID
			};
			const success = await geotagService.updatePoi(updatedPOI);
			if (!success) {
				message = 'Update not completed - trouble happen!';
				document.body.style.cursor = 'default';
				return;
			}
			message = `Updated ${updatedPOI.name}`;
		}
	}

	// when we add a new poi we add default info
	const onNewPOIClicked = (e:any) => {
		nameOfPoi = 'New Poi';
		lat = -90.0;
		lng = -90.0;
		poiImage = defaultImage;
		poiDescription = ' Please enter a description ';
		poi_ID = null;
	};

	// when new file is selected we update the image and form data for submission to the API
	const onFileSelected = (e:any) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		let fileData; // : string | undefined;
		reader.readAsDataURL(file);
		reader.onload = (e:any) => {
			avatar = e.target.result;
			fileData = e.target.result;
			const postData = JSON.stringify({
				fileData,
				fileName: file.name
			});
			newImageData = postData;
		};
	};

	// set the image to default and delete the old one
	const onFileDelete = () => {
		avatar = defaultImage;
	};

	// listen for Poi changes
	latestPOI.subscribe(async (poi:any) => {
		if (poi) {
			//
			if (poi.categoryID === cID) {
				(nameOfPoi = poi.name),
					(lat = poi.latitude),
					(lng = poi.longitude),
					(poiDescription = poi.description),
					(poiImage = poi.image),
					(cID = poi.categoryID),
					(poi_ID = poi._id);
				avatar = poiImage;
				message = 'Click Save to commit any changes';
			}else{
				message = 'Categories differ';
			}
		}
	});
</script>

<form on:submit|preventDefault={SavePoi}>
	<div class="columns is-vcentered">
		<div class="column">
			<p class="subtitle is-6 has-background-black has-text-warning">{message}</p>
		</div>
		<div class="column">
			<div class="field">
				<button class="button is-info is-rounded" on:click={(e) => onNewPOIClicked(e)}>
					Add
				</button>
			</div>
		</div>
		<div class="column">
			<div class="field">
				<div class="control">
					<button class="button is-danger is-rounded" disabled={!nameOfPoi}>Save</button>
				</div>
			</div>
		</div>
	</div>
	<div class="columns is-hcentered">
		<div class="column">
			<div class="field">
				<label class="label" for="Poi Name">POI Name</label>
				<input bind:value={nameOfPoi} class="input" id="nameOfPoi" name="nameOfPoi" type="string" required/>
			</div>
		</div>
		<div class="column">
			<div class="field">
				<label class="label" for="POI Description">POI Description</label>
				<input
					bind:value={poiDescription}
					class="input"
					id="poiDescription"
					name="poiDescription"
					type="string"
					required/>
			</div>
		</div>
	</div>

	<div class="columns is-hcentered">
		<div class="column is-two-thirds">
			<div>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">Avatar</label>
				{#if avatar}
					<img class="avatar" src={avatar} alt="d" />
				{:else}
					<img class="avatar" src={poiImage} alt="" />
				{/if}

				<div class="box has-text-centered columns m-2">
					<div class="column">
						<i
							class="fas fa-camera-retro is-clickable fa-3x"
							title="Add Image"
							aria-hidden="true"
							on:click={() => {
								fileinput.click();
							}}
						/>
					</div>
					<div class="column">
						<i
							class="fa fa-trash-o is-clickable fa-3x"
							title="Delete Image/Set Default"
							aria-hidden="true"
							on:click={() => {
								onFileDelete();
							}}
						/>
					</div>
				</div>

				<input
					style="display:none"
					type="file"
					accept=".jpg, .jpeg, .png"
					on:change={(e) => onFileSelected(e)}
					bind:this={fileinput}
					name="imageFileName"
				/>
				<input
					style="display:none"
					type="string"
					on:change={(e) => onFileSelected(e)}
					bind:value={poiImage}
					name="imageFileDelete"
				/>
			</div>
		</div>
		<div class="column is-one-thirds">
			<Coordinates bind:lat bind:lng />
		</div>
	</div>
</form>

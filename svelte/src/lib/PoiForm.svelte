<script lang="ts">
	// @ts-nocheck
	import { selectedPOI } from '../stores';
	import { geotagService } from '../services/geotag-service';
	import { Confirm } from 'svelte-confirm';
	import Coordinates from './Coordinates.svelte';
	import '../css/fileupload.css';
	export let cID;

	const defaultImage =
		'http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png';

	let poi_ID;
	let nameOfPoi = '';
	let lat = 52.160858;
	let lng = -7.15242;
	let poiDescription = 'Description of Point';
	let newImageData = null;
	let poiImage: string = defaultImage;
	let message = 'Select POI from list to edit or add new';
	let avatar, fileinput;

	// Add a new POI with default info
	async function addPOI() {
		if (nameOfPoi) {
			const poi = {
				name: nameOfPoi,
				latitude: lat,
				longitude: lng,
				description: poiDescription,
				image: defaultImage,
				categoryID: cID
			};

			const success = await geotagService.addPoi(poi);
			if (!success) {
				message = 'Update not completed - trouble happen!';
				return;
			}
			message = `Added ${poi.name}`;
		}
	}

	// Update and  save an existing POI
	async function updatePOI() {
		if (nameOfPoi) {
			message = 'Updating Please wait';
			document.body.style.cursor = 'wait';
			// if the avatar is the default image and the poi image is not then
			// delete the poi image
			if (avatar == defaultImage && poiImage !== defaultImage) {
				const imageDeleted = await geotagService.deleteImage(poiImage);
			}

			// if we have new image data we need to delete the old image
			if (newImageData) {
				// delete the existing saved image for that POI
				if (poiImage !== defaultImage) {
					const imageDeleted = await geotagService.deleteImage(poiImage);
				}
				poiImage = await geotagService.createImage(newImageData);
				newImageData = null;
			}
			const poi = {
				name: nameOfPoi,
				latitude: lat,
				longitude: lng,
				description: poiDescription,
				image: poiImage,
				categoryID: cID,
				_id: poi_ID
			};
			const success = await geotagService.updatePoi(poi);
			if (!success) {
				message = 'Update not completed - trouble happen!';
				document.body.style.cursor = 'default';
				return;
			}
			message = `Added ${poi.name}`;
			document.body.style.cursor = 'default';
		} else {
			message = 'Please select amount, method and candidate';
			document.body.style.cursor = 'default';
		}
	}

	// listen for Poi changes
	selectedPOI.subscribe(async (poi) => {
		if (poi) {// dont load poi from not select category
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
			}
		}
	});

	// when we add a new poi we add default info
	const onNewPOIClicked = (e) => {
		nameOfPoi = 'New Poi';
		lat = -90.0;
		lng = -90.0;
		poiImage = defaultImage;
		poiDescription = ' --- ';
		addPOI();
	};

	// when new file is selected we update the image and form data for submission to the API
	const onFileSelected = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		let fileData; // : string | undefined;
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			avatar = e.target.result;
			fileData = e.target.result; // as string;
			const postData = JSON.stringify({
				fileData,
				fileName: file.name
			});
			newImageData = postData;
		};
	};

	// set the image to default and delete the old one
	const onFileDelete = () => {
		alert('File Delete' + { avatar });
		avatar = defaultImage;
	};
</script>

<form on:submit|preventDefault={updatePOI}>
	<div class="columns is-vcentered">
		<div class="column">
			<p class="subtitle is-6 has-background-black has-text-warning">{message}</p>
		</div>
		<div class="column">
			<div class="field">
				<button class="button is-info is-rounded" on:click={(e) => onNewPOIClicked(e)}>
					Add New
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
	<div class="columns is-hcentered">
		<div class="column">
			<div class="field">
				<label class="label" for="Poi Name">POI Name</label>
				<input bind:value={nameOfPoi} class="input" id="nameOfPoi" name="nameOfPoi" type="string" />
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
				/>
			</div>
		</div>
	</div>

	<div class="columns is-hcentered">
		<div class="column is-two-thirds">
			<div>
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
							title="Delete Image"
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

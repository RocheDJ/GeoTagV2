<script>
	// @ts-nocheck
	import { selectedPOI } from '../stores';
	import { geotagService } from '../services/geotag-service';
	import Coordinates from './Coordinates.svelte';
	import '../css/fileupload.css';
	export let cID;

	let poi_ID;
	let nameOfPoi = '';
	let lat = 52.160858;
	let lng = -7.15242;
	let poiDescription = 'Description of Point';
	let newImage =
		'http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png';

	let message = 'Add or Update POI';

	let avatar, fileinput;

	const onNewPOIClicked = (e) => {
		nameOfPoi = 'New Poi';
		lat = -90.0;
		lng = -90.0;
		newImage =
			'http://res.cloudinary.com/dwv4wuj9l/image/upload/v1678877496/j8fuirekhojwosgmpjr0.png';
		poiDescription = ' --- ';
		addPOI();
	};

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
	};

	async function addPOI() {
		if (nameOfPoi) {
			const poi = {
				name: nameOfPoi,
				latitude: lat,
				longitude: lng,
				description: poiDescription,
				image: newImage,
				categoryID: cID
			};
			const success = await geotagService.addPoi(poi);
			if (!success) {
				message = 'Update not completed - trouble happen!';
				return;
			}
			message = `Added ${poi.name}`;
		} else {
			message = 'Please select amount, method and candidate';
		}
	}

	async function updatePOI() {
		if (nameOfPoi) {
			const poi = {
				name: nameOfPoi,
				latitude: lat,
				longitude: lng,
				description: poiDescription,
				image: newImage,
				categoryID: cID,
				_id : poi_ID
			};
			const success = await geotagService.updatePoi(poi);
			if (!success) {
				message = 'Update not completed - trouble happen!';
				return;
			}
			message = `Added ${poi.name}`;
		} else {
			message = 'Please select amount, method and candidate';
		}
	}

	selectedPOI.subscribe(async (poi) => {
		if (poi) {
			(nameOfPoi = poi.name),
				(lat = poi.latitude),
				(lng = poi.longitude),
				(poiDescription = poi.description),
				(newImage = poi.image),
				(cID = poi.categoryID),
				(poi_ID = poi._id)
		}
	});
</script>

<form on:submit|preventDefault={updatePOI}>
	<div class="field">
		<button class="button is-responsive" on:click={(e) => onNewPOIClicked(e)}>Add New POI</button>
	</div>

	<div class="field">
		<label class="label" for="Poi Name">POI Name</label>
		<input bind:value={nameOfPoi} class="input" id="nameOfPoi" name="nameOfPoi" type="string" />
	</div>

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

	<div class="columns is-vcentered">
		<div class="column is-two-thirds">
			<div id="app">
				<h1>Poi Image</h1>
				{#if avatar}
					<img class="avatar" src={avatar} alt="d" />
				{:else}
					<img class="avatar" src={newImage} alt="" />
				{/if}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					class="upload"
					src="https://static.thenounproject.com/png/625182-200.png"
					alt=""
					on:click={() => {
						fileinput.click();
					}}
				/>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="chan"
					on:click={() => {
						fileinput.click();
					}}
				>
					Choose Image
				</div>
				<input
					style="display:none"
					type="file"
					accept=".jpg, .jpeg, .png"
					on:change={(e) => onFileSelected(e)}
					bind:this={fileinput}
				/>
			</div>
		</div>

		<div class="box">
			<Coordinates bind:lat bind:lng />
		</div>
	</div>

	<div class="field">
		<div class="control">
			<button class="button is-link">Save POI</button>
		</div>
	</div>

	<div class="box">
		{message}
	</div>
</form>

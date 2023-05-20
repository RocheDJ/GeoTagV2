<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { LeafletMap } from '../services/leaflet-map';
	import { onMount } from 'svelte';

	import { geotagService } from '../services/geotag-service';
	let userPoi = [];
	let userCategories = [];
	const geotagCredentials = localStorage.geotag;
	const userData = JSON.parse(geotagCredentials);
	let userID = userData._id;

	const mapConfig = {
		location: { lat: 52.160858, lng: -7.15242 },
		zoom: 8,
		minZoom: 1
	};

	export let mapSize = '500';

	let map: LeafletMap | null = null;

	onMount(async () => {
		// get the list of categories
		userCategories = await geotagService.getUserCategories(userID);
		// make a map
		map = new LeafletMap('category-map', mapConfig);
		map.showZoomControl();

		// for each category add the points of interest

		userCategories.forEach(async (category: any) => {
			// add the layer
			if (map) {
				map.addLayerGroup(category.title);
				// add the poi
				userPoi = await geotagService.getPoiList(category._id);
				// for each point add map location

				userPoi.forEach((poi: any) => {
					addPoiMarker(map, poi, category.title);
				});
			}
		});
		map.showLayerControl();
	});

	function addPoiMarker(map: LeafletMap | null, in_Poi: any, in_Category: any) {
		var popupString = `<a href='/dashboard/poi/weather/?_id=${in_Poi._id}'>${in_Poi.name}<br><small>Click for Weather</small></a>`;
		if (map) {
			map.addMarker({ lat: in_Poi.latitude, lng: in_Poi.longitude }, popupString, in_Category);
		}
	}
	// toDo : add subscription for Live update
</script>

<div class="box" id="category-map" style="height:{mapSize}px" />

<script>
	import 'leaflet/dist/leaflet.css';
	import { LeafletMap } from '../services/leaflet-map';
	import { onMount } from 'svelte';
	// @ts-ignore
	import { latestPOI, user } from '../stores';
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
	/**
	 * @type {LeafletMap | null}
	 */
	let map = null;

	onMount(async () => {
		// get the list of categories
        userCategories = await geotagService.getUserCategories(userID);
         // make a map
		map = new LeafletMap('category-map', mapConfig);
		map.showZoomControl();
        
		// for each category add the points of interest
        // @ts-ignore
        userCategories.forEach(async (category)=>{
           // add the layer
           // @ts-ignore
           map.addLayerGroup(category.title); 
           // add the pois
           userPoi = await geotagService.getPoiList(category._id);     
           // for each point add map location
           // @ts-ignore
           userPoi.forEach((poi) =>{
            addPoiMarker(map, poi,category.title);
           });
        });
        map.showLayerControl();
	});

	// @ts-ignore
	function addPoiMarker(map, in_Poi,in_Category) {
		const poiStr = `${in_Poi.name}`;
		map.addMarker({ lat: in_Poi.latitude, lng: in_Poi.longitude }, poiStr, in_Category);
	}
   // toDo : add subscription for Live update
</script>

<div class="box" id="category-map" style="height:{mapSize}px" />

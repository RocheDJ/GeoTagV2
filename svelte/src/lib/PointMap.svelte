<script lang="ts">
	import 'leaflet/dist/leaflet.css';
	import { LeafletMap } from '../services/leaflet-map';
	import  {createLoadObserver}  from "../utils/utils.js"
	import { geoLocationPoint } from '../stores';
	import { onMount } from 'svelte';
	export const iMapInfo = {
		pointTitle: 'the point',
		mapSize: '500',
		location: { lat: 52.160858, lng: -7.15242 }
	};

	let map: LeafletMap | null = null;

	async function initMap(){
		try{
			if (!map){
				const mapConfig = {
					location: iMapInfo.location,
					zoom: 16,
					minZoom: 1
					};
				// make a map
				map = new LeafletMap('Geolocation-map', mapConfig);
				map.addLayerGroup("Geo Location");
				map.showZoomControl();
				map.showLayerControl();
				addPoiMarker(map,iMapInfo.location);
			}
		}catch(error){
			console.log("init map error " + error)
		}
	}

	const onload = createLoadObserver(async () => {
        await initMap();
    })
	
	onMount(async () => {
		await initMap();
	});
	
	function addPoiMarker(map: LeafletMap | null , loc : any) {
		var popupString = iMapInfo.pointTitle;
		if (map) {
			map.addMarker({lat: loc.lat, lng:loc.lng}, popupString,"Geo Location");
		}
	}

	// subscribe to event to auto-update the list of categories on write
	geoLocationPoint.subscribe(async (location) => {
		if (location){
			if (map){
				map = null;
			}
			iMapInfo.pointTitle = "My Location";
			iMapInfo.mapSize = '500';
			iMapInfo.location = location;

			await initMap();
		}
	});
</script>

<div use:onload class="box" id="Geolocation-map" style="height:{iMapInfo.mapSize}px" />

<script>
    import Geolocation from "svelte-geolocation";
    import PointMap   from "$lib/PointMap.svelte";
    let getPosition = false;
    import { geoLocationPoint } from '../stores';

    function decodeGPS(Coords){
        const GPS ={
            pointTitle : "My Location",
		    mapSize : '500',
		    location: { lat: Coords[1], lng: Coords[0]},
        }
        return GPS;
    } 

    function setGeoLocationPoint(point){
        geoLocationPoint.set(point.location);
    }
  </script>
  
  <button on:click="{() => (getPosition = true)}"> Get geolocation </button>
  
  <Geolocation
    getPosition="{getPosition}"
    let:coords
    let:loading
    let:success
    let:error
    let:notSupported
  >
    {#if notSupported}
      Your browser does not support the Geolocation API.
    {:else}
      {#if loading}
        Loading...
      {/if}
      {#if success}
        {JSON.stringify(coords)}
        <PointMap />
        {setGeoLocationPoint(decodeGPS(coords))}
      {/if}
      {#if error}
        An error occurred. {error.code} {error.message}
      {/if}
    {/if}

  </Geolocation>
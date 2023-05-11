<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { geotagService } from '../services/geotag-service';
	/**
	 * @type {any}
	 */
	export let poiID;
	
	let weatherRecord = {};

	async function readWeather(){
		weatherRecord = await geotagService.getPoiWeather(poiID); // ToDo: change to user specific
	} 

	onMount(async () => {
		readWeather();
	});

</script>

<table class="table is-fullwidth">
	<thead>
		<th>Temp</th>
		<th>Wind Speed</th>
		<th>Pressure</th>
	</thead>
	<tbody>
			<tr>
				<td>
                    {weatherRecord.temperature} - C
				</td>
				<td>
                    {weatherRecord.windSpeed} -Kph
				</td>
				<td>
                    {weatherRecord.pressure} -HPa
				</td>
			</tr>
	</tbody>
	<div class="box has-text-centered columns m-3">
		<div class="column">
			<a href="/dashboard"> 
				<i class="fas fa-home fa-2x" aria-hidden="true"></i>
			</a>
		</div>	
	</div>
</table>

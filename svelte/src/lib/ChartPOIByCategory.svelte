<script>
	import Chart from 'svelte-frappe-charts';
	import { onMount } from 'svelte';
	import { geotagService } from '../services/geotag-service';
	import { latestPOI } from '../stores';
	import { latestCategory } from '../stores';

	const geotagCredentials = localStorage.geotag;
	const userData = JSON.parse(geotagCredentials);
	let userID = userData._id;
	let chartType = 'bar';
	let totalPOIByCategory = {
		labels: [],
		datasets: [
			{
				values: []
			}
		]
	};

	/**
	 * @param {any[]} categoriesList
	 */
	function populateByCategory(categoriesList) {
		totalPOIByCategory.labels = [];
		categoriesList.forEach((category) => {
			const catName = category.title;
			totalPOIByCategory.labels.push(`${catName}`);
			totalPOIByCategory.datasets[0].values.push(0);
		});

		categoriesList.forEach(async (category, i) => {
			totalPOIByCategory.datasets[0].values[i] = 0;
			const poiList = await geotagService.getPoiList(category._id);
			totalPOIByCategory.datasets[0].values[i] = poiList.length;
		});
	}

	async function onChartTypeButton_clicked(e) {
        const newType = e.currentTarget.id;
		chartType = newType;
        await refreshChart();
	}
	async function refreshChart() {
		let userCategoriesList = await geotagService.getUserCategories(userID);
		populateByCategory(userCategoriesList);
	}

	onMount(async () => {
		await refreshChart();
	});

	latestPOI.subscribe(async (POI) => {
		if (POI) {
			await refreshChart();
		}
	});
</script>

<h1 class="title is-4">Poi By Category</h1>

<button class="button is-light" id="pie" on:click={(e) => onChartTypeButton_clicked(e)}
	>Pie</button
>
<button class="button is-dark" id="bar" on:click={(e) => onChartTypeButton_clicked(e)}
	>Bar</button
>
{#if chartType=='bar'}
    <Chart data={totalPOIByCategory} type='bar' />
{/if}

{#if chartType=='pie'}
    <Chart data={totalPOIByCategory} type='pie' />
{/if}
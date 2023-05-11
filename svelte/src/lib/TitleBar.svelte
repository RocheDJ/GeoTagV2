<script>
	export let title = '';
	export let subTitle = '';
	import DropdownList from './DropdownList.svelte';
</script>

<div class="box has-text-centered columns m-2">
    <div class="column">
		<DropdownList />
	</div>
	
	<div class="column">
		<div class="title is-5">{title}</div>
		<div class="subtitle is-6">{subTitle}</div>
	</div>
	
    <div class="column">
		<img src="/location.png" width="50" alt="img" />
	</div>
</div>

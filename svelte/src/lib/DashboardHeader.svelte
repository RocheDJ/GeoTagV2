<script>
	import TitleBar from './TitleBar.svelte';
	import { user } from '../stores.js';
</script>

<div class="columns is-vcentered">
	<div class="column is-three-thirds">
		{#if $user.email}
			<TitleBar title={'Geo Tag Version 2.0'} subTitle={'User :' + $user.email} />
		{:else}
			<TitleBar title={'Geo Tag David Roche'} subTitle={'User : Error?'} />
		{/if}
	</div>
</div>

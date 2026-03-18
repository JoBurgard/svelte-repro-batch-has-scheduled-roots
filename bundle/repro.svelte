<svelte:options
	customElement={{
		tag: 'repro-svelte',
		shadow: 'none',
	}}
/>

<script lang="ts">
	let testState = $state(crypto.randomUUID());
	let firstDerived = $derived({ test: testState });
	let secondDerived = $derived([testState]);
</script>

<div>
	<button
		class="btn btn-primary"
		type="button"
		onclick={() => {
			testState = crypto.randomUUID();
		}}
	>
		Mutate State
	</button>
</div>
<repro-inner test={firstDerived.test}></repro-inner>
<div>
	{#each secondDerived as row}
		<div>{row}</div>
	{/each}
</div>

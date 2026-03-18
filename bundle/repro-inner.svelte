<svelte:options
	customElement={{
		tag: 'repro-inner',
		shadow: 'none',
	}}
/>

<script lang="ts">
	type Props = {
		test: string;
	};
	const { test }: Props = $props();
</script>

{test}

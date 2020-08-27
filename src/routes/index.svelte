<script>
	import { onMount } from 'svelte'

	export let data = [];
	export let meta = {
		'columns': []
	};

	onMount(async () => {
		const res = await fetch(`ec2.json`)
		const result = await res.json()
		data = result['data']
		meta = result['meta']
	})

</script>

<style>
	table th { text-align: left; }
</style>

<svelte:head>
	<title>EC2 browser</title>
</svelte:head>

<h1>EC2 instances</h1>
<table>
	<thead>
		<tr>
			{#each meta['columns'] as column}
			<th>{column['name']}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as item}
		<tr>
			{#each item as cell}
			<td>{cell}</td>
			{/each}
		</tr>
		{/each}
	</tbody>
</table>
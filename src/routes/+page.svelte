<script lang="ts">
	import Range from '$lib/components/range.svelte';

	let spaces = ['theatre', 'studio'];
	let selected: string;

	const prices = {
		theatre: {
			perf: 250,
			securityDeposit: 300,
			techRehearsal: 125,
			rehearsal: 80
		},
		studio: {
			artist: 40,
			teachingArtist: 60
		}
	};

	const time = {
		theatre: {
			min: 4,
			max: 20
		},
		studio: {
			min: 1,
			max: 8
		}
	};

	let theatrePerf = 4;
	let theatreRehearse = 4;
	let isTech = false;

	$: rehearsalTotal =
		theatreRehearse * (isTech ? prices.theatre.techRehearsal : prices.theatre.rehearsal);
	$: total = prices.theatre.securityDeposit + prices.theatre.perf * theatrePerf + rehearsalTotal;
</script>

<h1>Joe's Rental calculator</h1>

<div class="m-10">
	<h2 class="text-[6rem] font-bold text-[#323755] text-right">${total}</h2>
	<label for="space" class="text-sm font-medium text-gray-900">space</label>
	<select
		bind:value={selected}
		name="space"
		id="space"
		class="my-1.5 border-2 rounded-md border-gray-300 text-gray-700 sm:text-sm"
	>
		{#each spaces as space}
			<option value={space}>{space}</option>
		{/each}
	</select>
	<div class="border-4 border-[#FC7950] rounded-xl p-5">
		<div class="flex flex-row gap-3 items-center justify-between">
			<div>${prices.theatre.perf}/hr</div>
			<div class="w-full max-w-xl">
				<label for="theatrePerformance">performance</label>
				<div class="slidecontainer">
					<Range
						min={time.theatre.min}
						max={time.theatre.max}
						step={1}
						bind:value={theatrePerf}
						id="theatrePerformance"
					/>
				</div>
				<span>{theatrePerf}</span>
			</div>
		</div>

		<div class="flex flex-row gap-3 items-center justify-between">
			<div>${isTech ? prices.theatre.techRehearsal : prices.theatre.rehearsal}/hr</div>
			<div class="w-full max-w-xl">
				<label for="theatreRehearse">rehearsal</label>
				<br />
				<input bind:checked={isTech} type="checkbox" id="tech" /> <label for="tech">tech</label>
				<div class="slidecontainer">
					<Range
						min={time.theatre.min}
						max={time.theatre.max}
						step={1}
						bind:value={theatreRehearse}
						id="theatreRehearse"
					/>
				</div>
				<span>{theatreRehearse}</span>
			</div>
		</div>
	</div>
	<div>
		<h3>availability</h3>
		<div>
			<p>availability grid</p>
		</div>
	</div>
</div>

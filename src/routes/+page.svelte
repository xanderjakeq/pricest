<script lang="ts">
	import { page } from '$app/stores';
	import Range from '$lib/components/range.svelte';

	let spaces = ['theatre', 'studio'];
	let selected: string = $page.url.searchParams.get('space') || spaces[0];

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
			max: 20
		}
	};

	let theatrePerf = 4;
	let theatreRehearse = 1;
	let studioTime = 1;
	let isTech = false;
	let isPerf = false;
	let isTeach = false;

	let total = 0;

	$: {
		theatreRehearse = isTech ? 4 : 1;
	}

	$: performanceTotal = prices.theatre.securityDeposit + prices.theatre.perf * theatrePerf;
	$: rehearsalTotal =
		theatreRehearse * (isTech ? prices.theatre.techRehearsal : prices.theatre.rehearsal);

	$: {
		if (selected === spaces[0]) {
			total = (isPerf ? performanceTotal : 0) + rehearsalTotal;
		} else {
			total = (isTeach ? prices.studio.teachingArtist : prices.studio.teachingArtist) * studioTime;
		}
	}
</script>

<div class="m-10">
	<h2 class="text-[6rem] font-bold text-[#323755] text-right">${total}</h2>
	<label for="space" class="text-sm font-medium text-gray-900">space:</label>
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

	<div class="border-4 border-[#FC7950] rounded-xl p-5 bg-orange-400/[.05]">
		{#if selected === spaces[0]}
			<input bind:checked={isPerf} type="checkbox" id="perf" /> <label for="perf">perform</label>
			{#if isPerf}
				<label
					for="theatrePerformance"
					class="text-xl font-bold block
                    my-3">performance</label
				>
				<div class="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
					<div class="w-full md:w-64 text-[3rem] font-thin">${prices.theatre.perf}/hr</div>
					<div class="w-full max-w-xl">
						<div class="slidecontainer">
							<Range
								min={time.theatre.min}
								max={time.theatre.max}
								step={1}
								bind:value={theatrePerf}
								id="theatrePerformance"
							/>
						</div>
						<span class="text-slate-700/75">{theatrePerf} hrs</span>
					</div>
				</div>
			{/if}

			<label for="theatreRehearse" class="text-xl font-bold block mb-3">rehearsal</label>
			<div class="flex flex-col md:flex-row gap-3 items-center justify-between">
				<div class="w-full md:w-64 text-[3rem] font-thin">
					${isTech ? prices.theatre.techRehearsal : prices.theatre.rehearsal}/hr
				</div>
				<div class="w-full max-w-xl">
					<input bind:checked={isTech} type="checkbox" id="tech" /> <label for="tech">tech</label>
					<div class="slidecontainer">
						<Range
							min={isTech ? time.theatre.min : 1}
							max={time.theatre.max}
							step={1}
							bind:value={theatreRehearse}
							id="theatreRehearse"
						/>
					</div>
					<span class="text-slate-700/75"
						>{theatreRehearse}
						{theatreRehearse > 1 ? 'hrs' : 'hr'}</span
					>
				</div>
			</div>
		{:else}
			<div class="flex flex-col md:flex-row gap-3 items-center justify-between">
				<div class="w-full md:w-64 text-[3rem] font-thin">
					${isTeach ? prices.studio.teachingArtist : prices.studio.artist}/hr
				</div>
				<div class="w-full max-w-xl">
					<input bind:checked={isTeach} type="checkbox" id="teach" />
					<label for="teach">teaching</label>
					<div class="slidecontainer">
						<Range
							min={time.studio.min}
							max={time.studio.max}
							step={1}
							bind:value={studioTime}
							id="theatreRehearse"
						/>
					</div>
					<span class="text-slate-700/75">{studioTime} {studioTime > 1 ? 'hrs' : 'hr'}</span>
				</div>
			</div>
		{/if}
	</div>
	<div class="flex flex-col flex-start">
		<a
			href={'mailto:ricardo@joesmovement.org?subject=' +
				(selected === spaces[0]
					? "Theatre%20rental%20for%20Joe's%20Movement%20Emporium"
					: "Space%20Rental%20for%20Joe's%20Movement%20Emporium")}
			class="p-3 my-5 bg-black text-white font-bold text-lg bg-[#323755] rounded-lg max-w-fit"
		>
			book now
		</a>
	</div>
</div>

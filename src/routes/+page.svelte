<script lang="ts">
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import Range from '$lib/components/range.svelte';
	import { prices as static_price, time as static_time } from '$lib/consts';

	export let data: PageData;

	const prices = data.prices || static_price;
	const time = data.time || static_time;

	let spaces = ['theatre', 'studio'];
	let space = $page.url.searchParams.get('space');
	let selected: string = space || spaces[0];

	let theatrePerf = 4;
	let theatreRehearse = 1;
	let studioTime = 1;
	let isTech = false;
	let isPerf = false;
	let isTeach = false;

	//addons
	let audio = false;
	let photography = false;
	let videography = false;
	let lighting = false;
	let livestreaming = false;

	let addons = 0;
	let total = 0;

	$: {
		theatreRehearse = isTech ? 4 : 1;
	}

	$: performanceTotal =
		prices.theatre.securityDeposit + (prices.theatre.perf + addons) * theatrePerf;
	$: rehearsalTotal =
		((isTech ? prices.theatre.techRehearsal : prices.theatre.rehearsal) + addons) * theatreRehearse;

	$: {
		addons =
			(audio ? prices.addons.audio : 0) +
			(lighting ? prices.addons.lighting : 0) +
			(photography ? prices.addons.photography : 0) +
			(videography ? prices.addons.videography : 0) +
			(livestreaming ? prices.addons.livestreaming : 0);
	}

	$: {
		if (selected === spaces[0]) {
			total = (isPerf ? performanceTotal : 0) + rehearsalTotal;
		} else {
			total =
				((isTeach ? prices.studio.teachingArtist : prices.studio.artist) + addons) * studioTime;
		}
	}
</script>

<div class="m-10">
	<h2 class="text-[6rem] font-bold text-[#323755] text-right">${total}</h2>
	<label for="space" class="text-sm font-medium text-gray-900 hidden">space:</label>
	{#if !space}
		<select
			bind:value={selected}
			name="space"
			id="space"
			class="my-1.5 border-2 rounded-md border-gray-300 text-gray-700
        sm:text-sm"
		>
			{#each spaces as space}
				<option value={space}>{space}</option>
			{/each}
		</select>
	{/if}

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
					<div>
						<p class="w-full md:w-64 text-[3rem] font-thin">
							${prices.theatre.perf + addons}/hr
						</p>
						<span class="text-sm opacity-50">
							${prices.theatre.securityDeposit} security deposit
						</span>
					</div>
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
				<div>
					<p class="w-full md:w-64 text-[3rem] font-thin">
						${(isTech ? prices.theatre.techRehearsal : prices.theatre.rehearsal) + addons}/hr
					</p>
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
					${(isTeach ? prices.studio.teachingArtist : prices.studio.artist) + addons}/hr
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

		<div>
			<h3 class="font-bold">addons</h3>
			<div class="flex flex-wrap gap-5">
				{#if selected != spaces[0]}
					<div>
						<input bind:checked={audio} type="checkbox" id="audio" />
						<label
							for="audio"
							title="$30/hr
2 microphones
Other recording gear
An audio engineer"
							class="hover:cursor-pointer"
						>
							Podcast Audio Recording
						</label>
					</div>
					<div>
						<input bind:checked={lighting} type="checkbox" id="lighting" />
						<label
							for="lighting"
							title="75/hr
A Lighting Technician
3 high powered LED lights
Custom lighting setup"
							class="hover:cursor-pointer"
						>
							Lighting
						</label>
					</div>
				{/if}

				<div>
					<input bind:checked={photography} type="checkbox" id="photography" />
					<label
						for="photography"
						title="$50/hr
A photographer
15 High Quality photos
Delivery within 2 business days"
						class="hover:cursor-pointer"
					>
						Photography
					</label>
				</div>
				<div>
					<input bind:checked={videography} type="checkbox" id="videography" />
					<label
						for="videography"
						title="$75/hr
A videographer
High quality video
Standing camera
Light editing
Delivery within 2 business days"
						class="hover:cursor-pointer"
					>
						Videography
					</label>
				</div>
				<div>
					<input bind:checked={livestreaming} type="checkbox" id="livestreaming" />
					<label
						for="livestreaming"
						title="$75/hr
High quality Video
1 Microphone
Media Technician"
						class="hover:cursor-pointer"
					>
						Livestreaming
					</label>
				</div>
			</div>

			<p class="text-sm max-w-sm my-5 opacity-50">
				The CreativeWorks Digital Media Team must be booked separately. This calculator does not
				guarantee the media team's availability for your event. Book the media team for your event
				<a
					href="https://docs.google.com/forms/d/e/1FAIpQLSf96nxL7ZyJpDmOT1aU_ighN0tL9iaM_mm1yQhXKI9rDtQO5Q/viewform"
					class="text-sky-500"
				>
					here
				</a>.
			</p>
		</div>
	</div>
	<div class="flex flex-col flex-start">
		<a
			href={'mailto:' +
				(selected === spaces[0] ? 'gustavo' : 'ricardo') +
				'@joesmovement.org?subject=' +
				(selected === spaces[0]
					? "Theatre%20rental%20for%20Joe's%20Movement%20Emporium"
					: "Space%20Rental%20for%20Joe's%20Movement%20Emporium")}
			class="p-3 my-5 bg-black text-white font-bold text-lg bg-[#323755] rounded-lg max-w-fit"
		>
			book now
		</a>
	</div>
</div>

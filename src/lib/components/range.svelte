<script lang="ts">
	export let min: number, max: number, step: number, value: number, id: string;
</script>

<input type="range" {min} {max} {step} bind:value class="slider w-full" {id} />

<style lang="postcss">
	input[type='range'] {
		height: 24px;
		-webkit-appearance: none;
		margin: 10px 0;
		width: 100%;
        background: transparent;
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		animate: 0.2s;
		box-shadow: 0px 0px 0px #000000;
		background: #2497e3;
		border-radius: 18px;
		border: 0px solid #000000;
	}
	input[type='range']::-webkit-slider-thumb {
		box-shadow: 0px 0px 0px #000000;
		border: 0px solid #2497e3;
		height: 18px;
		width: 18px;
		border-radius: 15px;
		background: #a1d0ff;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -7px;
	}
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: #2497e3;
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		animate: 0.2s;
		box-shadow: 0px 0px 0px #000000;
		background: #2497e3;
		border-radius: 18px;
		border: 0px solid #000000;
	}
	input[type='range']::-moz-range-thumb {
		box-shadow: 0px 0px 0px #000000;
		border: 0px solid #2497e3;
		height: 18px;
		width: 18px;
		border-radius: 15px;
		background: #a1d0ff;
		cursor: pointer;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: 4px;
		cursor: pointer;
		animate: 0.2s;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background: #2497e3;
		border: 0px solid #000000;
		border-radius: 36px;
		box-shadow: 0px 0px 0px #000000;
	}
	input[type='range']::-ms-fill-upper {
		background: #2497e3;
		border: 0px solid #000000;
		border-radius: 36px;
		box-shadow: 0px 0px 0px #000000;
	}
	input[type='range']::-ms-thumb {
		margin-top: 1px;
		box-shadow: 0px 0px 0px #000000;
		border: 0px solid #2497e3;
		height: 18px;
		width: 18px;
		border-radius: 15px;
		background: #a1d0ff;
		cursor: pointer;
	}
	input[type='range']:focus::-ms-fill-lower {
		background: #2497e3;
	}
	input[type='range']:focus::-ms-fill-upper {
		background: #2497e3;
	}
</style>

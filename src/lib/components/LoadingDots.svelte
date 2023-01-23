<div>
	<span />
	<span />
	<span />
</div>

<style lang="postcss">
	div {
		@apply inline-flex text-center items-center leading-7;
	}

	span {
		@apply bg-zinc-200 rounded-full h-2 w-2;
		animation-name: blink;
		animation-duration: 1.4s;
		animation-iteration-count: infinite;
		animation-fill-mode: both;
		margin: 0 2px;
	}

	span:nth-of-type(2) {
		animation-delay: 0.2s;
	}

	span:nth-of-type(3) {
		animation-delay: 0.4s;
	}

	@keyframes blink {
		0% {
			opacity: 0.2;
		}
		20% {
			opacity: 1;
		}
		100% {
			opacity: 0.2;
		}
	}
</style>

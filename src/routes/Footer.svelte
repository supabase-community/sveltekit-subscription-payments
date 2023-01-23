<script lang="ts">
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import Logo from '$lib/components/icons/Logo.svelte';
</script>

<footer class="mx-auto max-w-[1920px] px-6 bg-zinc-900">
	<div
		class="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-zinc-600 py-12 text-white transition-colors duration-150 bg-zinc-900"
	>
		<div class="col-span-1 lg:col-span-2">
			<a href="/" class="flex flex-initial items-center font-bold md:mr-24">
				<span class="rounded-full border border-zinc-700 mr-2">
					<Logo />
				</span>
				<span>ACME</span>
			</a>
		</div>
		<div class="col-span-1 lg:col-span-2">
			<ul class="flex flex-initial flex-col md:flex-1">
				<li class="py-3 md:py-0 md:pb-4">
					<a href="/" class="text-white hover:text-zinc-200 transition ease-in-out duration-150">
						Home
					</a>
				</li>
				<li class="py-3 md:py-0 md:pb-4">
					<a href="/" class="text-white hover:text-zinc-200 transition ease-in-out duration-150">
						About
					</a>
				</li>
				<li class="py-3 md:py-0 md:pb-4">
					<a href="/" class="text-white hover:text-zinc-200 transition ease-in-out duration-150">
						Careers
					</a>
				</li>
				<li class="py-3 md:py-0 md:pb-4">
					<a href="/" class="text-white hover:text-zinc-200 transition ease-in-out duration-150">
						Blog
					</a>
				</li>
			</ul>
		</div>
		<div class="col-span-1 lg:col-span-2">
			<ul class="flex flex-initial flex-col md:flex-1">
				<li class="py-3 md:py-0 md:pb-4">
					<p class="text-white font-bold hover:text-zinc-200 transition ease-in-out duration-150">
						LEGAL
					</p>
				</li>
				<li class="py-3 md:py-0 md:pb-4">
					<a href="/" class="text-white hover:text-zinc-200 transition ease-in-out duration-150">
						Privacy Policy
					</a>
				</li>
				<li class="py-3 md:py-0 md:pb-4">
					<a href="/" class="text-white hover:text-zinc-200 transition ease-in-out duration-150">
						Terms of Use
					</a>
				</li>
			</ul>
		</div>
		<div class="col-span-1 lg:col-span-6 flex items-start lg:justify-end text-white">
			<div class="flex space-x-6 items-center h-10">
				<a
					aria-label="Github Repository"
					href="https://github.com/david-plugge/sveltekit-subscription-payments"
				>
					<GitHub />
				</a>
			</div>
		</div>
	</div>
	<div class="py-12 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-900">
		<div>
			<span>&copy; 2022 ACME, Inc. All rights reserved.</span>
		</div>
		<div class="flex items-center">
			<span class="text-white">Crafted by</span>
			<a href="https://github.com/david-plugge" aria-label="David Plugge GitHub Link">
				<img
					src="https://github.com/david-plugge.png"
					alt="Vercel.com Logo"
					class="inline-block h-6 ml-4 text-white"
				/>
			</a>
		</div>
	</div>
</footer>

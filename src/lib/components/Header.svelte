<script>
	import logo from '$lib/images/mainlogo.png';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div>
	<header>
		<nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
			<div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
				<a href="/" class="flex items-center">
					<img src={logo} alt="Logo" width="100" height="100" />
					<p>
						<span
							class="text-3xl bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
							>Resume Wizard</span
						>
					</p>
				</a>

				<div
					class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
					id="mobile-menu-2"
				>
					<ul
						class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:items-center"
					>
						<li>
							<a
								href="/collection"
								class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white no-underline"
								aria-current="page"
								style="text-decoration: none;"
							>
								Collection
							</a>
						</li>
						<li>
							<a
								href="/edit"
								class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 no-underline"
								style="text-decoration: none;"
							>
								Edit
							</a>
						</li>
						<a href="/profile">
							<Avatar
								border="border-4 border-surface-300-600-token hover:!border-primary-500"
								cursor="cursor-pointer"
								initials="JC"
							/>
						</a>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</div>

<style>
</style>

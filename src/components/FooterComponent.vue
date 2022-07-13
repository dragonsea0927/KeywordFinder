<template>
	<footer class="footer">
		<div class="container">
			<div class="content has-text-centered">
				<p>
					<span class="off"
						><strong>KeywordFinder</strong> ©{{ year }} | Version
						{{ version }} |
					</span>
					<a :href="repository" target="_blank">View on GitHub</a>
				</p>
			</div>
		</div>
	</footer>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import packageJson from '../../package.json';

export default defineComponent({
	name: 'FooterComponent',

	setup() {
		return {
			version: packageJson['version'],
			repository: packageJson['homepage'],
			year: new Date().getFullYear()
		};
	}
});
</script>

<style lang="sass">
@import '../css/mixin'

.footer
	display: flex
	width: 100%
	flex-direction: column
	align-items: center
	justify-content: center
	margin-top: 1rem
	margin-bottom: 1rem
	margin-left: 10rem
	margin-right: 10rem

	.container
		display: flex
		width: 100%
		flex-direction: column
		align-items: center
		justify-content: center
		margin-top: 1rem
		margin-bottom: 1rem
		margin-left: 10rem
		margin-right: 10rem

		.content
			display: flex
			width: 100%
			flex-direction: column
			align-items: center
			justify-content: center
			margin-top: 1rem
			margin-bottom: 1rem
			margin-left: 10rem
			margin-right: 10rem

			p
				font-size: 1.4rem
				margin-left: 0.2rem
				margin-right: 0.2rem
				margin-bottom: 0rem
				margin-top: 0.5rem
				color: #0085a6
				text-transform: uppercase

				.off
					@include noselect

				a
					color: #0085a6
					text-decoration: none
					&:hover
						color: #0085a6
						text-decoration: underline

						&:visited
							color: #0085
</style>

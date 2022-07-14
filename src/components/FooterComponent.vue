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
				<q-btn
					@click="confirmDelete = true"
					color="red"
					text-color="white"
					label="App zurücksetzen"
					class="app-reset-button"
				></q-btn>
			</div>
		</div>
		<q-dialog v-model="confirmDelete" persistent>
			<q-card>
				<q-card-section class="row items-center">
					<q-avatar
						icon="delete_forever"
						color="primary"
						text-color="white"
					></q-avatar>
					<span class="q-ml-sm"
						>Möchten Sie die App wirklich vollständig Zurücksetzen?</span
					>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="Abbrechen" color="black" v-close-popup></q-btn>
					<q-btn
						flat
						label="Löschen"
						color="red"
						@click="reset"
						v-close-popup
					></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import packageJson from '../../package.json';
import { Session } from 'src/controller/session';
import { ref } from 'vue';

export default defineComponent({
	name: 'FooterComponent',

	setup() {
		return {
			version: packageJson['version'],
			repository: packageJson['homepage'],
			year: new Date().getFullYear()
		};
	},

	data: () => {
		return {
			confirmDelete: ref(false)
		};
	},

	methods: {
		reset() {
			Session.resetSession();
		}
	}
});
</script>

<style lang="sass">
@import '../css/mixin'
@import '../css/color'

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

	.app-reset-button
		border-radius: 1rem
		margin-left: 1rem
		margin-right: 1rem
		margin-top: 1rem
		margin-bottom: 1rem
		cursor: pointer

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
				color: $main-color
				text-transform: uppercase

				.off
					@include noselect

				a
					color: $main-color
					text-decoration: none
					&:hover
						color: $main-color
						text-decoration: underline

						&:visited
							color: #0085
</style>

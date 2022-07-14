<template>
	<div class="header-wrapper">
		<div class="header-div row">
			<q-img src="../assets/Logo.svg" class="logo-img" />
			<h1>KeywordFinder</h1>
			<label>{{ version }}</label>
		</div>
		<div class="description-div text-left">
			Der KeywordFinder ist eine Anwendung, um Ausschreibungstexte schnell und
			effizient auszuwerten. Die Anwendung bietet die Möglichkeit, Texte in Form
			von TXT Files oder Strings zu erfassen. In diesem Text werden die zuvor
			definierten Tags entsprechend dem vordefiniertem Farbcode hervorgehoben.
		</div>
		<div id="message_container"></div>
	</div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import packageJson from '../../package.json';

export default defineComponent({
	name: 'HeaderComponent',

	setup() {
		return {
			version: packageJson['version']
		};
	}
});
</script>

<style lang="sass">
@import '../css/mixin'
@import '../css/message'

.header-wrapper
	margin-top: 2rem
	width: 80%

	.header-div
		text-align: left
		@include noselect

		.logo-img
			width: 6rem
			height: auto
			align-content: center

		h1
			font-size: 5rem
			font-weight: bold
			margin: 0 auto
			margin-left: 1rem
			margin-right: 0rem
			padding: auto

		label
			font-size: 1rem
			margin: 0 auto
			margin-left: 1rem
			margin-right: 0rem
			margin-top: 0.5rem
			padding: auto
			text-align: left
			width: 2.5rem

	.description-div
		max-width: 50rem
		margin: 1rem
		margin-right: 0
</style>

<template>
	<div class="impor-export-wrapper">
		<q-file
			class="q-pa-md json-field-upload"
			label="Upload JSON file"
			accept=".json"
			v-model="file"
			use-chips
			rounded
			auto-upload
			@rejected="onRejected"
		>
			<template v-slot:prepend>
				<q-icon name="upload_file"></q-icon>
			</template>
		</q-file>
		<div class="export">
			<q-btn @click="downloadProfile()"
				><q-icon name="download" class="cursor-pointer"></q-icon
			></q-btn>
		</div>
		<div class="import">
			<q-btn @click="uploadProfile()"
				><q-icon name="upload" class="cursor-pointer"></q-icon
			></q-btn>
		</div>
		<div class="vl"></div>
		<div class="export-multible">
			<q-btn @click="downloadProfile()"
				><q-icon name="download" class="cursor-pointer"></q-icon>all
				profiles</q-btn
			>
		</div>
		<div class="import-multible">
			<q-btn @click="uploadProfile()"
				><q-icon name="upload" class="cursor-pointer"></q-icon>multible
				profiles</q-btn
			>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';
import { QRejectedEntry } from 'quasar';
import { Session } from 'src/controller/session';

export default defineComponent({
	name: 'ImportExportComponent',

	data() {
		return {
			file: ref(null)
		};
	},

	methods: {
		downloadProfile() {
			const profile = Session.getProfileExportUrl();
			let a = document.createElement('a');
			a.href = profile;
			a.download = 'profile.json';
			a.click();
			URL.revokeObjectURL(profile);
		},

		downloadProfiles() {
			const profiles = Session.getProfilesExportUrl();
			let a = document.createElement('a');
			a.href = profiles;
			a.download = 'profiles.json';
			a.click();
			URL.revokeObjectURL(profiles);
		},

		uploadProfile() {
			const file = this.file;
			if (file) {
				const reader = new FileReader();
				reader.onload = () => {
					const data = <string>reader.result;
					Session.importProfileFromJson(data);
				};
				reader.readAsText(file);
			}
			Session.reloadSession();
		},

		uploadProfiles() {
			const file = this.file;
			if (file) {
				const reader = new FileReader();
				reader.onload = () => {
					const data = <string>reader.result;
					Session.importProfilesFromJson(data);
				};
				reader.readAsText(file);
			}
			Session.reloadSession();
		},

		onRejected(file: QRejectedEntry[]) {
			console.log('File rejected', file);
		}
	}
});
</script>
<style lang="sass" scoped>

.impor-export-wrapper
	display: flex
	flex-direction: row
	max-width: 50rem

	.json-field-upload
		min-width: 20rem
		margin-bottom: 0.5rem

	.export
		flex: 1
		display: flex
		flex-direction: column

		button
			margin: 0.5rem
			padding: 0.7rem
			background-color: #1976d2
			color: white
			width: 3rem
			height: 3rem
			border-radius: 2rem

	.import
		flex: 1
		display: flex
		flex-direction: column

		button
			margin: 0.5rem
			padding: 0.7rem
			background-color: #1976d2
			color: white
			width: 3rem
			height: 3rem
			border-radius: 2rem

	.vl
		border-left: 6px solid lightgrey
		height: 4rem
		border-radius: 2rem

	.export-multible

		button
			margin: 0.5rem
			padding: 0.7rem
			background-color: #1976d2
			color: white
			height: 3rem
			width: 10rem
			border-radius: 1rem

	.import-multible

		button
			margin: 0.5rem
			padding: 0.7rem
			background-color: #1976d2
			color: white
			height: 3rem
			width: 12rem
			border-radius: 1rem
</style>

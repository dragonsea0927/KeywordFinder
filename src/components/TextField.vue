<template>
	<q-form class="text-field-form">
		<q-file
			class="q-pa-md text-field-upload"
			label="Upload [Beschränkt auf Textdateien]"
			accept=".txt"
			v-model="file"
			@update:model-value="onFileInput"
			use-chips
			rounded
			auto-upload
			@rejected="onRejected"
		>
			<template v-slot:prepend>
				<q-icon name="upload_file"></q-icon>
			</template>
		</q-file>
		<form
			autocorrect="off"
			autocapitalize="off"
			autocomplete="off"
			spellcheck="false"
		>
			<q-editor
				v-model="text"
				class="text-field-input scroll"
				@update:model-value="(val) => onInput(val)"
				:toolbar="[
					[
						{
							label: $q.lang.editor.align,
							icon: $q.iconSet.editor.align,
							fixedLabel: true,
							options: ['left', 'center', 'right', 'justify']
						}
					],
					['bold', 'italic', 'strike', 'underline'],
					['fullscreen']
				]"
			></q-editor>
		</form>
	</q-form>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { Session } from 'src/controller/session';
import { Category } from 'src/models/CategoryModel';
import { defineComponent, ref } from 'vue';
import ContentFileReader from 'src/controller/contentFileReader';
import { Helper } from 'src/controller/helper';
import StringController from 'src/controller/string';

export default defineComponent({
	name: 'TextField',

	setup() {
		const $q = useQuasar();
		const session = Session.getInstance();

		return {
			file: ref(null),
			text: ref(''),
			tempText: ref(''),
			session: ref(session),

			onRejected(rejectedEntries: string | unknown[]) {
				$q.notify({
					type: 'negative',
					message: `${rejectedEntries.length} file(s) did not pass validation constraints`
				});
			}
		};
	},

	mounted() {
		this.rerender(this.session);
	},

	methods: {
		onInput(value: string) {
			this.text = this.generateFilteredTextForCategories(
				StringController.getInstance().purgeHtml(value)
			);
		},

		async onFileInput(f: File) {
			const content = new ContentFileReader(f);
			this.text = this.generateFilteredTextForCategories(
				StringController.getInstance().purgeHtml(await content.getContent())
			);
		},

		async rerender(object: Session) {
			while (object) {
				this.text = this.generateFilteredTextForCategories(
					StringController.getInstance().purgeAll(this.text)
				);
				await Helper.sleep(1000);
			}
		},

		generateFilteredText(
			categorie: Category,
			color: string,
			text: string
		): string {
			let filteredText = text.replaceAll('&', '');
			filteredText = filteredText.replaceAll('\\', '');
			let brightness = '';
			if (Helper.isDark(color)) {
				brightness = 'color:white';
			}

			categorie.tags.forEach((tag) => {
				let filter = '\\b' + tag + '\\b';
				filteredText = filteredText.replace(
					new RegExp(filter, 'gi'),
					`<span title="${categorie.name}" style="background-color: ${color}; ${brightness}">${tag}</span>`
				);
			});

			return filteredText;
		},

		generateFilteredTextForCategory(category: Category, text: string): string {
			const color = category.color;
			return this.generateFilteredText(category, color, text);
		},

		generateFilteredTextForCategories(text: string): string {
			let filteredText = text;

			this.session.currentProfile.categories.forEach((category) => {
				filteredText = this.generateFilteredTextForCategory(
					category,
					filteredText
				);
			});

			return filteredText;
		}
	}
});
</script>

<style lang="sass" scoped>
.text-field-form
	width: 80%
	box-shadow: 5px 5px 5px -2px rgba(0, 0, 0, 0.15)
	border-radius: 0.7rem
	border-color: lightgrey
	border-style: solid
	border-width: thin
	height: 100%
	min-height: 30rem

	.text-field-upload
		width: 100%
		height: auto
		box-shadow: none
		background-color: none

	.text-field-input
		width: 98%
		border-style: none
		box-shadow: none
		padding: 0
		margin: 0 auto
		max-height: 30rem
</style>

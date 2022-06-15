<template>
	<div class="category">
		<q-input borderless v-model="name" @change="updateName" label="Name">
			<template v-slot:append>
				<div
					class="color-circle"
					:style="{
						'background-color': color
					}"
				></div>
				<q-icon name="colorize" class="cursor-pointer">
					<q-popup-proxy cover transition-show="scale" transition-hide="scale">
						<q-color v-model="color" @change="changeColor"></q-color>
					</q-popup-proxy>
				</q-icon> </template
		></q-input>
		<div class="q-pa-md">
			<q-input
				v-model="newTag"
				label="Neuer Tag..."
				@keyup.enter="addTag(newTag)"
			></q-input>
			<div class="tag-zone row">
				<q-chip
					removable
					@remove="deleteTag(tag)"
					v-for="tag in category.tags"
					:key="tag"
				>
					{{ tag }}
				</q-chip>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from '@vue/runtime-core';
import { Session } from 'src/controller/session';
import { Category } from 'src/models/CategoryModel';

const session: Session = Session.getInstance();

export default defineComponent({
	name: 'CategorySubComponent',

	props: {
		profileId: {
			type: String,
			required: true
		},
		categoryId: {
			type: String,
			required: true
		}
	},

	data: () => {
		return {
			newTag: ref(''),
			category: ref<Category>(new Category('', '', '', [])),
			name: ref(''),
			color: ref('')
		};
	},

	mounted() {
		const cat: Category =
			session.profiles
				?.find((e) => e.id === this.profileId)
				?.categories?.find((e) => e.id === this.categoryId) ??
			new Category('', '', '', []);
		this.category = cat;
		this.name = this.category.name;
		this.color = this.category.color;
	},

	methods: {
		addTag(tag: string) {
			tag = tag.trim();
			let allTags: string[] = [];

			session.profiles
				?.find((e) => e.id === this.profileId)
				?.categories.forEach((e) => {
					e.tags.forEach((t) => {
						allTags.push(t);
					});
				});

			if (tag && !allTags.includes(tag) && tag.length > 0 && tag.length <= 30) {
				this.category?.tags.push(tag);
				this.newTag = '';
			}
		},

		deleteTag(tag: string) {
			const newTags = this.category?.tags.slice(0);
			if (this.category && newTags) {
				newTags.splice(newTags.indexOf(tag), 1);
				this.category.tags = newTags;
			}
		},

		updateName() {
			this.name = this.name.trim();
			if (this.name === '') {
				this.name = this.category.name;
			} else {
				if (
					session.profiles
						?.find((e) => e.id === this.profileId)
						?.categories.find((e) => e.name === this.name)
				) {
					this.name = this.category.name;
					return;
				}
				this.category.name = this.name;
			}
		},

		changeColor() {
			this.category.color = this.color;
		}
	}
});
</script>

<style lang="scss">
.color-circle {
	width: 1.2rem;
	height: 1.2rem;
	border-radius: 50%;
	display: inline-block;
	margin-right: 8px;
}

.tag-zone {
	margin-bottom: 8px;
	width: 100%;
	display: flexbox;

	.q-field__control {
		padding: 0;
		min-height: 10rem;
	}
}
</style>

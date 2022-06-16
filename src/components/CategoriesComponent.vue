<template>
	<div class="categories">
		<div class="categories-title">
			<h4>Profile</h4>
		</div>
		<div class="row">
			<q-select
				filled
				:model-value="profile.name"
				:options="options"
				@update:model-value="(val) => onInput(val)"
				hint="Wählen Sie ein Profil"
				class="col-3"
			></q-select>
			<q-btn
				color="red"
				text-color="white"
				label="Löschen"
				@click="confirmDelete = true"
			></q-btn>
			<q-btn
				class="editProfileName"
				text-color="black"
				label="Umbenennen"
				@click="prepareUpdateName"
			></q-btn>
			<q-btn
				color="blue"
				text-color="white"
				label="Neu"
				@click="newProfile"
			></q-btn>
		</div>
		<q-dialog v-model="confirmDelete" persistent>
			<q-card>
				<q-card-section class="row items-center">
					<q-avatar
						icon="delete_forever"
						color="primary"
						text-color="white"
					></q-avatar>
					<span class="q-ml-sm">Möchten Sie das Profil wirklich löschen?</span>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="Abbrechen" color="black" v-close-popup></q-btn>
					<q-btn
						flat
						label="Löschen"
						color="red"
						@click="deleteProfile"
						v-close-popup
					></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>
		<q-dialog v-model="updateProfileName" persistent>
			<q-card style="min-width: 350px">
				<q-card-section>
					<div class="text-h6">Profilname</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					<q-input
						dense
						v-model="updateName"
						autofocus
						@keyup.enter="prompt = false"
					></q-input>
				</q-card-section>

				<q-card-actions align="right" class="text-primary">
					<q-btn
						flat
						color="black"
						label="Abbrechen"
						@click="revertNameChanges"
						v-close-popup
					></q-btn>
					<q-btn
						flat
						color="green"
						label="Speichern"
						@click="saveNameChanges"
						v-close-popup
					></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>
		<div class="row category-container">
			<div class="row category-controls">
				<p class="col-3">Kategorien</p>
				<q-btn
					color="grey col-4"
					text-color="black"
					label="Kategorie hinzufügen"
					@click="addCategory"
				></q-btn>
			</div>
			<div class="row category-body">
				<template v-for="item in profile.categories" :key="item.id">
					<div class="category-item">
						<CategorySubComponent
							:categoryId="item.id"
							:profileId="profile.id"
						></CategorySubComponent>
						<q-btn
							class="deleteCategorie"
							color="red"
							icon="delete"
							@click="
								confirmDeleteCategory = true;
								deleteCategoryItem = item;
							"
						></q-btn>
						<q-dialog v-model="confirmDeleteCategory" persistent>
							<q-card>
								<q-card-section class="row items-center">
									<q-avatar
										icon="delete_forever"
										color="primary"
										text-color="white"
									></q-avatar>
									<span class="q-ml-sm"
										>Möchten Sie die Kategorie wirklich löschen?</span
									>
								</q-card-section>

								<q-card-actions align="right">
									<q-btn
										flat
										label="Abbrechen"
										color="back"
										v-close-popup
									></q-btn>
									<q-btn
										flat
										label="Löschen"
										color="red"
										@click="
											deleteCategorie(deleteCategoryItem);
											confirmDeleteCategory = false;
										"
										v-close-popup
									></q-btn>
								</q-card-actions>
							</q-card>
						</q-dialog>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Category } from 'src/models/CategoryModel';
import { Profile } from 'src/models/ProfileModel';
import CategorySubComponent from './CategorySubComponent.vue';
import { Helper } from 'src/controller/helper';
import { Session } from 'src/controller/session';
import { ref, defineComponent } from 'vue';

export default defineComponent({
	name: 'CategoriesComponent',

	components: {
		CategorySubComponent
	},

	data: () => {
		let session: Session = Session.getInstance();

		return {
			options: ref(Array.from(session.profiles, (e) => e.name)),
			profiles: ref(session.profiles),
			profile: ref(session.profiles[0]),
			confirmDelete: ref(false),
			confirmDeleteCategory: ref(false),
			deleteCategoryItem: ref(new Category('', '', '', [])),
			confirmSave: ref(false),
			updateProfileName: ref(false),
			filterOptions: ref(Array.from(session.profiles, (e) => e.name)),
			updateName: ref('')
		};
	},

	methods: {
		onInput(value: string) {
			this.profile = <Profile>this.profiles.find((e) => e.name === value);
			let session = Session.getInstance();

			session.setCurrentProfile(this.profile);
			Session.save();
		},

		prepareUpdateName() {
			this.updateName = this.profile.name;
			this.updateProfileName = true;
		},

		saveNameChanges() {
			this.updateName = this.updateName.trim();
			if (this.updateName === '') {
				this.updateName = this.profile.name;
			}
			this.profile.name = this.updateName;
			this.updateProfileName = false;
			this.saveProfile();
			Session.save();
		},

		revertNameChanges() {
			this.updateName = this.profile.name;
			this.updateProfileName = false;
		},

		updateSelect() {
			this.options = Array.from(this.profiles, (e) => e.name);
		},

		createValue(val: string, done: (val: string, done: string) => void) {
			if (val.length > 0) {
				if (!this.options.includes(val)) {
					this.options.push(val);
				}
				done(val, 'toggle');
			}
		},

		deleteProfile() {
			this.profiles.splice(this.profiles.indexOf(this.profile), 1);
			let session = Session.getInstance();

			if (this.profiles.length === 0) {
				const prof = new Profile('Default 1');
				prof.addCategory(
					new Category(
						Helper.getUUID(),
						'Kategorie 1',
						Helper.getRandomColor(),
						[]
					)
				);
				this.profiles.push(prof);
			}

			this.profile = this.profiles[0];
			session.setCurrentProfile(this.profile);
			this.options = Array.from(this.profiles, (e) => e.name);
			Session.save();
		},

		saveProfile() {
			this.profiles.splice(
				this.profiles.indexOf(this.profile),
				1,
				this.profile
			);
			let session = Session.getInstance();
			session.setCurrentProfile(this.profile);
			this.updateSelect();
			Session.save();
		},

		newProfile() {
			let pName = 'Default ' + (this.profiles.length + 1);
			let pNameList = this.profiles.map((e) => e.name);
			let newNumber = Helper.getHighestNumberFromStringArray(pNameList) + 1;
			let session = Session.getInstance();

			if (pNameList.includes(pName)) {
				pName = 'Default ' + newNumber;
			}

			this.profile = new Profile(pName);

			this.profiles.push(this.profile);

			session.setCurrentProfile(this.profile);

			this.updateSelect();
			Session.save();
		},

		addCategory() {
			let catName: string = 'Kategorie ' + (this.profile.categories.length + 1);
			let catNames = this.profile.categories.map((e) => e.name);
			let newNumber = Helper.getHighestNumberFromStringArray(catNames) + 1;
			let session = Session.getInstance();

			if (catNames.includes(catName)) {
				catName = 'Kategorie ' + newNumber;
			}

			this.profile.addCategory(
				new Category(Helper.getUUID(), catName, Helper.getRandomColor(), [])
			);

			session.setCurrentProfile(this.profile);
			Session.save();
		},

		deleteCategorie(category: Category) {
			let session = Session.getInstance();
			this.profile.deleteCategorie(category);
			session.setCurrentProfile(this.profile);
			Session.save();
		}
	}
});
</script>

<style lang="scss" scoped>
@import '../css/mixin';

.categories {
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: left;
	justify-content: left;
	margin-top: 1rem;
	margin-bottom: 1rem;
	margin-left: 10rem;
	margin-right: 10rem;

	.row {
		button {
			margin-left: 1rem;
			margin-right: 1rem;
			max-height: 3rem;
			margin-top: 0.3rem;
		}
	}

	.category-container {
		display: flex;
		width: 100%;
		border: 1px solid #ccc;
		padding: 1.5rem;
		border-radius: 0.5rem;
		flex-direction: row;
		align-items: left;
		justify-content: left;
		margin-top: 1rem;
		margin-bottom: 1rem;

		.category-controls {
			display: flex;
			flex-direction: row;
			width: 100%;
			margin-bottom: 2rem;
			padding-bottom: 2rem;
			border-bottom: solid 1px #ccc;

			p {
				font-size: 1.7rem;
				margin-left: 0.2rem;
				margin-right: 0.2rem;
				margin-bottom: 0rem;
				margin-top: 0.5rem;
				color: #0085a6;
				@include noselect;
				text-transform: uppercase;
			}
		}
	}

	.categories-title {
		display: block;
		flex-direction: row;
		width: 100%;
		font-size: 1.5rem;
		height: 6rem;
		font-weight: bold;
		color: #0085a6;
		text-transform: uppercase;
		@include noselect;
	}

	.category-item {
		border: 1px solid #ccc;
		padding: 1.5rem;
		border-radius: 0.5rem;
		margin-right: 1rem;
		margin-bottom: 1rem;
		width: 24rem;
	}

	.deleteCategories {
		display: block;
		flex-direction: row;
		width: 100%;
		font-size: 1.5rem;
		height: 6rem;
		font-weight: bold;
		color: #0085a6;
		text-transform: uppercase;
	}

	.editProfileName {
		background-color: #ffc107;
	}
}
</style>

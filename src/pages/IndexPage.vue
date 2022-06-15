<template>
	<q-page class="row items-center justify-evenly">
		<HeaderComponent />
		<TextField />
		<CategoriesComponent />
	</q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextField from 'components/TextField.vue';
import HeaderComponent from 'components/HeaderComponent.vue';
import CategoriesComponent from 'components/CategoriesComponent.vue';

export default defineComponent({
	name: 'IndexPage',
	components: {
		TextField,
		HeaderComponent,
		CategoriesComponent
	}
});
</script>

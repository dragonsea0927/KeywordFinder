import { H } from 'friendly-helper';
import { Category } from './CategoryModel';

/**
 * Profile model
 */
export class Profile {

	/**
	 * Id  of profile
	 */
	public id: string;

	/**
	 * Name  of profile
	 */
	public name: string;

	/**
	 * Profile  of categories
	 */
	public categories: Array<Category>;

	/**
	 * Creates an instance of Profile.
	 */
	constructor(name: string) {
		this.categories = [];
		this.id = H.guid.generate();
		this.name = name;
	}

	/**
	 * Adds category
	 * @param category
	 */
	addCategory(category: Category) {
		this.categories.push(category);
	}

	/**
	 * Adds multiple categories
	 * @param categories
	 */
	addMultipleCategories(categories: Array<Category>) {
		this.categories = this.categories.concat(categories);
	}

	/**
	 * Deletes category
	 * @param category
	 */
	deleteCategorie(categorie: Category) {
		this.categories = this.categories.filter(cat => cat.id !== categorie.id);
	}

	/**
	 * Deletes multiple categories
	 * @param categories
	 */
	deleteMultipleCategories(categories: Array<Category>) {
		this.categories = this.categories.filter(cat => !categories.includes(cat));
	}

}

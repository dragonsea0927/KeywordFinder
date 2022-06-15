/**
 * Categorie model
 */
export class Category {

	/**
	 * Id  of categorie
	 */
	public id: string;

	/**
	 * Name  of categorie
	 */
	public name: string;

	/**
	 * Color  of categorie
	 */
	public color: string;

	/**
	 * Flags  of categorie
	 */
	public tags: Array<string>;

	/**
	 * Creates an instance of categorie.
	 * @param id
	 * @param name
	 * @param color
	 * @param tags
	 */
	constructor(id: string, name: string, color: string, tags: Array<string>) {
		this.id = id;
		this.name = name;
		this.color = color;
		this.tags = tags;
	}
}

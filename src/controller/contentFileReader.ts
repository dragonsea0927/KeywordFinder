/**
 * Content file reader
 */
export default class ContentFileReader {

	/**
	 * File  of content file reader
	 */
	private file: File;

	/**
	 * Creates an instance of content file reader.
	 * @param file
	 */
	constructor(file: File) {
		this.file = file;
	}

	/**
	 * Gets content
	 * @returns content
	 */
	public async getContent(): Promise<string> {
		return new Promise<string>((resolve) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result as string);
			};
			try {
				reader.readAsText(this.file);
			}
			catch (e) {
				resolve('');
			}
		});
	}
}

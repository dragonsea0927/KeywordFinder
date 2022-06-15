/**
 * Helper
 */
export class Helper {

	/**
	 * Gets random int
	 * @param min
	 * @param max
	 * @returns random int
	 */
	static getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Gets random float
	 * @param min
	 * @param max
	 * @returns random float
	 */
	static getRandomFloat(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}

	/**
	 * Gets random boolean
	 * @returns true if random boolean
	 */
	static getRandomBoolean(): boolean {
		return Math.random() >= 0.5;
	}

	/**
	 * Gets random string
	 * @param length
	 * @returns random string
	 */
	static getRandomString(length: number): string {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	/**
	 * Gets random words
	 * @param length
	 * @returns random words
	 */
	static getRandomWords(length: number): string[] {
		const result: string[] = [];
		const words = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(' ');
		for (let i = 0; i < length; i++) {
			result.push(words[Helper.getRandomInt(0, words.length - 1)]);
		}
		return result;
	}

	/**
	 * Gets lorem ipsum
	 * @param length
	 * @returns lorem ipsum
	 */
	static getLoremIpsum(length: number): string {
		const result = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(' ');
		let resultString = '';
		for (let i = 0; i < length; i++) {
			resultString += result[Helper.getRandomInt(0, result.length - 1)] + ' ';
		}
		return resultString;
	}

	/**
	 * Gets random word
	 * @returns random word
	 */
	static getRandomWord(): string {
		const words = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(' ');
		return words[Helper.getRandomInt(0, words.length - 1)];
	}

	/**
	 * Gets random string array
	 * @param length
	 * @returns random string array
	 */
	static getRandomStringArray(length: number, number: number): string[] {
		const result: string[] = [];
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < number; i++) {
			result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
		}
		return result;
	}

	/**
	 * Gets random color
	 * @returns random color
	 */
	static getRandomColor(): string {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	/**
	 * Gets uuid
	 * @returns uuid
	 */
	static getUUID(): string {
		let d = new Date().getTime();
		if (window.performance && typeof window.performance.now === 'function') {
			d += performance.now();
		}
		const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			const r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	}

	/**
	 * Gets numbers from string
	 * @param string
	 * @returns numbers from string
	 */
	static getNumbersFromString(string: string): number[] {
		const result: number[] = [];
		const numbers = string.toLowerCase().match(/\d+/g);
		if (numbers) {
			for (let i = 0; i < numbers.length; i++) {
				result.push(parseInt(numbers[i], 10));
			}
		}
		return result;
	}

	/**
	 * Gets highest number from array
	 * @param array
	 * @returns highest number from array
	 */
	static getHighestNumberFromArray(array: number[]): number {
		let highestNumber = 0;
		for (let i = 0; i < array.length; i++) {
			if (array[i] > highestNumber) {
				highestNumber = array[i];
			}
		}
		return highestNumber;
	}

	/**
	 * Gets highest number from string array
	 * @param array
	 * @returns highest number from string array
	 */
	static getHighestNumberFromStringArray(array: string[]): number {
		const numbers = [];
		let highestNumber = 0;
		for (let i = 0; i < array.length; i++) {
			numbers.push(this.getNumbersFromString(array[i]));
		}

		for (let i = 0; i < numbers.length; i++) {
			if (numbers[i].length > 0) {
				const highestNumberFromArray = this.getHighestNumberFromArray(numbers[i]);
				if (highestNumberFromArray > highestNumber) {
					highestNumber = highestNumberFromArray;
				}
			}
		}
		return highestNumber;

	}

	/**
	 * Strips html
	 * @param html
	 * @returns html
	 */
	static stripHTML(html: string): string {
		return html.replace(/<(?:.|\n)*?>/gm, '');
	}

	/**
	 * Pauses execution
	 * @param ms
	 * @returns
	 */
	static sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * Hexs to rgb
	 * @param hex
	 * @returns to rgb
	 */
	static hexToRgb(hex: string): string {
		// Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : '';
	}

	/**
	 * Determines if a rgb value is dark
	 * @param rgb
	 * @returns true if dark rgb
	 */
	static isDarkRgb(rgb: string): boolean {
		const rgbArray = rgb.split(',');
		const r = parseInt(rgbArray[0].replace('rgb(', '').trim(), 10);
		const g = parseInt(rgbArray[1].trim(), 10);
		const b = parseInt(rgbArray[2].replace(')', '').trim(), 10);
		const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
		return (yiq >= 128);
	}

	/**
	 * Colors light or dark
	 * @param color
	 * @returns light or dark
	 */
	static colorLightOrDark(color: string): string {
		if (!this.isDarkRgb(this.hexToRgb(color))) {
			return 'dark';
		}
		return 'light';
	}
}

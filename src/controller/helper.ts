export class Helper {
  public static async sleep(timeout: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }
  public static generateRandomHex(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  public static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public static generateWordArray(length: number): string[] {
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(this.generateWord());
    }
    return result;
  }

  public static generateWord(): string {
    const length = this.generateRandomNumber(3, 10);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.generateRandomChar();
    }
    return result;
  }

  public static generateRandomChar(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return chars[this.generateRandomNumber(0, chars.length - 1)];
  }

  public static getHighestNumberFromStringArray(array: string[]): number {
    const numbers = array.map((a) => parseInt(a, 10));
    return Math.max(...numbers);
  }

  public static isDark(hex: string): boolean {
    return this.getLuminance(hex) < 0.5;
  }

  public static getLuminance(hex: string): number {
    const rgb = this.hexToRgb(hex);
    return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
  }

  public static hexToRgb(hex: string): { r: number; g: number; b: number } {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  }

  public static rgbToHex(rgb: { r: number; g: number; b: number }): string {
    return (
      '#' +
      this.componentToHex(rgb.r) +
      this.componentToHex(rgb.g) +
      this.componentToHex(rgb.b)
    );
  }

  public static componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  public static getContrastYIQ(hexcolor: string): string {
    const rgb = this.hexToRgb(hexcolor);
    const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#ffffff';
  }
}

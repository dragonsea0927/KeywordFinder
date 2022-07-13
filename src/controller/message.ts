import { H } from 'friendly-helper';
import { MessageType } from 'src/types/MessageType';

/**
 * Message
 */
export default class Message {

	/**
	 * Shows message
	 * @param message
	 * @param type
	 */
	private show(message: string, type: MessageType) {
		const messageElement = this.renderMessage(message, type);
		const messageContainer = <HTMLDivElement>document.getElementById('message_container');
		messageContainer.appendChild(messageElement);
		H.general.sleep(5000).then(() => {
			messageContainer.removeChild(messageElement);
		});
	}

	/**
	 * Renders message
	 * @param message
	 * @param type
	 * @returns
	 */
	private renderMessage(message: string, type: MessageType) {
		const messageElement = document.createElement('div');
		let prefix = '';

		switch (type) {
			case 'success':
				prefix = '<span class="material-icons">check_circle</span>';
				break;
			case 'error':
				prefix = '<span class="material-icons">error</span>';
				break;
			case 'warning':
				prefix = '<span class="material-icons">warning</span>';
				break;
			case 'info':
				prefix = '<span class="material-icons">info</span>';
				break;
		}

		messageElement.innerHTML = prefix + ' - ' + message;
		messageElement.className = type + '_message';
		messageElement.style.display = 'block';
		return messageElement;
	}

	/**
	 * Success message
	 * @param message
	 */
	public success(message: string) {
		this.show(message, 'success');
	}

	/**
	 * Errors message
	 * @param message
	 */
	public error(message: string) {
		this.show(message, 'error');
	}

	/**
	 * Warning message
	 * @param message
	 */
	public warning(message: string) {
		this.show(message, 'warning');
	}

	/**
	 * Infos message
	 * @param message
	 */
	public info(message: string) {
		this.show(message, 'info');
	}
}

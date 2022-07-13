import { Category } from 'src/models/CategoryModel';
import { Profile } from 'src/models/ProfileModel';
import { H } from 'friendly-helper'
import Message from './message';

/**
 * Session
 */
export class Session {

	/**
	 * Instance  of session
	 */
	private static instance: Session;

	/**
	 * Gets instance
	 * @returns
	 */
	static getInstance() {
		if (!Session.instance && !Session.load()) {
			Session.instance = new Session();
		}
		if (!Session.instance && Session.load()) {
			Session.instance = <Session>Session.load();
		}
		Session.save();
		return Session.instance;
	}

	/**
	 * Creates an instance of session.
	 */
	private constructor() {
		this.profiles = new Array<Profile>();

		for (let i = 1; i < 4; i++) {
			const profile = new Profile('Default ' + i);
			for (let i = 1; i < 4; i++) {
				profile.addCategory(
					new Category(
						H.guid.generate(),
						'Kategorie ' + i,
						H.color.generateRandomHex(),
						H.random.generateWordsArray(H.random.generateNumber(1, 10))
					)
				);
			}
			this.profiles.push(profile);
		}

		this.currentProfile = this.profiles[0];
	}

	/**
	 * Sets instance to local storage
	 */
	public static save() {
		localStorage.setItem('session', JSON.stringify(this.instance));
	}

	/**
	 * Gets instance from local storage
	 * @returns
	 */
	public static load(): Session | null {
		const session = localStorage.getItem('session');
		if (session) {
			const obj = <Session>JSON.parse(session);
			const result = new Session();
			result.profiles = obj.profiles;
			result.currentProfile = obj.currentProfile;
			return result;
		}
		return null;
	}

	/**
	 * Reloads session
	 */
	public static reloadSession() {
		const session = localStorage.getItem('session');
		if (session) {
			const obj = <Session>JSON.parse(session);
			const result = new Session();
			result.profiles = obj.profiles;
			result.currentProfile = obj.currentProfile;
			Session.instance = result;
		}
	}

	/**
	 * Gets profile export url
	 * @returns profile export url
	 */
	public static getProfileExportUrl(): string {
		let content = JSON.stringify(this.instance.currentProfile);
		content = encodeURIComponent(content);
		return 'data:application/json;charset=utf-8,' + content;
	}

	/**
	 * Gets profiles export url
	 * @returns profiles export url
	 */
	public static getProfilesExportUrl(): string {
		let content = JSON.stringify(this.instance.profiles);
		content = encodeURIComponent(content);
		return 'data:application/json;charset=utf-8,' + content;
	}

	/**
	 * Imports profile from json
	 * @param json
	 */
	public static importProfileFromJson(json: string) {
		const profile = <Profile>JSON.parse(json);
		const msg = new Message();

		if (this.instance.profiles.find(p => p.name === profile.name)) {
			msg.error('Profile with name ' + profile.name + ' already exists');
			return;
		}

		if (this.instance.profiles.find(p => p.id === profile.id)) {
			msg.error('Profile with id ' + profile.id + ' already exists');
			return;
		}

		this.instance.profiles.push(profile);
		this.instance.currentProfile = profile;
		Session.save();
	}

	/**
	 * Imports profiles from json
	 * @param json
	 */
	public static importProfilesFromJson(json: string) {
		const profiles = <Array<Profile>>JSON.parse(json);

		profiles.forEach(profile => {
			if (
				!this.instance.profiles.find(p => p.name === profile.name)
				&& !this.instance.profiles.find(p => p.id === profile.id)
			) {
				this.instance.profiles.push(profile);
				this.instance.currentProfile = profile;
			}

		});
		Session.save();
		Session.reloadSession();
	}

	/**
	 * Session id of session
	 */
	public readonly sessionId: string = H.guid.generate();

	/**
	 * Profiles  of session
	 */
	public profiles: Array<Profile>;

	/**
	 * Active profile of session
	 */
	public currentProfile: Profile;

	/**
	 * Sets current profile
	 * @param profile
	 */
	setCurrentProfile(profile: Profile) {
		if (this.profiles.find(p => p.name === profile.name)) {
			this.currentProfile = <Profile>this.profiles.find(p => p.name === profile.name);
		} else {
			this.currentProfile = this.profiles[0];
		}
		Session.save();
		Session.reloadSession();
	}

}

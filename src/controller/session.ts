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

	private static msg = new Message();

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

		const profile = new Profile('Default');

		let words = H.random.generateWordArray(H.random.generateNumber(1, 10));

		words = words.filter(w => !!w);

		profile.addCategory(
			new Category(
				H.guid.generate(),
				'Kategorie 1',
				H.color.generateRandomHex(),
				words
			)
		);

		this.profiles.push(profile);
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
			result.profiles = Session.reBuildProfiles(obj.profiles);
			result.currentProfile = Session.reBuildProfile(obj.currentProfile);
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
			result.profiles = Session.reBuildProfiles(obj.profiles);
			result.currentProfile = Session.reBuildProfile(obj.currentProfile);
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
	 * Re build profile
	 * @param data
	 * @returns
	 */
	private static reBuildProfile(data: Profile) {
		const profile = new Profile(data.name);
		profile.id = data.id;
		profile.categories = data.categories;
		return profile;
	}

	/**
	 * Re build profiles
	 * @param data
	 * @returns
	 */
	private static reBuildProfiles(data: Array<Profile>) {
		const profiles = new Array<Profile>();
		for (let i = 0; i < data.length; i++) {
			profiles.push(Session.reBuildProfile(data[i]));
		}
		return profiles;
	}

	/**
	 * Imports profile from json
	 * @param json
	 */
	public static importProfileFromJson(json: string) {
		const data = <Profile>JSON.parse(json);

		if (!data.id || !data.name || !data.categories) {
			this.msg.error('Import fehlgeschlagen');
			return;
		}

		const profile = Session.reBuildProfile(data);

		if (this.instance.profiles.find(p => p.name === profile.name)) {
			this.msg.error('Profile with name ' + profile.name + ' already exists');
			return;
		}

		if (this.instance.profiles.find(p => p.id === profile.id)) {
			this.msg.error('Profile with id ' + profile.id + ' already exists');
			return;
		}

		this.instance.profiles.push(profile);
		this.instance.currentProfile = profile;
		Session.save();
		location.reload();
		this.msg.success('Profile wurde importiert');
	}

	/**
	 * Imports profiles from json
	 * @param json
	 */
	public static importProfilesFromJson(json: string) {
		const profiles = <Array<Profile>>JSON.parse(json);

		try {

			profiles.forEach(data => {

				if (!data.id || !data.name || !data.categories) {
					this.msg.error('Import fehlgeschlagen');
					return;
				}

				const profile = Session.reBuildProfile(data);
				if (
					!this.instance.profiles.find(p => p.name === profile.name)
					&& !this.instance.profiles.find(p => p.id === profile.id)
				) {
					this.instance.profiles.push(profile);
					this.instance.currentProfile = profile;
				}

			});

		} catch {
			this.msg.error('Import fehlgeschlagen');
		}
		Session.save();
		location.reload();
		this.msg.success('Profile wurde importiert');
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
	public setCurrentProfile(profile: Profile) {
		if (this.profiles.find(p => p.name === profile.name)) {
			this.currentProfile = <Profile>this.profiles.find(p => p.name === profile.name);
		} else {
			this.currentProfile = this.profiles[0];
		}
		Session.save();
	}

	/**
	 * Resets session
	 */
	public static resetSession() {
		localStorage.removeItem('session');
		sessionStorage.removeItem('session');
		this.instance = new Session();
		Session.save();
		location.reload();
		this.msg.info('Session wurde zurückgesetzt');
	}

}

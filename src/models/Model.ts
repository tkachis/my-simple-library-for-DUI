import { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

interface ModelAttributes<T> {
	set(value: T): void;
	getAll(): T;
	get<K extends keyof T>(key: K): T[K];
}

interface ApiSync<T> {
	fetch(id: number): AxiosPromise;
	save(data: T): AxiosPromise;
}

interface Events {
	on(eventName: string, callback: () => void): void;
	trigger(eventName: string): void;
}

interface HasId {
	id?: number;
}

export class Model<T extends HasId> {
	constructor(
		private attributes: ModelAttributes<T>,
		private events: Events,
		private sync: ApiSync<T>
	) {}

	// get on() {
	// 	return this.events.on;
	// }

	on = this.events.on;
	trigger = this.events.trigger;
	get = this.attributes.get;

	set(update: T): void {
		this.attributes.set(update);
		this.trigger('change');
	}

	fetch(): void {
		const id = this.get('id');

		if (typeof id !== 'number') {
			throw new Error('Cannot fetch without an id');
		}

		this.sync.fetch(id).then((res: AxiosResponse): void => this.set(res.data));
	}

	save(): void {
		this.sync
			.save(this.attributes.getAll())
			.then((res: AxiosResponse): void => this.trigger('save'))
			.catch((err: AxiosError): void => this.trigger('error'));
	}
}

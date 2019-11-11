import { Model } from './Model';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
import { Collection } from './Collection';

import rootUrl from '../rootUrl';

export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

export class User extends Model<UserProps> {
	static buildUser(attrs: UserProps): User {
		return new User(
			new Attributes<UserProps>(attrs),
			new Eventing(),
			new ApiSync<UserProps>(`${rootUrl}/users`)
		);
	}

	static buildUserCollection(): Collection<User, UserProps> {
		return new Collection<User, UserProps>(
			`${rootUrl}/users`,
			(json: UserProps) => User.buildUser(json)
		);
	}
}

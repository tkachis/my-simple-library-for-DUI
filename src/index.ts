import { Collection } from './models/Collection';
import { UserList } from './views/UserList';
import { User, UserProps } from './models/User';
import { UserEdit } from './views/UserEdit';
import rootUrl from './rootUrl';

const user = User.buildUser({ name: 'Igor', age: 22 });

const root = document.getElementById('root');

if (root) {
	let userEdit = new UserEdit(root, user);
	userEdit.render();
} else {
	throw new Error('Root element not found');
}

// const users = new Collection(`${rootUrl}/users`, (json: UserProps) => {
// 	return User.buildUser(json);
// });

// users.on('change', () => {
// 	const root = document.getElementById('root');

// 	if (root) {
// 		new UserList(root, users).render();
// 	}
// });

// users.fetch();

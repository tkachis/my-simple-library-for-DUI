import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
	eventsMap(): { [key: string]: () => void } {
		return {
			'click:.set-age': this.onSetAgeClick,
			'click:.change-name': this.onSetNameClick,
			'click:.save-model': this.onSaveClick,
		};
	}

	onSetAgeClick = (): void => {
		const age = Math.round(Math.random() * 100);
		this.model.set({ age });
	};

	onSetNameClick = (): void => {
		const input: HTMLInputElement | null = this.parent.querySelector(
			'input[name=user-name]'
		);

		if (input) {
			const name: string = input.value;
			this.model.set({ name });
		}
	};

	onSaveClick = (): void => {
		this.model.save();
	};

	template(): string {
		return `
            <div>
				<input placeholder="${this.model.get('name')}" name="user-name"/>
				<button class="change-name">Change Name</button>
				<button class="set-age">Set Random Age</button>
				<button class="save-model">Save User</button>
            </div>
        `;
	}
}

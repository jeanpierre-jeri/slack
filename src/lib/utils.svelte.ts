export function ref<T>(initial: T) {
	let value = $state<T>(initial)

	return {
		get value() {
			return value
		},
		set value(state: T) {
			value = state
		},
	}
}

const app = Vue.createApp({
	data: () => ({
		title: "Vue calculator",
		cipher: 0,
		operation: [0],
		history: [0],
		result: 0
	}),
	methods: {
		setCipher(cipher) {
			this.cipher = cipher;
			if (this.history[0] === 0 && this.history.length === 1) this.history = [];
			this.history.push(this.cipher);
		},
		clear() {
			this.cipher = 0;
			this.history = [0];
			this.operation = [0];
			this.result = 0;
		},
		setOperation(operator) {
			if (this.history[0] === 0 && this.history.length === 1) return;
			if(this.history[this.history.length-1] === operator) return;
			if (['+', '-', '/', '*'].find(element => element === this.history[this.history.length-1])) {
				this.history.pop();
				this.history.push(operator);
			} else {
				this.history.push(operator);
			}
		},
		makeOperation() {
			this.operation = this.history;
			this.result = eval(this.operation.join(""));
			this.operation = [];
			this.operation.push(this.result);

		},
	},
});

const mount = app.mount("#app");

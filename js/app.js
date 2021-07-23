const app = Vue.createApp({
	data: () => ({
		title: "Gradient generator",
		color1: "#ff0000",
		color2: "#0000ff",
		orientation: "right"
	}),
	computed: {
		setColor() {
			return `background: linear-gradient(to ${this.orientation}, ${this.color1}, ${this.color2});`;
		}
	}
});

const mount = app.mount("#app");

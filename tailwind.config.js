module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
	},
	theme: {
		fill: (theme) => ({
			red: theme("colors.red.primary"),
			black: theme("colors.black.light"),
		}),
		colors: {
			white: "#ffffff",
			blue: {
				light: "#0195F6",
				medium: "#005c98",
			},
			black: {
				light: "#262626",
				faded: "#00000059",
			},
			gray: {
				base: "#616161",
				background: "#fafafa",
				primary: "#dbdbdb",
			},
			red: {
				primary: "#ed4956",
			},
		},
	},
	variants: {
		extend: {
			display: ["group-hover"],
		},
	},
};

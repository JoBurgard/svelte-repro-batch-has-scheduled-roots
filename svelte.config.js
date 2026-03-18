const config = {
	/** @type {import('svelte/compiler').CompileOptions} */
	compilerOptions: {
		customElement: true,
		runes: true,
		warningFilter: (warning) => !['attribute_illegal_colon'].includes(warning.code),
	},
};

export default config;

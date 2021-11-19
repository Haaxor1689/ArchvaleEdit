/// <reference types="react-scripts" />

declare module '*.yaml' {
	const value: string; // markdown is just a string
	export default value;
}

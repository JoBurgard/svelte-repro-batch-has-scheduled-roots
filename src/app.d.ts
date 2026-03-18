declare global {
	namespace JSX {
		interface IntrinsicElements {}

		// interface HtmlTag {
		// ['hx-boost']: boolean;
		// }
	}
}

type BaseWC = {
	class: string | string[];
	children: number;
	'data-${string}': string;
};

export {};

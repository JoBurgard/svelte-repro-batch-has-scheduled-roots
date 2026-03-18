import { generateLayoutsWatch } from '$ext/ts-common-tools/crud/codegen-layout';
import path from 'node:path';
import { generateBundleWatch } from './bundle';

const controller = new AbortController();

await using terminal = new Bun.Terminal({
	cols: process.stdout.columns,
	rows: process.stdout.rows,
	data(_, data) {
		process.stdout.write(data);
	},
});

const tw = Bun.spawn(
	[
		'bunx',
		'tailwindcss',
		'-i',
		path.resolve(import.meta.dir, 'app.css'),
		'-o',
		path.resolve(import.meta.dir, '../public/dist/tw.css'),
		'--watch',
	],
	{ terminal, cwd: import.meta.dir },
);

const [closeLayoutWatcher, closeBundleWatcher] = await Promise.all([
	generateLayoutsWatch(import.meta.dir),
	generateBundleWatch(),
]);

process.on('SIGINT', () => {
	tw.terminal?.close();
	closeLayoutWatcher();
	closeBundleWatcher();

	controller.abort();
	process.exit(0);
});

await tw.exited;

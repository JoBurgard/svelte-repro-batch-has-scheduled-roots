import { pathToFileURL } from 'bun';
import { watch } from 'node:fs';
import path from 'node:path';
import { SveltePlugin } from 'bun-plugin-svelte';
// @ts-expect-error it-s a js file
import svelteConfig from '../svelte.config';

const projectRoot = path.resolve(import.meta.dir, '..');

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	// This module is being run directly
	await bundle();
}

export async function generateBundleWatch() {
	try {
		await bundle();
	} catch (error) {
		console.log(error);
	}
	const watcher = watch(path.resolve(projectRoot), { recursive: true }, async (event, filename) => {
		if (event === 'rename' && filename?.endsWith('~')) {
			return;
		}

		let shouldRefresh = false;
		if (filename?.startsWith('bundle/') || filename?.startsWith('src/')) {
			console.log(event, filename);

			try {
				await bundle();
				shouldRefresh = true;
			} catch (error) {
				console.log(error);
			}
		}

		if (shouldRefresh) {
			await fetch('http://localhost:3000/do-reload', { method: 'post' });
		}
	});

	return () => watcher.close();
}

async function bundle() {
	const result = await Bun.build({
		entrypoints: ['./bundle/repro-view.ts'],
		outdir: './public/dist',
		root: projectRoot,
		plugins: [SveltePlugin({ compilerOptions: svelteConfig.compilerOptions })],
	});

	console.log(result);
}

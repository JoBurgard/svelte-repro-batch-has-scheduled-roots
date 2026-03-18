import { dstar } from '$d*';
import { html } from '@elysiajs/html';
import staticPlugin from '@elysiajs/static';
import { Elysia } from 'elysia';
import Dashboard from './modules/app/Dashboard';

import { interval } from '$ext/ts-common-tools/utils';

const isDev = process.env.NODE_ENV !== 'production';

let firstReloadHappened = false;
let shouldReload = false;
const app = new Elysia()
	.use(staticPlugin({ etag: !isDev }))
	.use(html())
	.get('/hotreload', async function* ({ request }) {
		if (isDev) {
			if (!firstReloadHappened) {
				yield dstar.executeScript('window.location.reload()');
				firstReloadHappened = true;
			}

			for await (const _ of interval(20, { signal: request.signal })) {
				if (shouldReload) {
					console.log('hotreload sent');
					shouldReload = false;
					yield dstar.executeScript('window.location.reload()');
				}
			}
		}
	})
	.post('/do-reload', function () {
		if (isDev) {
			shouldReload = true;
			console.log(new Date(), 'Reload request received');
		}
	})
	.get('/', () => Dashboard())
	.listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

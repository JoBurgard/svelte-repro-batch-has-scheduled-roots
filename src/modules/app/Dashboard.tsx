export default function () {
	return (
		<html lang="en" class={'h-full bg-white scheme-light dark:bg-gray-900 dark:scheme-dark'}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="stylesheet" href="/public/dist/tw.css" />
				<script type="module" src="/public/datastar.js"></script>
				<script src="/public/elements.js" type="module"></script>
			</head>
			<body class={'h-full'}>
				{process.env.NODE_ENV !== 'production' ? (
					<div
						id="hotreload"
						data-init="@get('/hotreload', {
              retryMaxCount: 1000,
              retryInterval: 20,
              retryMaxWaitMs: 200,
              filterSignals: {
                exclude: /.*/
              }
            })"
					></div>
				) : (
					<></>
				)}
				<div>
					<repro-svelte></repro-svelte>

					<script type="module" src="/public/dist/bundle/repro-view.js"></script>
				</div>
			</body>
		</html>
	) as string;
}

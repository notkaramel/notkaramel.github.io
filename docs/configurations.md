# Configuration
## SvelteKit
- License: MIT
```sh
npm create svelte@latest .
```

## Available `npm` scripts
```bash
$ npm run dev       # run the app in development mode (Vite)
$ npm run build     # build the app (Vite)
$ npm run preview   # preview the built app (Vite)
$ npm run check     # check the code (svelte-check)
$ npm run lint      # lint the code (Prettier)
```

## Adapter
- Static site generator: https://kit.svelte.dev/docs/adapter-static
```sh 
npm i -D @sveltejs/adapter-static
```

## Styling
- Skeleton UI: https://www.skeleton.dev/docs/get-started
```sh
npm i -D @skeletonlabs/skeleton @skeletonlabs/tw-plugin
```

- TailwindCSS: https://tailwindcss.com/docs/guides/svelte
```sh
npx svelte-add@latest tailwindcss
npm install
# npm i -D tailwindcss@latest postcss@latest autoprefixer@latest
```

- Tailwind Configuration: https://www.skeleton.dev/docs/get-started
```js

// @ts-check
import { join } from 'path';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
export default {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},
	},
	plugins: [
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton
	]
}
```


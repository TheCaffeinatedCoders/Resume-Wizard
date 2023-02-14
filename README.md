# Resume Wizard

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Developing

When deploying on Vercel, they like to use the [pnpm package manager](https://pnpm.io/)

If a new package is added to a branch, make sure to run:

```bash
pnpm install
```

Before running the dev command or pushing to a branch.

To add a package, use:

```bash
pnpm install
pnpm add {package}
```

And to start the server locally in development mode:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
> We currently have the Vercel addapter installed and specilfied in svelte.config.js

# Resume Wizard

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Developing

If a new package is added to a branch, make sure to run:

```bash
npm install
```

Before running the dev command or pushing to a branch.

To add a package, use:

```bash
npm install
npm add {package}
```

And to start the server locally in development mode:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
> We currently have the Node addapter installed and specilfied in svelte.config.js

## Docker Production Deployment
To build the docker image, first login to the docker registry:
```bash
docker login ghcr.io -u GITHUB_USERNAME
```
It will then ask for a password, this is not your github password, but a personal access token. To create a personal access token, go to your github settings, select Developer Settings, then Personal Access Tokens. Generate a new token with at least the `read:packages` and `write:packages` scope. Copy the token and use it as the password for the login command.

Once logged in, execute the build command to save the built image to the repository image registry:
```bash
docker build -t ghcr.io/thecaffeinatedcoders/resume-wizard:latest .
```

Test the Docker image locally by running the container:
```bash
docker run -p 8080:8080 ghcr.io/thecaffeinatedcoders/resume-wizard:latest
```

Once you have confirmed that the container works as expected, tag the Docker image with the GitHub Container Registry URL:
```bash
docker tag ghcr.io/thecaffeinatedcoders/resume-wizard:latest docker.pkg.github.com/thecaffeinatedcoders/resume-wizard/resume-wizard:latest
```

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

## Docker Deployment
Use the included docker-compose file:

```yml
version: '3.7'
services:
  resumewizard:

    # For a local build using included Dockerfile
    # build:
    #   context: .
    #   dockerfile: Dockerfile
    # ports:
    #   - "80:8080"
    # environment:
    #   - OPENAI_API_KEY=${OPENAI_API_KEY}

    # Pull latest image from github
    image: ghcr.io/thecaffeinatedcoders/resume-wizard:latest
    container_name: resumewizard
    restart: unless-stopped
    ports:
      - "80:8080"  # Map port 80 on the host to port 8080 in the container
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - PUBLIC_POCKETBASE_URL=http://127.0.0.1:81  # Use the service name and port defined in the pocketbase service
    
    

  # Pull unofficial pocketbase image
  pocketbase:
    image: spectado/pocketbase:latest
    container_name: pocketbase
    restart: unless-stopped
    ports:
      - "81:80"  # Map port 81 on the host to port 80 in the container
    volumes:
      - /pb_data:/pb_data
      - /pb_data:/pb_public
    environment:
      - PUBLIC_POCKETBASE_URL=http://127.0.0.1:81

```
Make sure that an OPENAI_API_KEY enviroment variable is defined in your shell or .env file with a valid OpenAI API key generated on their website [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys). 

Also change PUBLIC_POCKETBASE_URL to a public url if exposing externally. Adjust pocketbase data volumes if necessary. 

Deploy using `docker-compose up` to run both a pocketbase service and resumewizard node service. 
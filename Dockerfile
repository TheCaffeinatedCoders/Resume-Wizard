# Stage 1: Build
FROM node:lts-slim as build

WORKDIR /app

ARG OPENAI_API_KEY
# Set the OpenAI API key as an environment variable
ENV OPENAI_API_KEY=${OPENAI_API_KEY}

# Install packages
COPY package*.json ./
RUN npm install

# Copy over code after installing dependencies
COPY . .

# Build application
RUN npm run build


# Stage 2: Run
FROM node:lts-slim as run

WORKDIR /app

# Copy package.json and build directory
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/build ./build
# Install only production dependencies
RUN npm install --production
# RUN npm install

EXPOSE 8080
ENTRYPOINT [ "npm", "run", "start" ]
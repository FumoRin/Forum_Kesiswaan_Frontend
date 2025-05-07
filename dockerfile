# --- Base Stage ---
FROM node:18-alpine AS base

WORKDIR /app
COPY package*.json ./

# --- Dependencies Stage ---
FROM base AS dependencies
RUN npm install

# --- Build Stage ---
FROM dependencies AS build
COPY . .
run npm run build

# --- Production ---
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

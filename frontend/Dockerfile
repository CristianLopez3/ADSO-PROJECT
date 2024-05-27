# Building stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
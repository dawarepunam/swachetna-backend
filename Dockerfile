# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
RUN apk add --no-cache vips-dev
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=1337
ENV HOST=0.0.0.0

RUN addgroup --system --gid 1001 strapi
RUN adduser --system --uid 1001 strapi

COPY --from=builder /app ./
RUN chown -R strapi:strapi /app

USER strapi

EXPOSE 1337

CMD ["npm", "run", "start"]

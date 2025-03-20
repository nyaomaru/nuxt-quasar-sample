FROM node:20-slim AS base
LABEL maintainer="Nyaomaru<nyaonyao0725@gmail.com>"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN pnpm version

VOLUME ["/app/.nuxt"]

COPY package.json pnpm-lock.yaml /app/

WORKDIR /app

RUN pnpm install --frozen-lockfile

COPY . /app

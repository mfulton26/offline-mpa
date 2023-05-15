/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope & typeof globalThis;

import routes, { handler } from "../routes.tsx";

const cacheName = "v1";

self.addEventListener("install", (event) =>
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(
        Array.from(routes.keys())
          .filter((pattern): pattern is string => typeof pattern === "string"),
      );
    })(),
  ));

self.addEventListener("activate", (event) =>
  event.waitUntil(
    (async () => {
      await self.clients.claim();
    })(),
  ));

self.addEventListener("fetch", (event) =>
  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
      return await cache.match(event.request) ?? await handler(event.request);
    })(),
  ));

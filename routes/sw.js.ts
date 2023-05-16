/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope & typeof globalThis;

import handler from "../handler.ts";
import routes from "../routes.ts";

const cacheName = "v1";

self.addEventListener("install", (event) =>
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(
        routes
          .filter(({ entryPoint }) => entryPoint)
          .map(({ urlPattern: { pathname } }) => pathname),
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
      return handler(event.request, { cache });
    })(),
  ));

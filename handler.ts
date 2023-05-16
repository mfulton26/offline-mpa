import React from "react";

import routes from "./routes.ts";

import * as Responses from "./Responses.ts";

export interface HandlerCache {
  match(
    request: RequestInfo | URL,
    options: CacheQueryOptions & { entryPoint: string },
  ): Promise<Response | undefined>;
}

export interface HandlerOptions {
  cache: HandlerCache;
}

export default async function handler(
  request: Request,
  { cache }: HandlerOptions,
): Promise<Response> {
  for (const { urlPattern, functionComponent, entryPoint } of routes) {
    if (!urlPattern.test(request.url)) continue;
    return entryPoint === undefined
      ? Responses.page(React.createElement(functionComponent))
      : await cache.match(request, { entryPoint }) ?? Responses.notFound();
  }
  return Responses.notFound();
}

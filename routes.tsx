import "urlpattern-polyfill";

import React from "react";

import * as Responses from "./Responses.ts";

import HomePage from "./routes/index.tsx";
import AboutPage from "./routes/about.tsx";

const routes = new Map<
  string | URLPattern,
  (
    request: Request,
    { bundle }: { bundle?: (entryPoint: string) => Promise<Response> },
  ) => Response | Promise<Response>
>();

routes.set(
  new URLPattern({ pathname: "/" }),
  () => Responses.page(<HomePage />),
);

routes.set(
  "/index.js",
  (_, { bundle }) => bundle?.("./routes/index.js.tsx") ?? Responses.notFound(),
);

routes.set(
  new URLPattern({ pathname: "/about" }),
  () => Responses.page(<AboutPage />),
);

routes.set(
  new URLPattern({ pathname: "/sw.js" }),
  (_, { bundle }) => bundle?.("./routes/sw.js.ts") ?? Responses.notFound(),
);

routes.set(
  new URLPattern({ pathname: "/importMap.json" }),
  async () => {
    const { readable: body } = await Deno.open("./routes/importMap.json");
    return Responses.json(body);
  },
);

export default routes;

export function handler(
  request: Request,
  { bundle }: { bundle?: (entryPoint: string) => Promise<Response> } = {},
): Response | Promise<Response> {
  for (const [pattern, handler] of routes) {
    if (
      typeof pattern === "string" && pattern !== new URL(request.url).pathname
    ) continue;
    if (typeof pattern !== "string" && !pattern.test(request.url)) continue;
    return handler(request, { bundle });
  }
  return Responses.notFound();
}

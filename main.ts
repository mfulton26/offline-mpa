import { serve } from "std/http/server.ts";

import { build, initialize } from "esbuild";
import { denoPlugins } from "esbuild-deno-loader";

import { handler } from "./routes.tsx";
import * as Responses from "./Responses.ts";

await initialize({ worker: false });

serve((request) =>
  handler(request, {
    async bundle(entryPoint) {
      const { outputFiles: [{ contents }] = [] } = await build({
        entryPoints: [entryPoint],
        bundle: true,
        minify: true,
        format: "esm",
        write: false,
        external: [
          "react",
          "react-dom",
          "react-dom/client",
          "react-dom/server",
          "https://esm.sh/react@18.2.0?dev",
          "https://esm.sh/react-dom@18.2.0/client?dev",
          "https://esm.sh/react-dom@18.2.0/server?dev",
          "esm.sh/*",
        ],
        plugins: [
          ...denoPlugins({
            importMapURL: new URL("/importMap.json", request.url).href,
            loader: "portable",
          }),
        ],
      });
      return Responses.javascript(contents);
    },
  })
);

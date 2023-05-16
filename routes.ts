// cspell:ignore urlpattern
import "urlpattern-polyfill";

import HomePage from "./routes/index.tsx";
import AboutPage from "./routes/about.tsx";

export default [
  {
    urlPattern: new URLPattern({ pathname: "/" }),
    functionComponent: HomePage,
  },
  {
    urlPattern: new URLPattern({ pathname: "/index.js" }),
    entryPoint: new URL("./routes/index.js.tsx", import.meta.url).href,
  },
  {
    urlPattern: new URLPattern({ pathname: "/about" }),
    functionComponent: AboutPage,
  },
  {
    urlPattern: new URLPattern({ pathname: "/sw.js" }),
    entryPoint: new URL("./routes/sw.js.ts", import.meta.url).href,
  },
];

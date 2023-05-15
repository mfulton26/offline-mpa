import { renderToReadableStream } from "react-dom/server";

export function json(body?: BodyInit | null, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(body, { ...init, headers });
}

export function html(body?: BodyInit | null, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "text/html");
  }
  return new Response(body, { ...init, headers });
}

export function javascript(body?: BodyInit | null, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "text/javascript");
  }
  return new Response(body, { ...init, headers });
}

export async function page(children: React.ReactNode) {
  const body = await renderToReadableStream(children);
  return html(body);
}

export function notFound(
  body: BodyInit | null = "Not Found",
  { status = 404, statusText = "Not Found", ...rest }: ResponseInit = {},
) {
  return new Response(body, { status, statusText, ...rest });
}

export function notAcceptable(
  body: BodyInit | null = "Not Acceptable",
  { status = 406, statusText = "Not Acceptable", ...rest }: ResponseInit = {},
) {
  return new Response(body, { status, statusText, ...rest });
}

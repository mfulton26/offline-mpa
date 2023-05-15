import React from "react";

export type PageProps = {
  title?: string;
  hydrationPathname?: string;
  children?: React.ReactNode;
};

export default function Page({
  title,
  hydrationPathname,
  children,
}: PageProps) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <meta name="viewport" content="width=device-width" />
        {hydrationPathname && <script type="module" src={hydrationPathname} />}
        <script
          dangerouslySetInnerHTML={{
            __html:
              /* JavaScript */ `navigator.serviceWorker?.register("sw.js", { type: "module" })`,
          }}
        />
      </head>
      <body>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

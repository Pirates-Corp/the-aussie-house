import React from "react";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import "./styles/global.scss";


export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>The Aussie House – Luxury Beach Homestay | Mahabalipuram</title>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JJG9Q2QQLK"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JJG9Q2QQLK');
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}

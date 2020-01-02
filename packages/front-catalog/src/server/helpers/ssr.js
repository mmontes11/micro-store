import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "app/components/App";
import logger from "shared/log";

export const render = req => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>,
  );
  logger.info("Context:");
  logger.info(JSON.stringify(context));
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Catalog</title>
        <link rel="icon" href="${process.env.FRONT_CATALOG_URL}/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>
      </head>
      <body>
        <div id="catalog-root">${app}</div>
        <script src="${process.env.FRONT_CATALOG_URL}/bundle.js"></script>
      </body>
    </html>
  `;
};

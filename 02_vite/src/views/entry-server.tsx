import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../app/src/App";

export function render(url: string, props: Record<string, any> = {}) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App page="client" props={props} />
      </StaticRouter>
    </React.StrictMode>
  );
}

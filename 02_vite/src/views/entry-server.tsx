//views/entry-server.tsx
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../app/src/App";
export function render() {
  return renderToString(<App />);
}

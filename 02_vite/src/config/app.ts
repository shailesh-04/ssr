import express from "express";
import path from "path";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import router from "../routers";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
class App {
  public app: express.Application;
  constructor() {
    config();
    this.app = express();
    this.appConfig();
  }
  private appConfig(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "../../public")));
    this.app.use(router);
  }
}
export default new App().app;



// import express from "express";
// import fs from "fs";
// // config/app.ts
// import path from "path";
// import { config } from "dotenv";
// import { fileURLToPath } from "url";
// config();
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// async function createServer() {
//   const app = express();
//   if (process.env.NODE_ENV !== "production") {
//     const vite = await (await import("vite")).createServer({
//       server: { middlewareMode: true },
//       appType: "custom",
//     });
//     app.use(vite.middlewares);
//     app.use("/", async (req, res) => {
//       try {
//         let template = fs.readFileSync(path.resolve(__dirname, "../app/index.html"), "utf-8");
//         template = await vite.transformIndexHtml(req.url, template);

//         const { render } = await vite.ssrLoadModule(
//           path.resolve(__dirname, "../views/entry-server.tsx")
//         );

//         const appHtml = render();

//         res.status(200).set({ "Content-Type": "text/html" }).end(
//           template.replace(`<!--ssr-outlet-->`, appHtml)
//         );
//       } catch (e: any) {
//         vite.ssrFixStacktrace(e);
//         res.status(500).end(e.message);
//       }
//     });
//   }
//   else {
//     const template = fs.readFileSync(
//       path.resolve(__dirname, "../app/index.html"),
//       "utf-8"
//     );
//     const { render } = await import("../views/entry-server.js");
//     app.use("/assets", express.static(path.resolve(__dirname, "../app/assets")));
//     app.use("/", async (req, res) => {
//       try {
//         const appHtml = render();
//         const html = template.replace(`<!--ssr-outlet-->`, appHtml);
//         res.status(200).set({ "Content-Type": "text/html" }).end(html);
//       } catch (e: any) {
//         res.status(500).end(e.message);
//       }
//     });
//   }
//   return app;
// }
// const app = await createServer();

// export default app
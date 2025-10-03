import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = express.Router()

// Vite server instance (singleton)
let viteServer: any = null;

// Helper function to initialize Vite server (called once)
async function initViteServer() {
  if (process.env.NODE_ENV !== "production" && !viteServer) {
    const vite = await (await import("vite")).createServer({
      server: { 
        middlewareMode: true,
        hmr: {
          port: 3001, // Explicit HMR port
          host: 'localhost'
        }
      },
      appType: "custom",
    });
    viteServer = vite;
    router.use(vite.middlewares);
  }
  return viteServer;
}

// Helper function to render pages
async function renderPage(res: any, pageName: string, props: any = {}, reqUrl: string = '/') {
  if (process.env.NODE_ENV !== "production") {
    const vite = await initViteServer();

    try {
      let template = fs.readFileSync(path.resolve(__dirname, "../app/index.html"), "utf-8");
      template = await vite.transformIndexHtml(reqUrl, template);

      const { render } = await vite.ssrLoadModule(
        path.resolve(__dirname, "../views/entry-server.tsx")
      );
      const appHtml = render(reqUrl, props);
      res.status(200).set({ "Content-Type": "text/html" }).end(
        template.replace(`<!--ssr-outlet-->`, appHtml)
      );
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      res.status(500).end(e.message);
    }
  }
  else {
    const template = fs.readFileSync(
      path.resolve(__dirname, "../app/index.html"),
      "utf-8"
    );
    const { render } = await import("../views/entry-server.js");
    router.use("/assets", express.static(path.resolve(__dirname, "../app/assets")));
    try {
      const appHtml = render(reqUrl, props);
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      res.status(500).end(e.message);
    }
  }
}
// Routes remain the same...
router.get('/', async (req, res) => {
  await renderPage(res, 'PopularBlock', {}, req.url)
})
router.get('/block/:id', async (req, res) => {
  await renderPage(res, 'BlockPage', { id: req.params.id }, req.url)
})
router.get('/login', async (req, res) => {
  await renderPage(res, 'Login', {}, req.url)
})

router.get('/dashboard', async (req, res) => {
  await renderPage(res, 'client', {}, req.url)
})

export default router
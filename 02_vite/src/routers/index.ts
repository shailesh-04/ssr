import { Router } from "express";
import { catchErr } from "shmaker"
import views from "./views.js";
import blockApi from "./block.api.js"
const router = Router();

try {
    router.use("/",views);
    router.use("/api",blockApi);
} catch (error) {
    catchErr(error, "router/index.js");
}

export default router;
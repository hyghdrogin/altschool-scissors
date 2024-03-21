import { Router as serverRouter } from "express";
import userRouter from "./user";
import URLRouter from "./url";
import viewsRouter from "./views";

const router = serverRouter();

router.use("/user", userRouter);
router.use("/", URLRouter);
router.use("/views", viewsRouter);

export default router;
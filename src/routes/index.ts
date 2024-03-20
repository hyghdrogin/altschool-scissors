import { Router as serverRouter } from "express";
import userRouter from "./user";
import URLRouter from "./url";

const router = serverRouter();

router.use("/user", userRouter);
router.use("/", URLRouter);

export default router;
import { Router as serverRouter } from "express";
import userRouter from "./user";

const router = serverRouter();

router.use("/user", userRouter);

export default router;
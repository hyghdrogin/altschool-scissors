import { Request, Response, Router as viewsRouter } from "express";
import { verifyUserToken } from "../middleware";
import models from "../models";

const router = viewsRouter();

router.get("/signup", (req: Request, res: Response) => {
	return res.render("signup");
});

router.get("/login", (req: Request, res: Response) => {
	return res.render("login");
});

router.get("/custom", (req: Request, res: Response) => {
	return res.render("custom");
});

router.get("/dashboard", verifyUserToken, async (req: Request, res: Response) => {
	const user = await models.user.findById(req.user._id);
	return res.render("dashboard", { user });
});

router.get("/unshorten", (req: Request, res: Response) => {
	return res.render("unshorten");
});



export default router;
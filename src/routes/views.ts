import { Request, Response, Router as viewsRouter } from "express";

const router = viewsRouter();

router.get("/signup", (req: Request, res: Response) => {
	return res.render("signup");
});

router.get("/login", (req: Request, res: Response) => {
	return res.render("login");
});

export default router;
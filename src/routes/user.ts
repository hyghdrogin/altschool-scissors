import { Router as userRouter } from "express";
import { signupUser, signinUser, logOut} from "../controllers/user";
import { verifyUserToken } from "../middleware";

const router = userRouter();

router.post("/", signupUser);
router.post("/login", signinUser);
router.get("/logout", verifyUserToken, logOut);

export default router;
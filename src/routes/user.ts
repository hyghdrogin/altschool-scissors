import { Router as userRouter } from "express";
import { signupUser, signinUser} from "../controllers/user";

const router = userRouter();

router.post("/", signupUser);
router.post("/login", signinUser);

export default router;
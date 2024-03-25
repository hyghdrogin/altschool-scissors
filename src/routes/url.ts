import { Router as URLRouter } from "express";
import { verifyUserToken } from "../middleware";
import {
	createURL, customURL, viewLink, viewLinks, getURLAnalytics, unshortenURL
} from "../controllers/url";

const router = URLRouter();

router.post("/", verifyUserToken, createURL);
router.post("/custom", verifyUserToken, customURL);
router.post("/unshorten", unshortenURL);
router.get("/links", verifyUserToken, viewLinks);
router.get("/:shortCode", viewLink);
router.get("/analytics/:shortCode", verifyUserToken, getURLAnalytics);

export default router;
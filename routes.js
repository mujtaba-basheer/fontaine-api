import express from "express";
import {
  addSubscriber,
  getSubscribers,
  contactFontaine,
} from "./controller.js";

const router = express.Router();

// subscribe
router.post("/subscribe", addSubscriber);

// contact
router.post("/contact", contactFontaine);

// test
router.get("/subscribers", getSubscribers);

export default router;

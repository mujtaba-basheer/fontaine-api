import express from "express";
import {
  addSubscriber,
  getSubscribers,
  contactFontaine,
  locateDealer,
  klaraRoiPdf,
} from "./controller.js";

const router = express.Router();

// subscribe
router.post("/subscribe", addSubscriber);

// contact fontaine
router.post("/contact", contactFontaine);

// contact fontaine
router.post("/dealer", locateDealer);

// klara roi pdf
router.post("/klara", klaraRoiPdf);

// test
router.get("/subscribers", getSubscribers);

export default router;

import express from "express";
import {
  addSubscriber,
  getSubscribers,
  contactFontaine,
  locateDealer,
  compareTrailer,
} from "./controller.js";

const router = express.Router();

// subscribe
router.post("/subscribe", addSubscriber);

// contact fontaine
router.post("/contact", contactFontaine);

// contact fontaine
router.post("/dealer", locateDealer);

// build trailer
router.post("/build-trailer", buildTrailer);

// test
router.get("/subscribers", getSubscribers);

export default router;

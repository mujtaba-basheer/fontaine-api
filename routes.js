import express from "express";
import {
  addSubscriber,
  getSubscribers,
  contactFontaine,
  locateDealer,
  buildTrailer,
  flatbedTrailer,
  enquire,
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

// flatbed trailer
router.post("/flatbed-trailer", flatbedTrailer);

// enquire
router.post("/enquire", enquire);

// test
router.get("/subscribers", getSubscribers);

export default router;

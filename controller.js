import ApiCall from "./utils/api-call.js";
import AppError from "./utils/app-error.js";
import AsyncHandler from "express-async-handler";
import https from "https";

const api = new ApiCall();

// Add A Subscriber: POST
export const addSubscriber = AsyncHandler(async (req, res, next) => {
  try {
    const ipAddress = req.headers["x-forwared-for"] || req.socket.remoteAddress;
    const data = Object.assign(
      {
        SubscriberTypeCode: "NewsletterFT",
        CountryCode: "US",
        IsCommunicationOptIn: true,
        Brand: "FT",
        IsCommunicationOptInIpAddress: ipAddress,
        IsCommunicationOptInDate: new Date().toISOString().substring(0, 10),
        IsCommunicationOptInSource: req.headers.host || "website",
      },
      req.body
    );
    const resp = await api.postReq("/api/subscriber?manufacturer=FT", data);

    res.json({
      status: true,
      msg: "You have been successfully added to our newsletter.",
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, error.statusCode));
  }
});

// Get List of Subscribers: GET
export const getSubscribers = async (req, res, next) => {
  try {
    await api.getReq("/odata/v2/SubscriberOptIn");

    res.json({
      status: true,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, error.statusCode));
  }
};

// Contact Fontaine: POST
export const contactFontaine = AsyncHandler(async (req, res, next) => {
  try {
    const formData = Object.assign(
      {
        LeadSourceName: "Organic",
        LeadTypeName: "Build a Trailer",
        LeadCategoryName: "fontainetrailer.com",
        CountryCode: "US",
        IsCommunicationOptIn: true,
        CommunicationOptInIpAddress: null,
        CommunicationOptInDate: null,
        CommunicationOptInSource: null,
      },
      req.body
    );
    const data = [formData];
    await api.postReq("/marketing/api/lead?manufacturer=FT", data);

    res.json({
      status: true,
      msg: "Thanks for reaching out to us! We'll get in touch with you soon.",
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, error.statusCode));
  }
});

// Locate Dealer: POST
export const locateDealer = AsyncHandler(async (req, res, next) => {
  try {
    const formData = Object.assign(
      {
        LeadSourceName: "Organic",
        LeadTypeName: "Locate Dealer",
        LeadCategoryName: "fontainetrailer.com",
        CountryCode: "US",
        LastName: "Dealer",
        IsCommunicationOptIn: true,
        CommunicationOptInIpAddress: null,
        CommunicationOptInDate: null,
        CommunicationOptInSource: null,
      },
      req.body
    );
    console.log(formData);
    const data = [formData];
    await api.postReq("/marketing/api/lead?manufacturer=FT", data);

    res.json({
      status: true,
      msg: "Thanks for reaching out to us! We'll get in touch with you soon.",
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, error.statusCode));
  }
});

// Compare Trailer: POST
export const compareTrailer = AsyncHandler(async (req, res, next) => {
  try {
    const formData = Object.assign(
      {
        LeadSourceName: "Organic",
        LeadTypeName: "Compare Trailer",
        LeadCategoryName: "fontainetrailer.com",
        CountryCode: "US",
        IsCommunicationOptIn: true,
        CommunicationOptInIpAddress: null,
        CommunicationOptInDate: null,
        CommunicationOptInSource: null,
      },
      req.body
    );
    // console.log(formData);
    const data = [formData];
    await api.postReq("/marketing/api/lead?manufacturer=FT", data);

    res.json({
      status: true,
      msg: "Thanks for reaching out to us! We'll get in touch with you soon.",
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, error.statusCode));
  }
});

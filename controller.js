import ApiCall from "./utils/api-call.js";
import AppError from "./utils/app-error.js";
import getDateString from "./utils/date-string.js";
import AsyncHandler from "express-async-handler";

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
        IsCommunicationOptInDate: getDateString(),
        IsCommunicationOptInSource: req.headers.host || "website",
      },
      req.body
    );
    await api.postReq("/api/subscriber?manufacturer=FT", data);

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
    const resp = await api.getReq("/odata/v2/SubscriberOptIn");

    res.json({
      status: true,
      data: resp.value.filter(({ Email = "" }) => Email.startsWith("test123@")),
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, error.statusCode));
  }
};

// Contact Fontaine: POST
export const contactFontaine = AsyncHandler(async (req, res, next) => {
  try {
    const ipAddress = req.headers["x-forwared-for"] || req.socket.remoteAddress;
    const formData = Object.assign(
      {
        LeadSourceName: "Organic",
        LeadTypeName: "Build a Trailer",
        LeadCategoryName: "fontainetrailer.com",
        CountryCode: "US",
        IsCommunicationOptIn: false,
        CommunicationOptInIpAddress: ipAddress,
        CommunicationOptInDate: getDateString(),
        CommunicationOptInSource: "website",
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
        LeadTypeName: "Contact a Dealer",
        LeadCategoryName: "fontainetrailer.com",
        CountryCode: "US",
        IsCommunicationOptIn: true,
        CommunicationOptInIpAddress: null,
        CommunicationOptInDate: getDateString(),
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

// Build a Trailer: POST
export const buildTrailer = AsyncHandler(async (req, res, next) => {
  try {
    const ipAddress = req.headers["x-forwared-for"] || req.socket.remoteAddress;
    const formData = Object.assign(
      {
        LeadSourceName: "Organic",
        LeadTypeName: "Build a Trailer",
        LeadCategoryName: "fontainetrailer.com",
        CountryCode: "US",
        IsCommunicationOptIn: false,
        CommunicationOptInIpAddress: ipAddress,
        CommunicationOptInDate: getDateString(),
        CommunicationOptInSource: "website",
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

// Flatbed Trailer: POST
export const flatbedTrailer = AsyncHandler(async (req, res, next) => {
  try {
    const ipAddress = req.headers["x-forwared-for"] || req.socket.remoteAddress;
    const formData = Object.assign(
      {
        LeadSourceName: "Organic",
        LeadTypeName: "Request A Brochure",
        LeadCategoryName: "fontainetrailer.com",
        CountryCode: "US",
        IsCommunicationOptIn: true,
        CommunicationOptInIpAddress: ipAddress,
        CommunicationOptInDate: getDateString(),
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

// Enquire: POST
export const enquire = AsyncHandler(async (req, res, next) => {
  try {
    const formData = Object.assign(
      {
        LeadSourceName: "Organic",
        LeadTypeName: "Quote Request",
        LeadCategoryName: "fontainetrailer.com",
        CountryCode: "US",
        IsCommunicationOptIn: true,
        CommunicationOptInIpAddress: null,
        CommunicationOptInDate: getDateString(),
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

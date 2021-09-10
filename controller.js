import ApiCall from "./utils/api-call.js";
import AppError from "./utils/app-error.js";
import AsyncHandler from "express-async-handler";

const api = new ApiCall();

// Add A Subscriber: POST
export const addSubscriber = async (req, res, next) => {
  try {
    const data = Object.assign(
      {
        SubscriberTypeCode: "NewsletterFT",
        CountryCode: "US",
        IsCommunicationOptIn: true,
        SendAutoresponder: false,
        Brand: "FT",
        CommunicationOptInIpAddress: null,
        CommunicationOptInDate: null,
        CommunicationOptInSource: null,
      },
      req.body
    );
    const resp = await api.postReq("/api/subscriber?manufacturer=FT", data);

    res.json({
      status: true,
      data: resp,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError("Error hoye geche", error.statusCode));
  }
};

// Get List of Subscribers: GET
export const getSubscribers = async (req, res, next) => {
  try {
    const resp = await api.getReq("/odata/v2/SubscriberOptIn");

    res.json({
      status: true,
      data: resp["value"],
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
    const resp = await api.postReq("/marketing/api/lead?manufacturer=FT", data);

    if (resp["Status"] && resp["Status"] === "Failure")
      throw new Error(resp["StatusMessage"]);

    res.json({
      status: true,
      data: resp["LeadResponseRecords"][0],
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, error.statusCode));
  }
});

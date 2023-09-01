import fetch from "node-fetch";
import { config } from "dotenv";
import { createLogger, transports, format } from "winston";
import "winston-mongodb";
import { MongoClient } from "mongodb";
const { combine, json, timestamp } = format;
config({ path: ".env" });

const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);
const errorLogger = createLogger({
  transports: [
    new transports.File({ filename: "error.log" }),
    new transports.MongoDB({
      db: client.db("logs"),
      collection: "logs",
      level: "error",
    }),
  ],
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    json()
  ),
});

class HTTPResponseError extends Error {
  constructor(status, statusText, ...args) {
    super(`HTTP Error Response: ${status} ${statusText}`, ...args);
    this.statusCode = status;
  }
}

class ApiCall {
  constructor() {
    this.baseurl = process.env.BASE_URL;
    this.token = "";
    this.headers = { Authenticate: "" };
    this.timeLapsed = new Date().getTime();

    this.authenticate();
  }

  authenticate() {
    return new Promise((res, rej) => {
      const currTime = new Date().getTime();
      if (this.token && currTime - this.timeLapsed < 20 * 60 * 1000)
        return res(null);

      fetch(this.baseurl + "/api/Security/Login", {
        method: "POST",
        body: JSON.stringify({
          Username: process.env.USER_NAME,
          Password: process.env.PASSWORD,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.ok) return resp.json();
          else throw new HTTPResponseError(resp.status, resp.statusText);
        })
        .then((resp) => {
          this.timeLapsed = new Date().getTime();
          this.token = resp;
          this.headers.Authenticate = `Avala-Api ${this.token}`;
          res(null);
        })
        .catch((err) => rej(err));
    });
  }

  async getReq(url) {
    try {
      await this.authenticate();
      return new Promise(async (res, rej) => {
        fetch(this.baseurl + url, {
          method: "GET",
          headers: { ...this.headers },
        })
          .then((resp) => {
            if (resp.ok) return resp.json();
            else throw new HTTPResponseError(resp.status, resp.statusText);
          })
          .then((resp) => {
            res(resp);
          })
          .catch((err) => rej(err));
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async postReq(url, data) {
    try {
      await this.authenticate();
      return new Promise(async (res, rej) => {
        try {
          const request = await fetch(this.baseurl + url, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          const resp = await request.json();

          if (request.ok) {
            if (
              resp["TopLevelError"] ||
              (resp["LeadResponseRecords"] &&
                resp["LeadResponseRecords"][0]["Status"] === "Failure")
            ) {
              errorLogger.error(JSON.stringify({ ...resp, data }));
              throw new HTTPResponseError(400, "Bad Request");
            }
            res(resp);
          } else {
            errorLogger.error(JSON.stringify({ ...resp, data }));
            throw new HTTPResponseError(request.status, "Bad Request");
          }
        } catch (error) {
          rej(error);
        }
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ApiCall;

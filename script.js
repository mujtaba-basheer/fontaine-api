import ApiCall from "./utils/api-call.js";

const api = new ApiCall();

try {
  api
    .authenticate()
    .then(() => {
      console.log(api.token);
    })
    .catch((err) => {
      console.error(err);
    });
} catch (error) {}

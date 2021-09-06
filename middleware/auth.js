const { AppError } = require("./error");

// protect routes middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // check for authorisation bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // extracting token from headers
      token = req.headers.authorization.split(" ")[1];

      // verifying token
      const decoded = authUtil.verifyToken(token);

      // attaching user object to request object
      req.user = await getUser(decoded.user._id, db);

      next();
    } catch (error) {
      console.error(error);
      if (error.name === "TokenExpiredError")
        return next(new AppError("Session Expired", 401));
      return next(new AppError("Not Authorized, Token Failed.", 403));
    }
  }

  if (!token) return next(new AppError("Not Authorized, Token Failed.", 403));
});

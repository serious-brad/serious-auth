import ApiError from "../exceptions/apiErrors.js";
import tokenService from "../services/tokenService.js";

export default async function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader?.split(" ")[1]; // Optimization needed

    if (!accessToken) {
      next(ApiError.UnauthorizedError());
    }

    const userData = await tokenService.validateAccessToken(accessToken);

    if (!userData){
      next(ApiError.UnauthorizedError());
    }

    req.user = userData;

    next();
  } catch (e) {
    next(ApiError.UnauthorizedError());
  }
}

import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiErrors.js";
import authService from "../services/authService.js";

class AuthController {
  async login(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        throw ApiError.BadRequest("Ошибка при валидации", validationErrors.array())
      }

      const userData = await authService.login(req.body.email, req.body.password);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);

      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refreshToken(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();

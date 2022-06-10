import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiErrors.js";
import usersService from "../services/usersService.js";
import userServices from "../services/usersService.js";

class UserController {
  async createUser(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        throw ApiError.BadRequest("Ошибка при валидации", validationErrors.array())
      }
      const userData = await userServices.createUser(req.body, req.files?.avatar);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userServices.getUsers();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await userServices.getUser(req.params.id);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const users = await userServices.deleteUser(req.params.id);

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        throw ApiError.BadRequest("Ошибка при валидации", validationErrors.array())
      }

      const user = await userServices.updateUser(req.body, req.params.id);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async activateUser(req, res, next) {
    try {
      const user = await usersService.activate(req.params.link);

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();

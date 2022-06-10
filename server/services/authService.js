import bcrypt from "bcrypt";
import UsersModel from "../models/usersModel.js";
import tokenService from "./tokenService.js";
import UserDto from "../dtos/userDto.js";
import ApiError from "../exceptions/apiErrors.js";

class AuthService {
  async login(email, password) {
    const user = await UsersModel.findOne({
      where: { email }
    });

    if (!user) {
      throw ApiError.BadRequest(`Пользователь с адресом эл. почты: ${email} не существует`);
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw ApiError.BadRequest('Неверный пароль');
    }

    const userDto = new UserDto(user);
    const tokens = await tokenService.generate({ ...userDto });

    await tokenService.save(userDto.id, tokens.refreshToken);

    return {
      user,
      ...tokens
    };
  }

  async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);

    return token;
  }

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenData = await tokenService.findToken(refreshToken);

    if (!userData || !tokenData) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UsersModel.findOne({ where: { id: userData.id } }) // Optimization needed
    const userDto = new UserDto(user);
    const tokens = await tokenService.generate({ ...userDto });

    await tokenService.save(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userData
    };
  }
}

export default new AuthService();

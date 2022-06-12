import bcrypt from "bcrypt"
import { v4 } from "uuid";
import UserModel from "../models/usersModel.js"
import fileService from "./filesService.js"
import tokenService from "./tokenService.js";
import mailService from "./mailService.js";
import UserDto from "../dtos/userDto.js";
import ApiError from "../exceptions/apiErrors.js";

const saltRounds = 3;

class UserService {
  async createUser(user, avatar) {
    const candidate = await UserModel.findOne({ where: { email: user.email } });

    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с адресом эл. почты: ${user.email} уже существует`)
    }

    const fileName = fileService.saveFile(avatar);

    const hashPassword = await bcrypt.hash(user.password, saltRounds);
    const activationLink = v4();
    const createdUser = await UserModel.create({
      ...user,
      password: hashPassword,
      activationLink,
      avatar: fileName
    })

    const userDto = new UserDto(createdUser);
    const tokens = await tokenService.generate({ ...userDto });

    await mailService.sendActivationMail(userDto.email, userDto.activationLink);
    await tokenService.save(userDto.id, tokens.refreshToken);

    return {
      user: createdUser,
      ...tokens
    };
  }

  async getUsers() {
    const users = await UserModel.findAll();

    return users;
  }

  async getUser(id) {
    if (!id) {
      throw ApiError.BadRequest('Необходимо указать идентификатор пользователя');
    }

    const user = await UserModel.findByPk(id);

    return user;
  }

  async deleteUser(id) {
    if (!id) {
      throw ApiError.BadRequest('Необходимо указать идентификатор пользователя');
    }

    await UserModel.destroy({ where: { id } })

    return await this.getUsers();
  }

  async updateUser(user, id) {
    let updatedUser = await this.getUser(id);

    if (!updatedUser) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    const { firstName, lastName, email, password } = user;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    updatedUser.firstName = firstName || updatedUser.firstName;
    updatedUser.lastName = lastName || updatedUser.lastName;
    updatedUser.email = email || updatedUser.email;

    if (password) {
      updatedUser.password = hashPassword;
    }

    const userDto = new UserDto(updatedUser);
    const tokens = await tokenService.generate({ ...userDto });

    await tokenService.save(id, tokens.refreshToken);

    return updatedUser.save();
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ where: { activationLink } });

    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации');
    }

    user.isActivated = true;

    return await user.save();
  }
}

export default new UserService();

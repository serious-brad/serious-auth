import jwt from "jsonwebtoken";
import Token from "../models/tokenModel.js";

class TokenService {
  async generate(user) {
    return {
      accessToken: jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15s' }),
      refreshToken: jwt.sign(user, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30s' })
    }
  }

  async save(userId, refreshToken) {
    let tokenData = await this.getToken(userId);

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return await tokenData.save();
    }

    const token = await Token.create({ userId, refreshToken });

    return token;
  }

  async getToken(userId) {
    const token = await Token.findOne({
      where: { userId }
    });

    return token;
  }

  async validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const token = await Token.findOne({ where: { refreshToken } })
    return token;
  }

  async removeToken(refreshToken) {
    const token = await Token.destroy({ where: { refreshToken } })

    return token;
  }
}

export default new TokenService();

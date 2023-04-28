import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Boom from '@hapi/boom';
import { config } from "../config/config.js";
import { UserModel } from '../models/User.js';

export class LoginController {

  async singUp(username, password) {
    //se encripta la contraseña (se soluciona el problema de seguridad en base a la contraseña)
    const findOneUser = await UserModel.findOne({ username: username });
    if (findOneUser) {
      throw Boom.notAcceptable('this user already exist, please try other username');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username: username,
      password: hashPassword
    }
    const user = new UserModel(newUser);
    user.save();

    return {
      username: user.username,
    };
  }

  async loginUser(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw Boom.unauthorized('username is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw Boom.unauthorized('password is incorrect');
    }

    // @todo: generate a JWT token
    const payload = {
      sub: user._id,
    }
    const token = jwt.sign(payload, config.secret.jwt_secret, { expiresIn: '60min' });

    return {
      username: user.username,
      token
    }
  }
}

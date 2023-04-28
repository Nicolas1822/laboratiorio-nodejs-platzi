import { UserModel } from '../models/User.js'
import bcrypt from 'bcrypt'
import Boom from 'boom';

export class UserController {

  async getUser(idUser) {
    const user = await UserModel.findById(idUser);
    if (!user) {
      throw Boom.notFound('User not found');
    }
    return {
      username: user.username,
      createdAt: user.createdAt
    }
  }

  async updateUser(id, data) {
    const update = {
      _id: id
    }
    if (data.username) {
      update.username = data.username;
    }
    if (data.password) {
      const hash = await bcrypt.hash(data.password, 10);
      update.password = hash;
    }
    const user = await UserModel.findByIdAndUpdate(id, update);
    if (!user) {
      throw Boom.notFound('User not found');
    }
    return { message: 'Data update' };
  }

  async deleteUser(id) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw Boom.notFound('User not found');
    }
    return {
      message: 'User delete'
    }
  }
}

import { Router } from 'express';
import { UserModel } from '../../models/User.js';
import { UserController } from '../../controller/user.controller.js';
const userController = new UserController();

export const deleteUser = Router();

deleteUser.delete(
  '/',
  // @todo: Eliminar el usuario actual según la sesión del token JWT
  async (request, response, next) => {
    try {
      const payload = request.user;
      const deleteUser = await userController.deleteUser(payload.sub);

      return response.status(200).json({
        message: deleteUser.message
      });
    } catch (error) {
      next(error);
      console.error(`[signIn]: ${error}`);
    }
  }
);

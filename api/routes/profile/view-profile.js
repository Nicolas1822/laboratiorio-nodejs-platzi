import { Router } from 'express';
import { UserController } from '../../controller/user.controller.js';

const userController = new UserController();

export const viewUser = Router();

viewUser.get(
  '/',
  // @todo: Ver información del usuario actual según la sesión del token JWT
  async (request, response, next) => {
    try {
      const payload = request.user;
      const user = await userController.getUser(payload.sub);
      return response.status(200).json({
        username: user.username,
        createdAt: user.createdAt
      });
    } catch (error) {
      next(error);
      console.error(`[signIn]: ${error}`);
    }
  }
);

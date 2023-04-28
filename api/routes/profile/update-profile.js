import { Router } from 'express';
import { validateHandler } from '../../middleware/validate.handler.js';
import { updateSchema } from '../../schema/validation.schema.js';
import { UserController } from '../../controller/user.controller.js';
const userController = new UserController();

export const updateUser = Router();

updateUser.put(
  '/',
  validateHandler(updateSchema, 'body'),
  // @todo: Actualizar información usuario según la sesión del token JWT (Resuelta)
  async (request, response, next) => {
    try {
      const data = request.body;
      const payload = request.user;
      const update = await userController.updateUser(payload.sub, data);

      return response.status(200).json({
        message: update.message
      });
    } catch (error) {
      next(error);
      console.error(`[signIn]: ${error}`);
    }
  });

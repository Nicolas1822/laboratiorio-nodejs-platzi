import { Router } from 'express';
import { LoginController } from '../controller/login.controller.js'
import { body, validationResult } from 'express-validator';
import { UserModel } from '../models/User.js';
import { loginSchema } from '../schema/validation.schema.js'
import { validateHandler } from '../middleware/validate.handler.js'
const loginController = new LoginController();
export const login = Router();

login.post(
  '/',
  // Validación y sanitización de los datos de entrada
  validateHandler(loginSchema, 'body'),
  //
  async (request, response, next) => {
    try {
      const { username, password } = request.body;
      const user = await loginController.loginUser(username, password);

      return response.status(201).json({
        user: user.username,
        token: user.token
      });
    } catch (error) {
      next(error);
      console.error(`[signIn]: ${error}`);
    }
  }
);

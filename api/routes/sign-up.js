import { Router } from 'express';
import { signUpSchema } from '../schema/validation.schema.js'
import { validateHandler } from '../middleware/validate.handler.js'
import { LoginController } from "../controller/login.controller.js";

export const signUp = Router();
const loginController = new LoginController()

signUp.post(
  '/',
  // Validación y sanitización de los datos de entrada
  validateHandler(signUpSchema, 'body'),
  //
  async (request, response, next) => {
    try {
      const { username, password } = request.body;

      //Solucion problema de la contraseña
      const user = await loginController.singUp(username, password);

      return response
        .status(201)
        .json({
          username: user.username,
        });
    } catch (error) {
      next(error);
      console.error(`[signIn]: ${error}`);
    }
  }
);

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { signUp } from './routes/sign-up.js';
import { login } from './routes/login.js';
import { profile } from './routes/profile/index.js';

export const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API
// @todo: Almancenar el password de forma segura (Resuelto)
app.use('/api/v1/sign-up', signUp);
// @todo: generar un token jwt seguro para la sesión del usuario (Resuelto)
app.use('/api/v1/login', login);
// @todo: completar las rutas de profile
app.use('/api/v1/profile', passport.authenticate('jwt', { session: false }), profile);

app.get('/', async (req, res) => {
  res.send('Platzi laboratio Autenticación con Node.js');
});


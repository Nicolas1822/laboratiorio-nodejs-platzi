import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { config } from '../../config/config.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret.jwt_secret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

passport.use(JwtStrategy);

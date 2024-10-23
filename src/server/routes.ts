import { Express } from 'express';
import authController from './controllers/auth';
import testController from './controllers/test';
import UserController from './controllers/users';

export default function routes(app: Express) {
  app.use(testController());
  app.use(authController());
  app.use(UserController.init());
}

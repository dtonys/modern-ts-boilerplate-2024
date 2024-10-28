import { Request, Response, Router } from 'express';
import { handleAsyncError } from '../helpers';

const AuthController = {
  getRoutes() {
    const router = Router();
    router.post('/api/signup', handleAsyncError(this.signup));
    router.post('/api/login', handleAsyncError(this.login));
    router.get('/api/logout', handleAsyncError(this.logout));
    router.get('/api/session', handleAsyncError(this.sessionInfo));
    router.get('/api/verify-email', handleAsyncError(this.verifyEmail));
    router.post('/api/lost-password', handleAsyncError(this.lostPassword));
    router.post('/api/reset-password', handleAsyncError(this.resetPassword));
    router.get('/api/email/:slug/available', handleAsyncError(this.emailAvailable));
    router.get('/api/username/:slug/available', handleAsyncError(this.usernameAvailable));
    router.post('/api/logonas', handleAsyncError(this.logonas));
    return router;
  },
  signup: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'signup' });
  },
  login: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'login' });
  },
  logout: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'logout' });
  },
  sessionInfo: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'sessionInfo' });
  },
  verifyEmail: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'verifyEmail' });
  },
  lostPassword: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'lostPassword' });
  },
  resetPassword: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'resetPassword' });
  },
  emailAvailable: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'emailAvailable' });
  },
  usernameAvailable: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'usernameAvailable' });
  },
  logonas: async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    res.send({ name: 'logonas' });
  },
};

export default AuthController;

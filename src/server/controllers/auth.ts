import { Request, Response, Router, RequestHandler } from 'express';

interface HandlerMap {
  [key: string]: RequestHandler;
}

const authRoutes = (handlers: HandlerMap) => {
  const router = Router();
  router.post('/api/signup', handlers.signup!);
  router.post('/api/login', handlers.login!);
  router.get('/api/logout', handlers.logout!);
  router.get('/api/session', handlers.sessionInfo!);
  router.get('/api/verify-email', handlers.verifyEmail!);
  router.post('/api/lost-password', handlers.lostPassword!);
  router.post('/api/reset-password', handlers.resetPassword!);
  router.get('/api/email/:slug/available', handlers.emailAvailable!);
  router.get('/api/username/:slug/available', handlers.usernameAvailable!);
  router.post('/api/logonas', handlers.logonas!);
  return router;
};

const authHandlers = (): HandlerMap => {
  return {
    signup: (req: Request, res: Response) => {
      res.send({ name: 'signup' });
    },
    login: (req: Request, res: Response) => {
      res.send({ name: 'login' });
    },
    logout: (req: Request, res: Response) => {
      res.send({ name: 'logout' });
    },
    sessionInfo: (req: Request, res: Response) => {
      res.send({ name: 'sessionInfo' });
    },
    verifyEmail: (req: Request, res: Response) => {
      res.send({ name: 'verifyEmail' });
    },
    lostPassword: (req: Request, res: Response) => {
      res.send({ name: 'lostPassword' });
    },
    resetPassword: (req: Request, res: Response) => {
      res.send({ name: 'resetPassword' });
    },
    emailAvailable: (req: Request, res: Response) => {
      res.send({ name: 'emailAvailable' });
    },
    usernameAvailable: (req: Request, res: Response) => {
      res.send({ name: 'usernameAvailable' });
    },
    logonas: (req: Request, res: Response) => {
      res.send({ name: 'logonas' });
    },
  };
};

const authController = (): Router => {
  const handlers = authHandlers();
  const router = authRoutes(handlers);
  return router;
};

export default authController;

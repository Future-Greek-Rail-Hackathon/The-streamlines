import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = getHeadersToken(req);
  if (authToken === null) {
    return returnUnauthorized(res);
  }

  if (req.path.indexOf('/api/') === 0) {
    if (authToken === process.env.API_TOKEN) {
      return next();
    } else {
      return returnUnauthorized(res);
    }
  } else {
    const userModel = new UserService();
    const user = await userModel.findByEmail(authToken);
    if (user) {
      res.locals.user = user;
      return next();
    } else {
      return returnUnauthorized(res);
    }
  }
};

const getHeadersToken = (req: Request): string => {
  if (req.cookies.bamies) {
    return req.cookies.bamies;
  }

  const { authorization } = req.headers;
  if (!authorization) return null;

  if (!authorization.startsWith('Bearer')) return null;

  const split = authorization.split('Bearer ');
  if (split.length !== 2) return null;

  return split[1];
};

const returnUnauthorized = (res: Response) => {
  const error = {
    success: false,
    error_code: 401,
    error_description: 'Unauthorized',
  };
  return res.status(401).send(error);
};

export default isAuthenticated;

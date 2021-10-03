import { NextFunction, Request, Response, Router } from 'express';
import catchErrors from '../lib/catchErrors';
import { UserService } from '../services/user';
const CryptoJS = require('crypto-js');

const userHandler: Router = Router();

userHandler
  .route('/register') // post /api/user/register
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const email = req.body['email'];
      const password = req.body['password'];

      const userModel = new UserService();
      const user = userModel.userRepository.create();
      user.email = email;

      user.password = CryptoJS.SHA256(password).toString();
      const newUser = await userModel.createUser(user);
      res.json(newUser);
    }),
  );

userHandler
  .route('/login') // post /api/user/login
  .post(
    catchErrors(async (req: Request, res: Response, next: NextFunction) => {
      const email = req.body['email'];
      const password = req.body['password'];

      const userModel = new UserService();
      const user = await userModel.findByEmail(email);
      if (user) {
        if (user.password !== CryptoJS.SHA256(password).toString()) {
          res.end('Wrong password');
        }
      } else {
        res.end('Wrong email');
      }
      res.json(user);
    }),
  );

export default userHandler;

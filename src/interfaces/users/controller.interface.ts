import { Request, Response } from 'express';
import { User } from '@entities/users/user.entity';

interface IUserRequest extends Request {
  user: User;
}

export default interface IUserController {
  (req: IUserRequest, res: Response): void;
}
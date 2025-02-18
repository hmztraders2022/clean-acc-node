import express from 'express';
import userController from '@controllers/users/user.controller';

const userRouter = express.Router();

userRouter.post('/', userController.listUser);

export default userRouter;
import * as express from 'express';
import authRouter from '@routes/auth/auth.routes';
import userRouter from './users.routes';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'ExpressJS, Typescript, TypeORM, MySQL' });
});
router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
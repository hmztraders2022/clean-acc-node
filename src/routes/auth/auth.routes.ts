import express from 'express';
import userController from '@controllers/users/user.controller';
import userSchemas from '@validations/schemas/user.schemas';
import validateSchemaJoi from '@middlewares/validate_schema_joi';

const router = express.Router();

router.post('/register', validateSchemaJoi(userSchemas.register), userController.createUser);

export default router;
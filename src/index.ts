require('dotenv').config();

import 'reflect-metadata';
import logger from '@configs/logger.config';
import app from '@configs/express.config';
import AppDataSource from '@configs/typeorm.config';
import { UserSeed } from '@seeds/users/user.seeds';
import { RoleSeeds } from '@seeds/base/roles.seeds';

const PORT = process.env.PORT || 5000;

const connect = async () => {
  try {
    const initDb = await AppDataSource.initialize();
    await AppDataSource.runMigrations();
    await UserSeed.addUser(initDb);
    await RoleSeeds.addRoles(initDb);
    logger.info('Connect to database successfully');
    app.listen(PORT, () => {
      logger.info(`Server running at ${PORT}`);
    });
  } catch (e) {
    logger.error(`The connection to database was failed with error: ${e}`);
  }
}

connect();
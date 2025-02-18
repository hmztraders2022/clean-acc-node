import { DataSource } from "typeorm";
import logger from "@configs/logger.config";
import { RoleEntity } from "@entities/roles/roles.entity";

export class RoleSeeds {
  static async addRoles(dataSource: DataSource) {
    try {
      const roleRepository = dataSource.getRepository(RoleEntity);
  
      const existingRoles = await roleRepository.find();
      if (existingRoles.length > 0) {
        logger.warn('[SEEDS]: Table roles sudah terisi (seeded tidak dijalankan)')
        return;
      }
      await roleRepository.save([
        { role: 'admin' },
        { role: 'user' },
        { role: 'moderator' },
        { role: 'guest' },
      ]);
      logger.info('AddRoles Seed berhasil')
    } catch (error) {
      logger.error(`Error: ${error}`);
    }
  }
}

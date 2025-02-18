import { DataSource } from "typeorm";
import AppDataSource from '@configs/typeorm.config';

const revertMigration = async () => {

  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();

  // const migration = new AddUserRoleRelation1634749876543(); // nama migrasi yang akan direvert
  // await migration.down(queryRunner); // Menjalankan fungsi down()
  console.log("Migrasi berhasil di-revert!");
};

revertMigration().catch(console.error);

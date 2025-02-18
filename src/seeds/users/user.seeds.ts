import { DataSource } from "typeorm";
import { User } from "@entities/users/user.entity";
import logger from "@configs/logger.config";

export class UserSeed {
  static async addUser(dataSource: DataSource) {
    try {
      const userRepository = dataSource.getRepository(User);
  
      // Mengecek apakah data sudah ada atau belum
      const existingUsers = await userRepository.find();
      if (existingUsers.length > 0) {
        logger.warn('[SEEDS]: Table users sudah terisi (seeded tidak dijalankan)')
        return;
      }
  
      // Menambahkan data contoh
      await userRepository.insert([
        {
          email: "john.doe@example.com",
          password: "password123",
          firstName: "John",
          lastName: "Doe",
          birth_date: new Date("1990-01-01"),
          isDeleted: false,
        },
        {
          email: "jane.doe@example.com",
          password: "securepass",
          firstName: "Jane",
          lastName: "Doe",
          birth_date: new Date("1992-05-15"),
          isDeleted: false,
        },
        {
          email: "alex.smith@example.com",
          password: "alex123",
          firstName: "Alex",
          lastName: "Smith",
          birth_date: new Date("1985-09-20"),
          isDeleted: false,
        },
        {
          email: "emily.johnson@example.com",
          password: "emilysecure",
          firstName: "Emily",
          lastName: "Johnson",
          birth_date: new Date("1995-03-10"),
          isDeleted: false,
        },
        {
          email: "michael.brown@example.com",
          password: "brownie99",
          firstName: "Michael",
          lastName: "Brown",
          birth_date: new Date("1988-07-25"),
          isDeleted: false,
        },
        {
          email: "sarah.wilson@example.com",
          password: "wilson2023",
          firstName: "Sarah",
          lastName: "Wilson",
          birth_date: new Date("1993-11-12"),
          isDeleted: false,
        },
        {
          email: "david.lee@example.com",
          password: "leesecret",
          firstName: "David",
          lastName: "Lee",
          birth_date: new Date("1987-04-18"),
          isDeleted: false,
        },
        {
          email: "linda.white@example.com",
          password: "whiteflower",
          firstName: "Linda",
          lastName: "White",
          birth_date: new Date("1991-08-05"),
          isDeleted: false,
        },
        {
          email: "robert.moore@example.com",
          password: "moorepower",
          firstName: "Robert",
          lastName: "Moore",
          birth_date: new Date("1982-12-30"),
          isDeleted: false,
        },
        {
          email: "karen.davis@example.com",
          password: "daviscool",
          firstName: "Karen",
          lastName: "Davis",
          birth_date: new Date("1994-06-22"),
          isDeleted: false,
        },
      ]);
      logger.info('AddUser Seed berhasil')
    } catch (error) {
      logger.error(`Error: ${error}`);
    }
  }
}

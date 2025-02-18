import { ICreateUser, IUserQueryParams } from "users/users.interface";
import { User } from "@entities/users/user.entity";
import { Encryption } from "@ultilities/encryption";
import AppDataSource from '@configs/typeorm.config';
import { RoleEntity } from "@entities/roles/roles.entity";
import { In } from "typeorm";
import ApiCommonUltility from "@ultilities/api.common.ultilities";

export class UserServices {
  static async create(params: ICreateUser) {
    const user = new User();
    user.email = params.email;
    user.password = await Encryption.generateHash(params.password, 10);
    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.birth_date = params.birth_date;

    const roleRepository = AppDataSource.getRepository(RoleEntity);
    user.roles = await roleRepository.findBy({
      id: In(params.roles),
    });
    const userRepository = AppDataSource.getRepository(User);
    // await userRepository.save(user);
    return { ...user };
  }

  static async list(params: IUserQueryParams) {
    let userRepo = AppDataSource.getRepository(User).createQueryBuilder('user');
    userRepo = userRepo.where('user.isDeleted = :isDeleted', { isDeleted: false });
  
    if (params.keyword) {
      userRepo = userRepo.andWhere(
        '(LOWER(user.firstName) LIKE LOWER(:keyword) OR LOWER(user.lastName) LIKE LOWER(:keyword))',
        { keyword: `%${params.keyword}%` },
      );
    }
  
    // Pagination
    const paginationRepo = userRepo;
    const total = await paginationRepo.getMany();
    console.log(total, "total")
    const pagRes = ApiCommonUltility.getPagination(total.length, params.limit, params.page);
  
    userRepo = userRepo.limit(params.limit).offset(ApiCommonUltility.getOffset(params.limit, params.page));
    const users = await userRepo.getMany();
  
    const response = [];
    if (users && users.length) {
      for (const item of users) {
        response.push(ApiCommonUltility.sanitizeUser(item));
      }
    }
    return { response, pagination: pagRes.pagination };
  };
}
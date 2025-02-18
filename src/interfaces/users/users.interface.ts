import { IBaseQueryParams } from "common.interfaces";

export interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birth_date?: Date;
  roles?: number[];
}

export interface IUserQueryParams extends IBaseQueryParams {
  keyword?: string;
}
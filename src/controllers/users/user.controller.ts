import { UserServices } from "@services/users/users.services";
import ApiResponse from "@ultilities/api.ultilities";
import IUserController from "users/controller.interface";
import { ICreateUser, IUserQueryParams } from "users/users.interface";
import httpStatusCodes from 'http-status-codes';
import constants from "@constant/error";
import ApiCommonUltility from "@ultilities/api.common.ultilities";

const createUser: IUserController = async (req, res) => {
  try {
    const params: ICreateUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
    }
    const user = await UserServices.create(params);
    return ApiResponse.result(res, user, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.DUPLICATED) {
      return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Email already exists.');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const listUser: IUserController = async (req, res) => {
  try {
    const limit = ApiCommonUltility.getQueryParam(req, 'limit');
    const page = ApiCommonUltility.getQueryParam(req, 'page');
    const keyword = ApiCommonUltility.getQueryParam(req, 'keyword');
    const params: IUserQueryParams = { limit, page, keyword };
    const data = await UserServices.list(params);
    return ApiResponse.result(res, data.response, httpStatusCodes.OK, null, data.pagination);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

export default { createUser, listUser };
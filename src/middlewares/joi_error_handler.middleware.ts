import { Request, Response, NextFunction } from "express";
import * as HttpStatus from 'http-status-codes';
import { IError } from '@middlewares/api_error_handler_middleware';

interface IJoiErrorDetail {
  message?: string;
  path?: string;
}

interface IJoiError extends IError {
  isJoi?: boolean;
  details?: Array<IJoiErrorDetail>;
}

const joiErrorHandler = (err: IJoiError, req: Request, res: Response, _next: NextFunction) => {
  console.log(err, err.isJoi, "err")
  if (err.isJoi) {
    const error = {
      code: HttpStatus.StatusCodes.BAD_REQUEST,
      message: HttpStatus.getReasonPhrase(HttpStatus.StatusCodes.BAD_REQUEST),
      details: err.details && err.details?.map(err => ({
          message: err.message,
          param: err.path,
        })
      ),
    };
    res.status(HttpStatus.StatusCodes.BAD_REQUEST).json(error);
    return;
  }

  return _next(err);
};

export default joiErrorHandler;
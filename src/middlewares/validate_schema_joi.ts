import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

const validateSchemaJoi = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        message: "Validation JOI Error",
        errors: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      });
      return;
    }

    next();
  };
};

export default validateSchemaJoi;

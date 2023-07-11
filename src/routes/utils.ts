import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const RegexPassowrd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/ 
export const saltRounds = 10
export const checkErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
next();
};
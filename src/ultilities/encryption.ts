import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import constants from "@constant/applications";

export class Encryption {
  static async generateHash(password: string, saltRounds: number): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      throw error;
    }
  }

  static async verifyHash(password: string, hash: string): Promise<boolean> {
    try {
      const compares = await bcrypt.compare(password, hash);
      return compares;
    } catch (error) {
      throw error;
    }
  }

  static async generateCookie(key: string, value: string) {
    try {
      const data: { [key: string]: string } = {};
      data[key] = value;
      return await jwt.sign({ data }, constants.env.authSecret, {
        expiresIn: constants.timers.userCookieExpiry,
      });
    } catch (error) {
      throw error;
    }
  };

  static async verifyCookie(token: string): Promise<any> {
    try {
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, constants.env.authSecret, (err: Error, decoded: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
      return decoded;
    } catch (err) {
      return null;
    }
  }
}
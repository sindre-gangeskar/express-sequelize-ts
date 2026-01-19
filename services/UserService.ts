import { User } from "@models/users";

export class UserService {
  static async getAll() {
    try {
      return User.findAll({ attributes: { exclude: [ "password" ] } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
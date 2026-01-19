import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface UserAttributes {
  id?: number;
  username: string,
  password: string,
  roleId: number
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id" > { }
export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare public id: number;
  declare public roleId: number
  declare public username: string;
  declare public password: string;
}

export function initUser(sequelize: Sequelize) {
  User.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "roles", key: "id" }, }
  }, { sequelize, timestamps: false, tableName: 'users' })
}
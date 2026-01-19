import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface RoleAttributes {
  id?: number;
  name: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> { }
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  declare public id: number
  declare public name: string
}
export function initRole(sequelize: Sequelize) {
  Role.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, { sequelize, timestamps: false, tableName: 'roles' })
}


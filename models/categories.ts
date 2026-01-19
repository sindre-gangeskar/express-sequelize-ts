import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface CategoryAttributes {
  id?: number;
  name: string
}
export interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> { }

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {
  declare public id?: number;
  declare public name: string;
}

export function initCategory(sequelize: Sequelize) {
  Category.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
  }, { sequelize, timestamps: false, tableName: "categories" })
}
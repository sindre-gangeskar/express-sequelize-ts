import { Sequelize, Model, Optional, DataTypes } from 'sequelize';

export interface ProductAttributes {
  id?: number;
  name: string;
  categoryId: number;
}

export interface CreationProductAttributes extends Optional<ProductAttributes, "id"> { };
export class Product extends Model<ProductAttributes, CreationProductAttributes> {
  declare public id: number;
  declare public name: string;
  declare public categoryId: number
}

export function initProduct(sequelize: Sequelize) {
  Product.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, references: { model: 'categories', key: 'id' }, allowNull: false }
  }, { sequelize, timestamps: false, tableName: 'products' })
}
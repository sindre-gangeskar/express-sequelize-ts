import { User, UserAttributes, initUser } from "@models/users";
import { Role, RoleAttributes, initRole } from "@models/roles";
import { Category, CategoryAttributes, initCategory } from "@models/categories";
import { Product, ProductAttributes, initProduct } from "@models/products";

import { Sequelize } from "sequelize";
import { generateHashPassword } from "./utils";
import sequelize from "@models/index";

function initializeAndAssociate(sequelize: Sequelize): void {
  initUser(sequelize);
  initRole(sequelize);
  initCategory(sequelize);
  initProduct(sequelize);

  User.belongsTo(Role, { foreignKey: 'roleId' });
  Role.hasMany(User, { foreignKey: 'roleId', onDelete: 'RESTRICT' });
  Product.belongsTo(Category, { foreignKey: 'categoryId' });
  Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'RESTRICT' });
}

async function seed(): Promise<void> {
  try {
    initializeAndAssociate(sequelize)

    const hasRoles = await Role.count() > 0;
    const hasUsers = await User.count() > 0;
    const hasCategories = await Category.count() > 0;
    const hasProducts = await Product.count() > 0;

    if (!hasRoles) {
      const roles: RoleAttributes[] = [ { name: "user" }, { name: "admin" } ];
      for (const role of roles) {
        await Role.create({ name: role.name });
      }
    } else console.info("Roles records already exist in database");

    if (!hasUsers) {
      const userRole = await Role.findOne({ where: { name: "user" } });
      const users: UserAttributes[] = [ { username: "admin", password: "super_secret", roleId: userRole?.id! } ]
      for (const user of users) {
        const password = await generateHashPassword(user.password);
        if (!userRole) { console.info("Skipping user creation.. Role record of 'user' as name not found.."); continue; };
        await User.create({ username: user.username, password, roleId: userRole.id })
      }

    }
    else console.info("Users records already exist in database");

    if (!hasCategories) {
      const categories: CategoryAttributes[] = [ { name: "Phones" }, { name: "TVs" }, { name: "Appliances" } ]
      for (const category of categories) {
        await Category.create({ name: category.name })
      }
    } else console.info('Category records already exist in database');

    if (!hasProducts) {
      const phoneCategory = await Category.findOne({ where: { name: 'Phones' } });
      const tvCategory = await Category.findOne({ where: { name: "TVs" } });
      const applianceCategory = await Category.findOne({ where: { name: "Appliances" } });

      const products: ProductAttributes[] = [
        { name: "ObiDobi 128GB w/ 5G & WiFi Blue", categoryId: phoneCategory?.id! },
        { name: "ObiDobi 128GB w/ 5G & WiFi Red", categoryId: phoneCategory?.id! },
        { name: "ObiDobi 128GB w/ 5G & WiFi Black", categoryId: phoneCategory?.id! },
        { name: 'PeeWee 48" OLED Smart TV', categoryId: tvCategory?.id! },
        { name: 'PeeWee 60" OLED Smart TV', categoryId: tvCategory?.id! },
        { name: 'PeeWee 86" OLED Smart TV', categoryId: tvCategory?.id! },
        { name: 'MochaBettah Coffee Machine', categoryId: applianceCategory?.id! },
        { name: 'Universal phone carger 3-ports 1xUSB 2xUSB-C', categoryId: applianceCategory?.id! },
      ]
      for (const product of products) {
        await Product.create({ name: product.name, categoryId: product.categoryId });
      }
    } else console.info("Product records already exist in the database");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initializeAndAssociate, seed }
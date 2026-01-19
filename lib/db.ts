import { User, UserAttributes, initUser } from "@models/users";
import { Role, RoleAttributes, initRole } from "@models/roles";
import { Sequelize } from "sequelize";
import { generateHashPassword } from "./utils";
import sequelize from "@models/index";

function initializeAndAssociate(sequelize: Sequelize): void {
  initUser(sequelize);
  initRole(sequelize);

  User.belongsTo(Role, { foreignKey: 'roleId' });
  Role.hasMany(User, { foreignKey: 'roleId', onDelete: 'RESTRICT' });
}

async function seed(): Promise<void> {
  try {
    initializeAndAssociate(sequelize)

    const roleCount = await Role.count();
    const roles: RoleAttributes[] = [ { name: "user" }, { name: "admin" } ];
    const usersCount = await User.count();

    if (!roleCount)
      for (const role of roles) {
        await Role.create({ name: role.name });
      }
    else console.info("Roles records already exist in database");

    const userRole = await Role.findOne({ where: { name: "user" } });
    if (!usersCount) {
      const users: UserAttributes[] = [ { username: "admin", password: "super_secret", roleId: userRole?.id! } ]
      for (const user of users) {
        const password = await generateHashPassword(user.password);
        if (!userRole) { console.info("Skipping user creation.. Role record of 'user' as name not found.."); continue; };
        await User.create({ username: user.username, password, roleId: userRole.id })
      }

    }
    else console.info("Users records already exist in database");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { initializeAndAssociate, seed }
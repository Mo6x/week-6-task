import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { BookInstance } from "./book";

interface AuthorAttributes {
  id: string;
  AuthorName: string;
  email: string;
  password: string;
  PhoneNumber: string;
}

export class AuthorInstance extends Model<AuthorAttributes> {}

AuthorInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    AuthorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: "Authors",
  }
);

AuthorInstance.hasMany(BookInstance, { foreignKey: "authorsID", as: "Books" });

BookInstance.belongsTo(AuthorInstance, {
  foreignKey: "authorsID",
  as: "Authors",
});

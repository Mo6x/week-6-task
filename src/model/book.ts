import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface BookAttributes {
  id: string;
  imageurl: string;
  Title: string;
  Description: string;
  pageCount: number;
  Genre: string;
  bookId: number;
  Publisher: string;
}
export class BookInstance extends Model<BookAttributes> {}

BookInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Title: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },

    pageCount: {
      type: DataTypes.NUMBER,
      primaryKey: false,
      allowNull: false,
    },
    Genre: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
    Publisher: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Books",
  }
);

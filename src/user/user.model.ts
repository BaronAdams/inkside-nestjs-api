import { Column, DataType, HasMany, IsArray, IsEmail, Model, Table } from 'sequelize-typescript';
import { Post } from '../post/post.model';

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @IsArray
  @Column({
    type: DataType.ARRAY(DataType.UUID),
    allowNull: true,
    defaultValue: [],
  })
  followingUsers: string[];  // Tableau d'IDs des utilisateurs suivis

  @IsArray
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  followingCategories: string[];  // Tableau de catégories suivies

  @HasMany(() => Post)
  posts: Post[];
}


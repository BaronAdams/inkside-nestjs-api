import { Column, DataType, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
export class Post extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  category: string[];  // Catégorie d'un post (peut être suivie par un utilisateur)

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;  // UUID de l'utilisateur créateur du post

  @BelongsTo(() => User)
  user: User;
}

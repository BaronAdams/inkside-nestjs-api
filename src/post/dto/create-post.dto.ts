import { IsString, IsNotEmpty, IsUUID, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string; // UUID de l'utilisateur créateur du post

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  categories: string[]; // Catégorie d'un post
}

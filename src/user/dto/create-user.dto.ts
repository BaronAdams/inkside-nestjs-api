import { IsString, IsNotEmpty, IsArray, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  followingCategories?: string[]; // Catégories de posts suivies
}

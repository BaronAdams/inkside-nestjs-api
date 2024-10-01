import { IsString, IsNotEmpty, IsArray, IsEmail, IsOptional } from 'class-validator';

export class RegisterUserDto {
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

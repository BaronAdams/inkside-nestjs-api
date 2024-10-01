import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor( @InjectModel(User) private userModel: typeof User ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    // @ts-ignore
    const user = await this.userModel.create(createUserDto)
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userModel.findAll()
    return users;
  }

  async findLimitedUsers(page?:number): Promise<User[]> {
    let pageNumber = page ? page : 0
    const users = await this.userModel.findAll({ offset: pageNumber*15, limit:15 })
    return users;
  }

  async findById(id: string): Promise<User> {
    const user= await this.userModel.findByPk(id)
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } })
    return user  
  }

  async findByEmailAndUsername(email: string, username:string ): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { [Op.or]: {email, username} } })
    return user  
  }

  // Ajoute un utilisateur au tableau des utilisateurs suivis
  async followOrUnfollowUser(userId: string, followId: string): Promise<void> {
    const user = await this.findById(userId);
    let followingUsers = user.followingUsers
    if (followingUsers.includes(followId)) {
      user.followingUsers = followingUsers.filter((id)=>id !== followId)
    }else{
      user.followingUsers.push(followId);
    }
    user.save();
  }

  // Suit une catégorie de post
  async followOrUnfollowCategory(userId: string, category: string): Promise<void> {
    const user = await this.findById(userId);
    let followingCategories = user.followingCategories
    if (followingCategories.includes(category)) {
      user.followingCategories = followingCategories.filter((cat)=>cat !== category)
    }else{
      user.followingCategories.push(category);
    }
    user.save();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

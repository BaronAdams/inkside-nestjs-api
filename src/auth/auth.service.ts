import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user-dto';
import { RegisterUserDto } from './dto/register-user-dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async login( loginBody : LoginUserDto){
        let userId = await this.validateUser(loginBody.email, loginBody.password)
        const payload = { userId };
        return {
            access_token: this.jwtService.sign(payload),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60* 1000).toISOString()
        };
    }
    
    async register(registerUserDto: RegisterUserDto) {
        const existingUser = await this.userService.findByEmailAndUsername(registerUserDto.email, registerUserDto.username)
        if(existingUser) throw new NotFoundException('User already exists');
        const hashedPassword = await this.hashPassword(registerUserDto.password)
        let newUser = await this.userService.create({...registerUserDto, password: hashedPassword})
        return newUser;
    }
    
    async logout() {
        const users = await User.findAll()
        return `This action returns all user`;
    }
    
    private async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if(!user) throw new NotFoundException('User not found');
        let isValidPassword = await this.isValidPassword(password, user.password)
        if(!isValidPassword) throw new UnauthorizedException('Invalid password');
        return user.id;
      }

    private async hashPassword(password: string) {
        let salt = bcrypt.genSaltSync(10)
        return await bcrypt.hash(password,salt)
    }

    private async isValidPassword(password:string, hash:string) {
        return await bcrypt.compare(password,hash)
    }
}

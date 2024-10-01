import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':userId/follow-or-unfollow/')
  followOrUnfollowUser(
    @Param('userId') userId: string,
    @Request() req
  ) {
    return this.userService.followOrUnfollowUser(userId, req.user.id);
  }
  
  @UseGuards(AuthGuard)
  @Patch('follow-or-unfollow-category')
  followOrUnfollowCategory(
    @Body('category') category: string,
    @Request() req
  ) {
    return this.userService.followOrUnfollowCategory(req.user.id, category);
  }
}

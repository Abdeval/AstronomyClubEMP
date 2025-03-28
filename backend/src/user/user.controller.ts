import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/me')
  getMyProfile() {
    return this.userService.getMyProfile();
  }
}

import { Body, Controller, Get, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/auth.guard';
import { User } from './user.decorator';
import { UpdateUserDto } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getUsers() {
    return this.userService.getUsers();
  }
  
  // ! get the user info for the profile details
  @Get('me')
  getUserById(@User('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  // ! this will make the interpretation of the FormData allowed
  @UseInterceptors(FileInterceptor('file', storageConfig))
  @Patch("update")
  updateUser(
    @User('id') userId: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateUser(userId, dto, file);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}
    @Get('/')
    getUsers(){
        return this.userService.getUsers()
    }

    @Get('/me')
    getMyProfile()
    {
        return this.userService.getMyProfile()
    }
}

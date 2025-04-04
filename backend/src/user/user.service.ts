import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(userId: string) {
    if(!userId) throw new NotFoundException("user not found");

    return await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  }

  // ! update the user based on the userId
  async updateUser(userId: string, dto: UpdateUserDto, file: Express.Multer.File) {
      if(!userId) throw new ForbiddenException("Not authorized...");
      let avatarUrl: string = "";

      if(file) {
        const baseUrl = process.env.API_URL || "http://localhost:3000";
        avatarUrl = `${baseUrl}/uploads/${file.filename}`;
      }
      
      const updatedUser = avatarUrl ? { avatar: avatarUrl, ...dto } : dto;

      const res = await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          ...updatedUser
        }
      });
      
      const { id, password, ...other } = res;
      return other;
  }
}

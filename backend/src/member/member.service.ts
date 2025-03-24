import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {};

  async create(createMemberDto: CreateMemberDto) {
      // todo check the user
      const isUser = await this.prisma.user.findUnique({
        where: {
          id: createMemberDto.userId
        }
      }) ;

      // todo check the group
      const isGroup = await this.prisma.user.findUnique({
        where: {
          id: createMemberDto.userId
        }
      }) ;
      
      if(!isGroup || !isUser) throw new ForbiddenException("user or group not found");

      const member = await this.prisma.groupMember.create({
        data: {
          userId: createMemberDto.userId,
          groupId: createMemberDto.groupId,
          role: createMemberDto.role
        }
      });

      return member;
  };

  findAll() {
    return `This action returns all member`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}

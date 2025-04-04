import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) { }

  async create(createMemberDto: CreateMemberDto) {
    // todo check the user
    // console.log('before the creation...');
    const isUser = await this.prisma.user.findUnique({
      where: {
        id: createMemberDto.userId,
      },
    });

    // todo check the group
    const isGroup = await this.prisma.user.findUnique({
      where: {
        id: createMemberDto.userId,
      },
    });

    if (!isGroup || !isUser)
      throw new ForbiddenException('user or group not found');

    const member = await this.prisma.groupMember.create({
      data: {
        userId: createMemberDto.userId,
        groupId: createMemberDto.groupId,
        role: createMemberDto.role,
      },
    });

    console.log(member, "created");

    return member;
  }

  getAllMembers() {
    return `This action returns all member`;
  }

  getMemberById(id: string) {
    return `This action returns a #${id} member`;
  }

  updateMember(id: string, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  async deleteMember(id: string) {
    const res = await this.prisma.groupMember.delete({
      where: {
        id
      }
    });

    if(!res) throw new NotFoundException("No member to delete!");
    return res;
  }
}

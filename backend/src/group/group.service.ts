import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroupDto } from './dto';
import { Group } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) { }

  // ! get all the groups
  async getAllGroups() {
    const groups = await this.prisma.group.findMany({
      include: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                email: true,
                avatar: true,
                // role: true,
              },
            },
            role: true,
            status: true,
            id: true
          },
        },
      }
    });

    return groups.map(group => ({
      ...group,
      members: group.members.map(member => ({ ...member.user, role: member.role, memberId: member.id, status: member.status })) // Extract user object
    }));
  }

  // ! group info
  async getGroupInfo({
    adminId,
    groupId,
  }: {
    adminId?: string;
    groupId?: string;
  }) {
    try {
      let groupInfo: any;
      if (adminId) {
        console.log('admin group info');
        groupInfo = await this.prisma.group.findFirst({
          where: {
            members: {
              some: {
                userId: adminId,
                role: 'ADMIN',
              },
            },
          },
          include: {
            members: {
              select: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatar: true,
                  },
                },
                role: true,
                status: true,
                id: true,
              },
            },
          },
        });
      } else if (groupId) {
        console.log('group info');
        groupInfo = await this.prisma.group.findFirst({
          where: {
            id: groupId,
          },
          include: {
            members: {
              select: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatar: true,
                  },
                },
                role: true, 
                status: true,
                id: true
              },
            },
          },
        });
      }

      const { members, ...other } = groupInfo;
      const filteredMembers = members.map(member => ({ ...member.user, role: member.role, status: member.status, memberId: member.id }));
      const [leader] = filteredMembers.filter(member => member.role === "ADMIN");
      return { members: filteredMembers, leader, ...other };
    } catch (err: any) {
      console.error(err);
    }
  }

  async addGroup(dto: GroupDto): Promise<Group> {
    const res = await this.prisma.group.create({
      data: {
        name: dto.name,
        description: dto.description,
        image: dto.image,
      },
    });
    // console.log(res);
    if (!res) throw new ForbiddenException('group not created???');
    return res;
  }

  async deleteGroup(groupId: string) {
    const res = await this.prisma.group.delete({
      where: {
        id: groupId
      }
    });

    if (!res) throw new ForbiddenException("group not deleted");

    return res;
  }

  async updateGroup(groupId: string, dto: GroupDto) {
    console.log("updating...", dto.name, dto.rating);
    const res = await this.prisma.group.update({
      where: {
        id: groupId
      },
      data: {
        name: dto.name,
        description: dto.description,
        image: dto.image,
        status: dto.status,
        rating: dto.rating
      }
    });

    if (!res) throw new ForbiddenException("group not deleted");

    return res;
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroupDto } from './dto';
import { Group } from '@prisma/client';

@Injectable()
export class GroupService {
    constructor(private prisma: PrismaService) { };
    
    // ! get all the groups
    async getAllGroups() {
        return await this.prisma.group.findMany({ include: { members: true }});
    }

    async getGroupInfo(adminId: string) {
        try {
            const adminGroups = await this.prisma.group.findFirst({
                where: {
                    members: {
                        some: {
                            userId: adminId,
                            role: 'ADMIN',
                        },
                    },
                },
                include: {
                    members: true,
                },
            });

            console.log(adminGroups);
            return adminGroups;
        } catch (err: any) {
            console.error(err);
        }
    }

    async addGroup(dto: GroupDto): Promise<Group> {
        const res = await this.prisma.group.create({
            data: {
                name: dto.name,
                description: dto.description
            }
        });
        console.log(res);
        if (!res) throw new ForbiddenException("group not created???");
        return res;
    }
}

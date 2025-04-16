import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    // todo: get active group
    async getActiveGroupInfo() {
        const activeGroup = await this.prisma.group.findFirst({
            where: {
                status: 'ACTIVE'
            },
            include: {
                members: true
            }
        });

        return activeGroup;
    }

    // TODO: Get total number of members
    async getTotalNumberOfMembers() {
        const dateBefore = new Date();
        dateBefore.setDate(dateBefore.getDate() - 30);
        const total = await this.prisma.groupMember.count();
        const new12members = await this.prisma.groupMember.count({
            where: {
                joinedAt: {
                    gte: dateBefore
                }
            }
        });

        return { total, new12members };
    }

    // TODO: Get new added articles in this month
    async getLatestAddedArticles() {
        const dateBefore = new Date();
        dateBefore.setDate(dateBefore.getDate() - 30);
        const newAddedArticles = await this.prisma.article.findMany({
            where: {
                createdAt: {
                    gte: dateBefore
                }
            }
        });

        return { total: newAddedArticles.length, articles: newAddedArticles };
    }

    
}

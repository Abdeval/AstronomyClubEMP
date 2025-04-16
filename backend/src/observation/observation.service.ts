import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddObservatioDto } from './observation.dto';
import { UpdateArticleDto } from 'src/article/article.dto';

@Injectable()
export class ObservationService {
    constructor(private prisma: PrismaService) { };

    // ! get all observations
    async getAllObservations() {
        return await this.prisma.observation.findMany({
            include: {
                images: true,
                user: true
            }
        });
    }

    // ! add an observation
    async addObservation(dto: AddObservatioDto, files: Express.Multer.File[], userId: string) {
        try {
            // ! test if the user is exist
            const isUser = await this.prisma.user.findUnique({
                where: {
                    id: userId
                }
            });

            if (!isUser) {
                throw new NotFoundException("user not found for this observation");
            }

            const observation = await this.prisma.observation.create({
                data: {
                    ...dto,
                    userId
                }
            });

            // ! add all the images
            const baseUrl = process.env.API_URL || 'http://localhost:3000';

            const urls = files.map(f => (`${baseUrl}/uploads/${f.filename}`));

            urls.forEach(async (url) => {
                const res = await this.prisma.image.create({
                    data: {
                        url,
                        category: "OBSERVATION",
                        observationId: observation.id,
                    }
                });
                console.log("image created...", res);
            });


            return {
                message: "observation created..."
            };

        } catch (err: any) {
            throw new InternalServerErrorException(err.message)
        }
    }

    // ! get observation by id

    async getObservation(obsId: string) {
        return await this.prisma.observation.findUnique({
            where: {
                id: obsId
            },
            include: {
                images: true,
                user: true,
            }
        });
    }

    // ! delete observation
    async deleteObservation(obsId: string) {
        const res = await this.prisma.observation.delete({
            where: {
                id: obsId
            }
        });

        return res;
    };

    // ! update observation
    async updateObservation(obsId: string, dto: UpdateArticleDto, files: Express.Multer.File[]) {
        const res = await this.prisma.observation.findUnique({
            where: {
                id: obsId
            }
        });

        if (!res) throw new NotFoundException("observation not found");
        
        const updateObs = await this.prisma.observation.update({
            where: {
                id: obsId
            },
            data: {
                ...dto
            }
        });

        if (files.length > 0) {
            const baseUrl = process.env.API_URL || 'http://localhost:3000';

            const urls = files.map(f => (`${baseUrl}/uploads/${f.filename}`));

            urls.forEach(async (url) => {
                const res = await this.prisma.image.create({
                    data: {
                        url,
                        category: "OBSERVATION",
                        observationId: updateObs.id,
                    }
                });
                console.log("image created...", res);
            });
        }


        return {
            message: "observation updated..."
        }
    }


}

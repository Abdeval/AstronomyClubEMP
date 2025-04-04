import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto } from './dto';
import { Image } from '@prisma/client';

@Injectable()
export class ImageService {
    constructor(private readonly prisma: PrismaService) { }

    // ! get all images
    async getAllImages() {
        return this.prisma.image.findMany({
            include: {
                group: true,
                event: true,
                user: true,
                observation: true,
            }
        })
    }

    // ! get imgaes by category id and category name
    async getImagesByCategory(categoryName: string, categoryId: string) {

        let images: any;
        switch (categoryName) {
            case "GROUP":
                images = await this.prisma.image.findMany({
                    where: {
                        groupId: categoryId
                    },
                    include: {
                        group: true
                    }
                })
            case "EVENT":
                images = await this.prisma.image.findMany({
                    where: {
                        eventId: categoryId
                    },
                    include: {
                        event: true
                    }
                })
            case "OBSERVATION":
                images = await this.prisma.image.findMany({
                    where: {
                        observationId: categoryId
                    },
                    include: {
                        observation: true
                    }
                })
            default:
                images = await this.prisma.image.findMany({
                    where: {
                        category: "OTHER"
                    }
                })
        }

        if (!images) throw new ForbiddenException("No images found");
        console.log(images);
        return images;
    }

    // ! get image by id
    async getImageById(imageId: string) {
        return this.prisma.image.findUnique({
            where: {
                id: imageId
            }
        })
    }
    
    // ! add an image

    async addImage(createImageDto: CreateImageDto, file: Express.Multer.File, userId?: string): Promise<Image> {
        const baseUrl = process.env.API_URL || 'http://localhost:3000';
        const fileUrl = `${baseUrl}/uploads/${file.filename}`;

        const newImage = this.prisma.image.create({
            data: {
                url: fileUrl,
                title: createImageDto.title,
                category: createImageDto.category,
                userId: userId as string,
                groupId: createImageDto.groupId,
                observationId: createImageDto.observationId,
                eventId: createImageDto.eventId,
            }
        })
        
        return newImage;

    }

    // ! delete an image 
    async deleteImage(imageId: string) {
        const res = await this.prisma.image.delete({
            where: {
                id: imageId
            }
        });

        if (!res) throw new ForbiddenException("image not deleted...");

        return res;
    }
}

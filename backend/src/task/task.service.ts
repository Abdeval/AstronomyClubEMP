import { ForbiddenException, Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    // ! create
    async addTask(dto: CreateTaskDto) {
        try {
            if (dto.assignedToId) {
                const userExists = await this.prisma.user.findUnique({
                    where: { id: dto.assignedToId }
                });

                if (!userExists) {
                    throw new NotFoundException(`User with ID ${dto.assignedToId} not found`);
                }
            }

            return await this.prisma.task.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    status: dto.status,
                    assignedToId: dto.assignedToId
                }
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException('A task with this title already exists');
                }
                if (error.code === 'P2003') {
                    throw new BadRequestException('Foreign key constraint failed on assignedToId');
                }
            }

            console.error('Error creating task:', error);
            throw new InternalServerErrorException('Failed to create task');
        }
    }

    // ! delete
    async deleteTask(taskId: string) {
        try {
            const taskExists = await this.prisma.task.findUnique({
                where: { id: taskId }
            });

            if (!taskExists) {
                throw new NotFoundException(`Task with ID ${taskId} not found`);
            }

            return await this.prisma.task.delete({
                where: { id: taskId }
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException(`Task with ID ${taskId} not found`);
                }
            }

            console.error('Error deleting task:', error);
            throw new InternalServerErrorException('Failed to delete task');
        }
    }

    // ! update
    async updateTask(taskId: string, dto: UpdateTaskDto) {
        try {
            const taskExists = await this.prisma.task.findUnique({
                where: { id: taskId }
            });

            if (!taskExists) {
                throw new NotFoundException(`Task with ID ${taskId} not found`);
            }

            if (dto.assignedToId) {
                const userExists = await this.prisma.user.findUnique({
                    where: { id: dto.assignedToId }
                });

                if (!userExists) {
                    throw new NotFoundException(`User with ID ${dto.assignedToId} not found`);
                }
            }

            return await this.prisma.task.update({
                where: { id: taskId },
                data: { ...dto }
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            if (error instanceof Prisma.PrismaClientKnownRequestError) {

                if (error.code === 'P2025') {
                    throw new NotFoundException(`Task with ID ${taskId} not found`);
                }
                if (error.code === 'P2003') {
                    throw new BadRequestException('Foreign key constraint failed on assignedToId');
                }
            }

            console.error('Error updating task:', error);
            throw new InternalServerErrorException('Failed to update task');
        }
    }

    // ! get by id
    async getTaskById(taskId: string) {
        try {
            const task = await this.prisma.task.findUnique({
                where: { id: taskId },
                include: {
                    assignedTo: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true,
                            avatar: true
                        }
                    }
                }
            });

            if (!task) {
                throw new NotFoundException(`Task with ID ${taskId} not found`);
            }

            return task;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            console.error('Error fetching task:', error);
            throw new InternalServerErrorException('Failed to fetch task');
        }
    }

    // ! get all
    async getAllTasks() {
        try {
            return await this.prisma.task.findMany({
                include: {
                    assignedTo: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            role: true,
                            avatar: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw new InternalServerErrorException('Failed to fetch tasks');
        }
    }
}
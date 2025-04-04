import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {};

    // ! create 
    @Post('create')
    addTask(@Body() dto: CreateTaskDto) {
        this.taskService.addTask(dto);
    }

    // ! delete
    @Delete('delete/:id')
    deleteTask(@Param('id') taskId: string) {
        this.taskService.deleteTask(taskId);
    }

    // ! update
    @Patch('update/:id')
    updateTask(@Param('id') taskId: string, @Body() dto: UpdateTaskDto) {
        this.taskService.updateTask(taskId, dto);
    }

    // ! get by id
    @Get(':id')
    getTaskById(@Param('id') taskId: string) {
        return this.taskService.getTaskById(taskId);
    }

    // ! get all
    @Get()
    getAllTasks() {
        return this.taskService.getAllTasks();
    }
}

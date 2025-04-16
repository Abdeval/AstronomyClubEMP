import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddObservatioDto, UpdateObservationDto } from './observation.dto';
import { ObservationService } from './observation.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';
import { JwtGuard } from 'src/auth/auth.guard';
import { User, UserDecorator } from 'src/user/user.decorator';

@UseGuards(JwtGuard)
@Controller('observations')
export class ObservationController {
    constructor(private observationService: ObservationService) { };

    // ! get all observations
    @Get()
    getAllObservations() {
        return this.observationService.getAllObservations()
    }

    // ! add an observation
    @Post('create')
    @UseInterceptors(FilesInterceptor('files', 10, storageConfig)) // ! limit to 10 files max
    addObservation(
        @Body() dto: AddObservatioDto,
        @UploadedFiles() files: Express.Multer.File[],
        @User('id') userId: string
    ) {
        return this.observationService.addObservation(dto, files, userId);
    }

    // ! get observation by id
    @Get(":id")
    getObservation(@Param("id") obsId: string) {
        return this.observationService.getObservation(obsId);
    }

    // ! delete observation by id
    @Delete("delete/:id")
    deleteObservation(@Param("id") obsId: string) {
        return this.observationService.deleteObservation(obsId);
    }

    @Patch("update/:id")
    @UseInterceptors(FilesInterceptor('files', 10, storageConfig)) // ! limit to 10 files max
    updateObservation(
        @Param('id') obsId: string, 
        @Body() dto: UpdateObservationDto, 
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.observationService.updateObservation(obsId, dto, files);
    }
} 

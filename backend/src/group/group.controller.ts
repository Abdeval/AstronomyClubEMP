import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupDto } from './dto';

@Controller('groups')
export class GroupController {
    constructor(private groupService: GroupService) {}
    
 
    @Get('all')
    getAllGroups() {
        return this.groupService.getAllGroups();
    }


    @Get("admin/:id")
    getGroupInfo(@Param("id") adminId: string) {
        return this.groupService.getGroupInfo(adminId);
    }


    @Post("create")
    addGroup(@Body() dto: GroupDto) {
        return this.groupService.addGroup(dto);
    }
}

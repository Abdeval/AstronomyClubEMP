import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupDto } from './dto';

@Controller('groups')
export class GroupController {
    constructor(private groupService: GroupService) {}
    
    // ! get all groups
    @Get('all')
    getAllGroups() {
        return this.groupService.getAllGroups();
    }

    // ! by the Admin id
    @Get("admin/:id")
    getGroupInfo(@Param("id") adminId: string) {
        return this.groupService.getGroupInfo(adminId);
    }

    // ! create a group
    @Post("create")
    addGroup(@Body() dto: GroupDto) {
        return this.groupService.addGroup(dto);
    }
}

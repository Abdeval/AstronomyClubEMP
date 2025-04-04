import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupDto } from './dto';

@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get('all')
  getAllGroups() {
    return this.groupService.getAllGroups();
  }

  @Get('admin/:id')
  getGroupInfo(@Param('id') adminId: string) {
    return this.groupService.getGroupInfo({ adminId });
  }

  @Get(':id')
  getGroupById(@Param('id') groupId: string) {
    return this.groupService.getGroupInfo({ groupId });
  }

  @Post('create')
  addGroup(@Body() dto: GroupDto) {
    return this.groupService.addGroup(dto);
  }

  @Delete('delete/:id')
  deleteGroup(@Param('id') groupId: string) {
    return this.groupService.deleteGroup(groupId);
  }

  @Patch('update/:id')
  updateGroup(@Param('id') groupId: string, @Body() dto: GroupDto) {
    return this.groupService.updateGroup(groupId, dto);
  }
}

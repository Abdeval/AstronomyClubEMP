import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { JwtGuard } from 'src/auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('create')
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  getAllMembers() {
    return this.memberService.getAllMembers();
  }

  @Get(':id')
  getMemberById(@Param('id') memberId: string) {
    return this.memberService.getMemberById(memberId);
  }

  @Patch(':id')
  updateMember(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.updateMember(id, updateMemberDto);
  }

  // ! delete a member by id
  @Delete('delete/:id')
  deleteMember(@Param('id') memberId: string) {
    return this.memberService.deleteMember(memberId);
  }
}

import { GroupRole } from '@prisma/client';

export class CreateMemberDto {
  userId: string;
  groupId: string;
  role: GroupRole;
}

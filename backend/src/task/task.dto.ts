/* model Task {
  id           String     @id @default(uuid())
  title        String
  description  String?
  assignedToId String
  assignedTo   User       @relation(fields: [assignedToId], references: [id], onDelete: Cascade)
  status       TaskStatus @default(PENDING)
  createdAt    DateTime   @default(now())

  @@map("tasks")
}
*/

import { IsEnum, IsOptional, IsString } from 'class-validator';
enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class CreateTaskDto {
  @IsString()
  title: String;

  @IsString()
  @IsOptional()
  description: String;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}

import { PartialType } from "@nestjs/mapped-types";
import { SignUpDto } from "src/auth/auth.dto";


export class UpdateUserDto extends PartialType(SignUpDto) {};
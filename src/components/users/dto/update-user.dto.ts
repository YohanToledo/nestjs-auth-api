import { Matches, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { RegExHelper } from 'src/helper/regex.helper';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsNotEmpty()
  email: string;
}

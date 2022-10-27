import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Matches, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { RegExHelper } from 'src/helper/regex.helper';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  email: string;
}

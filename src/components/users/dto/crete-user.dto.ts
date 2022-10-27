import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from 'src/helper/messages.helper';
import { RegExHelper } from 'src/helper/regex.helper';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'Min 8 chars',
  })
  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
}

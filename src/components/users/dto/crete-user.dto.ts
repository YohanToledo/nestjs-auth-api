import { Matches, IsEmail, IsNotEmpty } from 'class-validator';
import { MessagesHelper } from 'src/helper/messages.helper';
import { RegExHelper } from 'src/helper/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
}

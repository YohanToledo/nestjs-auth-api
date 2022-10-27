import { ApiProperty } from '@nestjs/swagger';

class LoginExampleReq {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

class JwtExampleRes {
  @ApiProperty()
  token: string;
}

class UserCreatedRes {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  email: string;
}

export const ResponseAndReturnTypes = {
  LoginExampleReq,
  JwtExampleRes,
  UserCreatedRes,
};

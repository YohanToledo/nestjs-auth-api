import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/components/users/entities/users.entity';
import { UsersService } from 'src/components/users/users.service';
import { compareSync } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.usersService.findOneOrFail({
        where: { email: email },
      });
    } catch (err) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) return null;

    return user;
  }
}

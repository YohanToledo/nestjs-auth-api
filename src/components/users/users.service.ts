import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/crete-user.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: [
        'id',
        'fullName',
        'email',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    });
  }
  async findOneOrFail(options: FindOneOptions<UsersEntity>) {
    try {
      return await this.usersRepository.findOneOrFail(options);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async save(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user).catch(() => {
      throw new BadRequestException('Account with this email already exists.');
    });
  }

  async update(id: number, data) {
    const user = await this.findOneOrFail({ where: { id: id } });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id: id } });
    this.usersRepository.softDelete({ id });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateEvent } from 'typeorm';
import { CreateUserDto } from './dto/crete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOneOrFail({ where: { id: id } });
  }

  @Post()
  async save(@Body() body: CreateUserDto) {
    return this.usersService.save(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    await this.usersService.delete(id);
  }
}

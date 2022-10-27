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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseAndReturnTypes } from 'src/helper/swagger.helper';
import { CreateUserDto } from './dto/crete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'jwt bearer token',
  })
  @ApiOperation({ summary: 'Find All Users' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find User by ID' })
  @ApiHeader({
    name: 'Authorization',
    description: 'jwt bearer token',
  })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id: number) {
    return await this.usersService.findOneOrFail({ where: { id: id } });
  }

  @Post()
  @ApiOperation({ summary: 'Register User' })
  @ApiCreatedResponse({ type: ResponseAndReturnTypes.UserCreatedRes })
  async save(@Body() body: CreateUserDto) {
    return this.usersService.save(body);
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiHeader({
    name: 'Authorization',
    description: 'jwt bearer token',
  })
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiHeader({
    name: 'Authorization',
    description: 'jwt bearer token',
  })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    await this.usersService.delete(id);
  }
}

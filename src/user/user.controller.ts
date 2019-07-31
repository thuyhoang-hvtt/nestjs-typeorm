import { Controller, Post, Body, BadRequestException, InternalServerErrorException, Get, Logger, Put, Param, NotFoundException, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiBadRequestResponse, ApiOperation, ApiUseTags, ApiInternalServerErrorResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './user.entity';
import { ApiException } from '../shared/shared.api-exception';
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from './dto/index';
import { LoginResponseVM } from './vms/index';
import { UpdateResult } from 'typeorm';
import { Roles } from 'src/shared/shared.decorators';
import { UserRole } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/shared/shared.guard';

@Controller('user')
@ApiUseTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly _userService: UserService,
  ) {}

  @Post('register')
  @ApiOkResponse({ type: User })
  @ApiInternalServerErrorResponse({ type: ApiException })
  @ApiOperation({ title: 'User', operationId: 'Register' })
  async register(@Body() dto: CreateUserDTO): Promise<User> {
    const { username, password } = dto;

    if (!username) {
      throw new BadRequestException('Username is required');
    }

    if (!password) {
      throw new BadRequestException('Password is required');
    }

    let exist;

    try {
      exist = await this._userService.findByUsername(username);
    }
    catch(e) {
      throw new InternalServerErrorException(e);
    }

    if (exist) {
      throw new BadRequestException(`${username} is already token`);
    } 

    return this._userService.createUser(dto);
  }


  @Post('login')
  @ApiCreatedResponse({ type: User })
  @ApiInternalServerErrorResponse({ type: ApiException })
  @ApiOperation({ title: 'User', operationId: 'Login' })
  async login(@Body() dto: LoginUserDTO): Promise<LoginResponseVM> {
    const { username, password } = dto;

    if (!username) {
      throw new BadRequestException('username is required');
    }

    if (!password) {
      throw new BadRequestException('password is required');
    }

    return this._userService.login(dto);
  }

  @Get()
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: User, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation({ title: 'User', operationId: 'findAll' })
  async findAll(): Promise<User[]> {
    return this._userService.findAll();
  }

  @Put(':id')
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: User })
  @ApiInternalServerErrorResponse({ type: ApiException })
  @ApiOperation({ title: 'User', operationId: 'update' })
  async update(@Param('id') id: string, @Body() dto: UpdateUserDTO): Promise<User> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    let exist: User;
    try {
      exist = await this._userService.findById(id);
    }
    catch(e) {
      throw new InternalServerErrorException(e);
    }

    if (!exist) {
      throw new NotFoundException(`${id} Not Found`);
    }

    return this._userService.updateUser(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: User })
  @ApiInternalServerErrorResponse({ type: ApiException })
  @ApiOperation({ title: 'User', operationId: 'delete' })
  async delete(@Param('id') id: string): Promise<User> {
    if (!id) {
      throw new BadRequestException('id is required');
    }

    let exist: User;
    try {
      exist = await this._userService.findById(id);
    }
    catch(e) {
      throw new InternalServerErrorException(e);
    }

    if (!exist) {
      throw new NotFoundException(`${id} Not Found`);
    }

    return this._userService.deleteUser(id);
  }

}

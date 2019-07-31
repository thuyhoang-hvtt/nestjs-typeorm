import {
  Injectable,
  Inject,
  forwardRef,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { AuthService } from '../shared/auth/auth.service';
import { UpdateUserDTO } from 'src/user/dto';
import { CreateUserDTO, LoginUserDTO } from './dto/index';
import { genSalt, hash, compare } from 'bcryptjs';
import { LoginResponseVM } from './vms/index';
import { JwtPayload } from '../shared/auth/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    readonly _authService: AuthService,
  ) {}

  async findAll(): Promise<User[]> {
    return this._userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this._userRepository.findOne({ id });
  }

  async findByUsername(username: string): Promise<User> {
    return this._userRepository.findOne({ username });
  }

  async findAndCount(): Promise<[User[], number]> {
    return this._userRepository.findAndCount();
  }

  async updateUser(id: string, update: UpdateUserDTO): Promise<User> {
    const { password } = update;

    if (password) {
      const salt = await genSalt(10);
      update.password = await hash(password, salt);
    }

    await this._userRepository.update({ id }, update);

    return this.findById(id);
  }

  async deleteUser(id: string): Promise<User> {
    const deleted = await this.findById(id);
    return this._userRepository.remove(deleted);
  }

  async createUser(user: CreateUserDTO): Promise<User> {
    const { username, password, firstName, lastName } = user;

    const newUser = new User();

    newUser.username = username;
    newUser.firstName = firstName;
    newUser.lastName = lastName;

    const salt = await genSalt(10);
    newUser.password = await hash(password, salt);


    try {
      const result = await this._userRepository.save(newUser);
      return result;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async login(dto: LoginUserDTO): Promise<LoginResponseVM> {
    const { username, password } = dto;

    const user = await this.findByUsername(username);
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isMatch = compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload: JwtPayload = {
      username: user.username,
      role: user.role
    }

    const token = await this._authService.signPayload(payload);

    return {
      token,
      user
    }
  }
}

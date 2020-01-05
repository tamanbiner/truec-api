import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async getUserEntityById(uid: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(uid);
    return user;
  }

  public async createUser(
    dto: CreateUserDto,
    passwordHash: string
  ): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.email = dto.email.toLowerCase();
    newUser.passwordHash = passwordHash;
    newUser.fullName = dto.fullName;

    try {
      await this.userRepository.insert(newUser);
      return newUser;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }
}

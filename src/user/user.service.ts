import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserRO } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(dto: CreateUserDto): Promise<UserRO> {
    const { fullName, email, password } = dto;
    const qb = getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.email = :email', { email });
    const userExists = await qb.getOne();

    if (userExists) {
      const errors = { email: 'Email has already been taken!' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST
      );
    }

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.password = password;
    newUser.fullName = fullName;

    const savedUser = await this.userRepository.save(newUser);

    return this.buildUserRO(savedUser);
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      email: user.email,
      fullName: user.fullName,
    };

    return { user: userRO };
  }
}

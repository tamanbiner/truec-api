import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { JwtPayload } from './interfaces/jwtPayload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async register(userDto: CreateUserDto) {
    const user = await this.userService.createUser(
      userDto,
      await bcrypt.hash(userDto.password, 10)
    );

    const payload: JwtPayload = {
      uid: user.uid,
      email: user.email,
    };

    return {
      ...payload,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserEntity> {
    const userEntity = await this.userService.getUserEntityById(payload.uid);

    if (userEntity !== undefined && userEntity.email === payload.email) {
      return userEntity;
    }

    throw new UnauthorizedException();
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { JwtPayload } from './interfaces/jwtPayload.interfaces';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(userDto: CreateUserDto) {
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

  async login(loginRequest: LoginDto) {
    const user = await this.userService.getUserByEmail(loginRequest.email);

    const payload: JwtPayload = {
      uid: user.uid,
      email: user.email,
    };

    return {
      ...payload,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(email);

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (user && isValid) {
      const { passwordHash, ...userResult } = user;
      return userResult;
    }

    throw new UnauthorizedException();
  }
}

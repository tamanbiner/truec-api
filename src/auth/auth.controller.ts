import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() userData: LoginDto) {
    return this.authService.login(req.user);
  }
}

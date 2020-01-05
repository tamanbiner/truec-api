// import { Controller, Post, Body, UsePipes } from '@nestjs/common';
// import { ValidationPipe } from '../shared/pipes/validation.pipe';
// import { UserService } from './user.service';
// import { CreateUserDto } from './dto/createUser.dto';

// @Controller()
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @UsePipes(new ValidationPipe())
//   @Post('users')
//   async create(@Body() userData: CreateUserDto) {
//     return this.userService.create(userData);
//   }
// }

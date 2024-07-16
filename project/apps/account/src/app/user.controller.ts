import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UsersService } from '@project/users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.register(dto);

    return user.toPOJO();
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.usersService.verifyUser(dto);

    return user.toPOJO();
  }

  @Get(':id')
  public async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);

    return user.toPOJO();
  }
}

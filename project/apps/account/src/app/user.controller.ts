import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UsersService } from '@project/users';
import { ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { UserRdo } from '../../../../libs/users/src/rdo/user.rdo';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.register(dto);

    return fillDto(UserRdo, user.toPOJO());
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const user = await this.usersService.verifyUser(dto);

    return fillDto(UserRdo, user.toPOJO());
  }

  @Get(':id')
  public async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);

    return fillDto(UserRdo, user.toPOJO());
  }
}

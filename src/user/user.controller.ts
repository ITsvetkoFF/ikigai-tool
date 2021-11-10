import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller(('users'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  async postUser() {
    const user = await this.userService.create({});
    return user.id;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }
}

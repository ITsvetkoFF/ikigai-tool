import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from "../database/models/user.model";

@Controller(('users'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async postUser() {
    const user = await this.userService.create({log: [], pillars: {}});
    return user.id;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Patch(':id')
  async putOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: Partial<UserModel>) {
    let user;
    if (body.log)  {
      user = await this.userService.addEvents(id, body.log);
    }
    if (body.pillars)  {
      user = await this.userService.changePillars(id, body.pillars);
    }
    return user;
  }
}

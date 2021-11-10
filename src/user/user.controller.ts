import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLogEvent } from "./types";

@Controller(('users'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async postUser() {
    const user = await this.userService.create({});
    return user.id;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Put(':id')
  async putOne(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UserLogEvent[]) {
    const user = await this.userService.addEvents(id, body);
    return user;
  }
}

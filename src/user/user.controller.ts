import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users/new')
  async getHello() {
    const user = await this.userService.create({});
    return user.id;
  }
}

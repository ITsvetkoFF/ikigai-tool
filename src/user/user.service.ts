import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from "../database/models/user.model";
import { ModelClass } from 'objection';

@Injectable()
export class UserService {

  constructor(
      @Inject('UserModel') private modelClass: ModelClass<UserModel>
  ) {}

  create(props: Partial<UserModel>) {
    return this.modelClass
        .query()
        .insert(props)
        .returning('*');
  }
}

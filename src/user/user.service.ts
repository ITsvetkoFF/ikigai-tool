import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from "../database/models/user.model";
import { ModelClass, raw } from 'objection';
import { UserLogEvent } from "./types";

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

  findOne(id: string) {
    return this.modelClass.query().findById(id)
  }

  addEvents(id: string, events: UserLogEvent[]) {
    // syntax of raw query https://vincit.github.io/objection.js/recipes/raw-queries.html#examples
    // this allows to append to json field
    return this.modelClass.query().findById(id).patch({log: raw(`log || '${JSON.stringify(events)}'::jsonb`)})
  }
}

import { BaseModel } from './base.model';
import { UserLogEvent } from "../../user/types";

export class UserModel extends BaseModel {
  static tableName = 'users';

  name: string;

  log: UserLogEvent[]

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['log'],

      properties: {
        id: { type: 'string' },
        // Properties defined as objects or arrays are
        // automatically converted to JSON strings when
        // writing to database and back to objects and arrays
        // when reading from database. To override this
        // behaviour, you can override the
        // Model.jsonAttributes property.
        log: {
          type: 'array',
          properties: {
            pillar: { type: 'string' },
            action: { type: 'string' },
            actionData: { type: 'string'},
            timestamp: { type: 'number' }
          },
          required: ['pillar', 'action', 'timestamp']
        }
      }
    };
  }

}
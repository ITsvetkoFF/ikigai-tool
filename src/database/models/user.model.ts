import { BaseModel } from './base.model';
import { Pillar, PillarContents, UserLogEvent } from "../../user/types";

export class UserModel extends BaseModel {
  static tableName = 'users';

  name: string;

  log: UserLogEvent[];

  pillars: Partial<PillarContents>;

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
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
          required: ['pillar', 'action', 'timestamp'], // TODO: understand why this does not work
          additionalProperties: false
        },
        pillars: {
          type: 'object',
          properties: {
            [Pillar.LOVE]: {type: 'string'},
            [Pillar.PAID_FOR]: {type: 'string'},
            [Pillar.GOOD_AT]: {type: 'string'},
            [Pillar.WORLD_NEEDS]: {type: 'string'},
          },
          additionalProperties: false // TODO: understand why this does not work
        }
      }
    };
  }

}
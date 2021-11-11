export enum Pillar {
  LOVE = "LOVE",
  GOOD_AT = "GOOD_AT",
  WORLD_NEEDS = "WORLD_NEEDS",
  PAID_FOR = "PAID_FOR"
}

export interface UserLogEvent {
  pillar: Pillar;
  action: 'type' | 'del' | 'backspace' | 'alter';
  actionData?: string;
  timestamp: number;
}

export type PillarContents = Record<keyof typeof Pillar, string>
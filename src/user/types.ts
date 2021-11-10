export enum pillar {
  LOVE = "LOVE",
  GOOD_AT = "GOOD_AT",
  WORLD_NEEDS = "WORLD_NEEDS",
  PAID_FOR = "PAID_FOR"
}

export interface UserLogEvent {
  pillar: pillar;
  action: 'type' | 'del' | 'backspace' | 'alter';
  actionData?: string;
  timestamp: number;
}
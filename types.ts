
export enum TabType {
  HCN_NOT = 'HCN_NOT',
  FOLLOW_UP = 'FOLLOW_UP',
  HCN_CONFIRMED = 'HCN_CONFIRMED',
  TRIP_BOOKING = 'TRIP_BOOKING'
}

export interface GenerationResult {
  reply: string;
  followUp: string;
  mode: 'text' | 'table';
  tripData?: string[];
}

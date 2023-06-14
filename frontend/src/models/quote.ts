import { UserType } from './auth';

export type QuoteType = {
  id: string;
  quote: string;
  votes: number;
  user: UserType;
};

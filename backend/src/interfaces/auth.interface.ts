import { User } from 'entities/user.entity';
import { Request } from 'express';

export interface TokenPayload {
  name: string;
  sub: string;
  type: JwtType;
}

export interface RequestUser extends Request {
  user: User;
}

export enum JwtType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum CookieType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

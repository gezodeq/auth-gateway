// types.ts

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
}

export interface AuthToken {
  token: string;
  expiresAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: AuthToken;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  token: AuthToken;
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface ErrorResponse {
  code: number;
  message: string;
}
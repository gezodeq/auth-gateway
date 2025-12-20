// types.ts
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'moderator' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface Token {
  token: string;
  expiresAt: Date;
}

export interface AuthResponse {
  user: User;
  token: Token;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
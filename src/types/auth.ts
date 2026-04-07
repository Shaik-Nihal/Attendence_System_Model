export type Role = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  username: string;
  role: Role;
  name: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
  token: string;
}
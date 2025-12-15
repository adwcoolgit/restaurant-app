export type LoginResponse = {
  token: string;
  user: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
};

export type RegisterResponse = {
  token: string;
  user: User;
};

export const loginUserSKey = () => 'user';
export const loginTokenSKey = () => 'token';
export const isLoginSKey = () => 'isLogin';
export const isRememberMeSKey = () => 'isRememberMe';

export const getUserQKey = () => ['user'];
export const getProfileQKey = () => ['profile'];

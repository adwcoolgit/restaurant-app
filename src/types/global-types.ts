import { User } from '@/features/auth/type';

export type BaseEntity = {
  id: string;
  createdAt: string;
};

export type BasePatchEntity = {
  id: string;
  updateAt: string;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type PatchEntity<T> = {
  [K in keyof T]: T[K];
} & BasePatchEntity;

export type InfiniteEntity<T> = {
  [K in keyof T]: T[K];
} & Pagination;

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Likes = {
  liked: boolean;
  likeCount: number;
};

export type ServiceProps = {
  page: number;
  limit: number;
};

export type ApiResponse<T> = {
  success: string;
  data: T;
};

export const initUser: User = {
  id: 0,
  name: '',
  phone: '',
  email: '',
  avatar: '',
};

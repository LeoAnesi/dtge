import useAsyncFn, { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import httpClient from 'services/networking/client';

export const useCreateUser = (): AsyncFnReturn<(user: CreateUserDto) => Promise<UserDto>> => {
  return useAsyncFn(async user => {
    const { data } = await httpClient.post<UserDto>('users', { ...user }, false);

    return data;
  });
};

export interface UserDto {
  id: string;
  name: string;
  email: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
  association: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  inscriptionToken: string;
}

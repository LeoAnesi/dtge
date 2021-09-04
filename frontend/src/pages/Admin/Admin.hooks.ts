import { useAsync } from 'react-use';
import useAsyncFn, { AsyncFnReturn, AsyncState } from 'react-use/lib/useAsyncFn';
import httpClient from 'services/networking/client';

export const useGetUser = (): AsyncFnReturn<() => Promise<UserDto[]>> => {
  return useAsyncFn(async () => {
    const { data } = await httpClient.get<UserDto[]>('users', true);

    return data;
  });
};

export const useAssociations = (): AsyncState<string[]> => {
  return useAsync(async () => {
    const { data } = await httpClient.get<string[]>('associations', true);

    return data;
  });
};

export const useCreateUser = (): AsyncFnReturn<(user: CreateUserDto) => Promise<UserDto>> => {
  return useAsyncFn(async user => {
    const { data } = await httpClient.post<UserDto>('users', { ...user, roles: [] }, true);

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
  association: string;
}

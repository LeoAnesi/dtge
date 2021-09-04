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

export const useGenerateInscriptionLink = (): AsyncFnReturn<(
  association: string,
) => Promise<string>> => {
  return useAsyncFn(async association => {
    const { data } = await httpClient.post<string>(
      'users/generate-inscription-link',
      { association },
      true,
    );

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

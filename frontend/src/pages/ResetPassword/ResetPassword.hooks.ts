import useAsyncFn, { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import httpClient from 'services/networking/client';

export const useResetPassword = (): AsyncFnReturn<(
  resetPasswordDto: ResetPasswordDto,
) => Promise<UserDto>> => {
  return useAsyncFn(async resetPasswordDto => {
    const { data } = await httpClient.post<UserDto>(
      'users/reset-password',
      { ...resetPasswordDto },
      false,
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

export interface ResetPasswordDto {
  password: string;
  resetPasswordToken: string;
}

import * as React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useAsyncFn, { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import httpClient from 'services/networking/client';
import Button from 'components/Button';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

export const useGenerateResetPasswordLink = (): AsyncFnReturn<(
  userId: string,
) => Promise<string>> => {
  return useAsyncFn(async userId => {
    const { data } = await httpClient.post<string>(
      'users/generate-reset-password-link',
      { userId },
      true,
    );

    return data;
  });
};

export const useColumns = (): GridColDef[] => {
  const [_, doGenerateResetPasswordLink] = useGenerateResetPasswordLink();
  const onClick = async (userId: string) => {
    const resetPasswordLink = await doGenerateResetPasswordLink(userId);
    navigator.clipboard.writeText(resetPasswordLink);
    toast.success('Reset password link copied to clipboard');
  };

  const columns: GridColDef[] = [
    {
      field: 'email',
      headerName: 'Mail',
      width: 300,
      editable: false,
    },
    {
      field: 'roles',
      headerName: 'Roles',
      width: 200,
      editable: false,
    },
    {
      field: 'association',
      headerName: 'Association',
      type: 'string',
      width: 500,
      editable: false,
    },
    {
      field: 'resetPassword',
      headerName: 'Reset Password',
      width: 200,
      sortable: false,
      renderCell: function ResetPasswordButton(params: GridRenderCellParams) {
        return (
          <Button onClick={() => onClick(params.row.id)}>
            <FormattedMessage id="admin.generateResetPasswordLink" />
          </Button>
        );
      },
    },
  ];

  return columns;
};

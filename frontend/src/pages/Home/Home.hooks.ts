import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import httpClient from 'services/networking/client';

export const useDTGEMembers = (): AsyncState<MemberDto[]> => {
  return useAsync(async () => {
    const { data } = await httpClient.get<MemberDto[]>('members', true);

    return data;
  });
};

export interface MemberDto {
  id: string;
  membershipDate: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  association: string;
  lycee: string;
  universityName: string;
  classePrepa: string;
  activityField: string;
  cursus: string;
  amount: string;
}

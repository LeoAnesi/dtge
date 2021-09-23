import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import httpClient from 'services/networking/client';

export const useDTGEMembers = (): AsyncState<MemberDto[]> => {
  return useAsync(async () => {
    const { data } = await httpClient.get<MemberDto[]>('members', true);

    return data;
  });
};

export enum MembershipType {
  DONATION = 'Dons',
  MEMBERSHIP = 'Adhésion',
}

export interface MemberDto {
  id: string;
  membershipDate: string;
  firstName: string;
  lastName: string;
  sex: string;
  amount: string;
  name: string;
  type: MembershipType;
  phoneNumber: string;
  email: string;
  association: string;
  firstMembership: string;
  address: string;
  zipCode: string;
  birthDate: string;
  originCity: string;
  lycee: string;
  universityName: string;
  classePrepa: string;
  activityField: string;
  schoolAndTeachingSubject: string;
  cursus: string;
  foreignInternship: string;
  career: string;
  associationEncounter: string;
  engagement: string;
}

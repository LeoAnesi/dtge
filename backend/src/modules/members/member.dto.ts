export enum MembershipType {
  DONATION = 'Dons',
  MEMBERSHIP = 'Adhésion',
}

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
  type: MembershipType;
}

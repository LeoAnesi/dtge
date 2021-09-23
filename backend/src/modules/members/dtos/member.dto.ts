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
  type: MembershipType;
  name: string;
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

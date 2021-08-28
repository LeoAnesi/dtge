export enum HelloAssoQuestions {
  PHONE = 'Numéro de téléphone',
  EMAIL = 'Email',
  ADDRESS = 'Adresse',
  ZIP_CODE = 'Code Postal',
  BIRTH_DATE = 'Date de naissance',
  CITY = "Ville/village d'origine",
  FIRST_MEMBERSHIP = "S'agit-il de ta première adhésion ? ",
  SEX = 'Sexe',
  ASSOCIATION = 'À quelle association souhaites-tu adhérer ? ',
  LYCEE = "Quel est ton lycée d'origine ?",
  UNIVERSITY_NAME = 'Peux-tu préciser le nom de ton École / prépa / Université ? ',
  CLASSE_PREPA = 'Es-tu passé par une classe préparatoire (si oui, laquelle) ? ',
  ACTIVITY_FIELD = "Quel est ton domaine d'activité ? ",
  CURSUS = 'Quel cursus sélectif as-tu intégré ? ',
}

export type HelloAssoCustomField = {
  name: HelloAssoQuestions;
  type: 'TextInput' | 'Date' | 'YesNo' | 'ChoiceList';
  answer: string;
};

export interface HelloAssoMembershipEntity {
  order: {
    id: number;
    date: string;
    formSlug: string;
    formType: 'Membership';
    organizationSlug: 'des-territoires-aux-grandes-ecoles';
  };
  payer: {
    email: string;
    country: string;
    firstName: string;
    lastName: string;
  };
  payments: {
    cashOutState: string;
    shareAmount: number;
    id: number;
    amount: number;
    date: string;
    paymentMeans: string;
    state: string;
  }[];
  name:
    | 'Jeunes diplômés'
    | 'Cadres / Entrepreneurs / Actifs / Autres'
    | 'Dons libres'
    | 'Étudiants';
  user: {
    firstName: string;
    lastName: string;
  };
  priceCategory: 'Fixed' | 'Pwyw';
  customFields: HelloAssoCustomField[];
  id: number;
  amount: number;
  type: 'Membership';
  initialAmount: number;
  state: 'Processed';
}

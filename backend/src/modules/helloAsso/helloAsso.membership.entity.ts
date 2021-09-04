export const HelloAssoQuestions = {
  PHONE: ['Numéro de téléphone'],
  EMAIL: ['Email'],
  ADDRESS: ['Adresse'],
  ZIP_CODE: ['Code Postal'],
  BIRTH_DATE: ['Date de naissance'],
  CITY: ["Ville/village d'origine", "Ville/Village d'origine"],
  FIRST_MEMBERSHIP: ["S'agit-il de ta première adhésion ? "],
  SEX: ['Sexe'],
  ASSOCIATION: [
    'À quelle association souhaites-tu adhérer ? ',
    'À quelle association souhaites-tu adhérer ?',
    'À quelle association souhaites-tu faire un don (soumis à la défiscalisation) ? ',
    'À quelle association souhaites-tu faire un don ? ',
    'A quelle association souhaites-tu adhérer/faire un don ?',
  ],
  LYCEE: ["Quel est ton lycée d'origine ?"],
  UNIVERSITY_NAME: [
    'Peux-tu préciser le nom de ton École / prépa / Université ? ',
    'Peux-tu préciser le nom de ton école/prépa/faculté ?',
    'Es-tu passé par une classe préparatoire ? (Si oui, laquelle dans quel lycée)',
  ],
  CLASSE_PREPA: [
    'Es-tu passé par une classe préparatoire (si oui, laquelle) ? ',
    'Es tu passé par une classe préparatoire (section + nom) ?',
  ],
  ACTIVITY_FIELD: [
    "Quel est ton domaine d'activité ? ",
    "Quel est ton domaine d'activité et ta fonction ?",
  ],
  CURSUS: [
    'Quel cursus sélectif as-tu intégré ? ',
    'Quel cursus sélectif as-tu intégré ?',
    'Quel cursus as-tu intégré ? (Dans quelle école / université)',
  ],
};

export type HelloAssoCustomField = {
  name: string;
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

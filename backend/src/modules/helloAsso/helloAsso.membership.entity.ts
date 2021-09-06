export const HelloAssoQuestions = {
  PHONE: ['Numéro de téléphone'],
  EMAIL: ['Email'],
  ADDRESS: ['Adresse', 'Ville de résidence'],
  ZIP_CODE: ['Code Postal'],
  BIRTH_DATE: ['Date de naissance'],
  ORIGIN_CITY: ["Ville/village d'origine", "Ville/Village d'origine"],
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
  ],
  CLASSE_PREPA: [
    'Es-tu passé par une classe préparatoire ? (Si oui, laquelle dans quel lycée)',
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
    'Quel cursus as tu intégré ?',
  ],
  CAREER: [
    'Peux-tu nous dire un mot sur ton parcours ? ',
    'Peux-tu nous dire un mot sur ton parcours et ta fonction actuelle ?',
    'Peux-tu nous dire un mot sur ton parcours ?',
    'Peux-tu préciser ta fonction actuelle ? ',
    'Peux-tu nous préciser ta fonction actuelle ? ',
    'Peux tu nous dire un mot sur ton parcours et ta fonction actuelle ?',
  ],
  ASSOCIATION_ENCOUNTER: [
    'Comment as-tu connu DTGE et ses associations ?',
    "Comment as-tu connu l'initiative ?",
    "Comment as tu connu l'initiative ?",
  ],
  FOREIGN_INTERNSHIP: [
    "As tu réalisé des échanges ou stages à l'étranger",
    "As-tu réalisé des stages ou des échanges à l'étranger ? (Si oui, dans quel pays et dans quel cadre ?)",
  ],
  ENGAGEMENT: [
    "Comment souhaites-tu t'engager en faveur de l'égalité des chances ? (à titre indicatif)",
    "Comment souhaites-tu t'engager dans l'association ? (à titre indicatif et facultatif)",
  ],
  SCHOOL_AND_TEACHING_SUBJECT: [
    'Dans quel(s) établissement(s) enseignes-tu ? Quel(les) discipline(s) enseignes-tu ? ',
    'Dans quel établissement enseignes tu ? Quelle(s) discipline(s) enseignes-tu ? ',
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

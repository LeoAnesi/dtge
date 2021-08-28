import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import httpClient from 'services/networking/client';

export const useDTGEMembers = (): AsyncState<HelloAssoMembershipEntity> => {
  return useAsync(async () => {
    const { data } = await httpClient.get<HelloAssoMembershipEntity>('members', true);

    return data;
  });
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
  customFields: {
    name:
      | 'Numéro de téléphone'
      | 'Email'
      | 'Adresse'
      | 'Code Postal'
      | 'Date de naissance'
      | "Ville/village d'origine"
      | "S'agit-il de ta première adhésion ? "
      | 'Sexe'
      | 'À quelle association souhaites-tu adhérer ? '
      | "Quel est ton lycée d'origine ?"
      | 'Peux-tu préciser le nom de ton École / prépa / Université ? '
      | 'Es-tu passé par une classe préparatoire (si oui, laquelle) ? '
      | "Quel est ton domaine d'activité ? "
      | 'Quel cursus sélectif as-tu intégré ? '
      | 'Comment as-tu connu DTGE et ses associations ?'
      | "En enregistrant votre adhésion, vous déclarez consentir au traitement de vos données par l'association DTGE. Pour consulter notre politique de confidentialité et exercer vos droits, envoyez un mail à contact@dtge.org";
    type: 'TextInput' | 'Date' | 'YesNo' | 'ChoiceList';
    answer: string;
  }[];
  id: number;
  amount: number;
  type: 'Membership';
  initialAmount: number;
  state: 'Processed';
}

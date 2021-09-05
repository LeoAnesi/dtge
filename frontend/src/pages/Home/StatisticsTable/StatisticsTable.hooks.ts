import { useAsync } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import httpClient from 'services/networking/client';

export const useGetStats = (): AsyncState<StatsDto> => {
  return useAsync(async () => {
    const { data } = await httpClient.get<StatsDto>('members/stats', true);

    return data;
  });
};

export interface StatsDto {
  [yearAndMonth: string]: [
    {
      association: string;
      membershipsNumber: number;
      membershipsAmount: number;
      donationsNumber: number;
      donationsAmount: number;
      total: number;
    },
  ];
}

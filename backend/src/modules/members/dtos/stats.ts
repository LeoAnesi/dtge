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

export type User = Readonly<{
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  roles: string[];
}>;

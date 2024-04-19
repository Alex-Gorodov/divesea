import { Item } from "./item";

export type User = {
  id: number;
  firstname: string;
  surname: string;
  nickname: string;
  totalSales: number | 0;
  followers: number | 0;
  following: number | 0;
  bio?: string;
  social?: string[];
  collection?: Item[];
  change?: number;
}

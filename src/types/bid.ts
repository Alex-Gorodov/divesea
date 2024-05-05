import { User } from "./user";

export type Bid = {
  id: string;
  user: User;
  date: Date;
  value: number;
}

import { User } from "./user";

export type Bid = {
  id: number;
  user: User;
  date: Date;
  price: number;
}

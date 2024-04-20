import { User } from "./user";

export type Item = {
  id: number;
  name: string;
  img: string;
  price: number;
  likes: number;
  addedDate: Date;
  addedBy?: string;
}

import { Bid } from "./bid";
import { User } from "./user";

export type Item = {
  id: number;
  name: string;
  description?: string;
  img: string;
  price: number;
  likes: number;
  addedDate: Date;
  author?: User;
  royalty?: 'Fixed' | 'Persentage';
  bids: Bid[];
}

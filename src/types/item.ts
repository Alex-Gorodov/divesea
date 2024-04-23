export type Item = {
  id: number;
  name: string;
  description?: string;
  img: string;
  price: number;
  likes?: number;
  addedDate: Date;
  addedBy?: string;
}

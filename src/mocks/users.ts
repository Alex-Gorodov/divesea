import { User } from "../types/user";
import { items } from "./items";

export const Users: User[] = [
  {
    id: 0,
    firstname: 'Alex',
    surname: "Gorodov",
    nickname: "user0",
    totalSales: 0,
    followers: 0,
    following: 0,
    bio: 'developer',
    collection: items.filter((item) => item.id % 3 === 0),
  }
]

import { Bid } from "../types/bid";
import { users } from "./users";

function getRandomDate(): Date {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1).getTime();
  const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 0).getTime();
  const randomTimestamp = startOfYear + Math.random() * (endOfYear - startOfYear);
  return new Date(randomTimestamp);
}

export let bids: Bid[] = [
  {
    id: 0,
    user: users[0],
    date: getRandomDate(),
    price: 1.45,
  },
  {
    id: 1,
    user: users[1],
    date: getRandomDate(),
    price: 1.6,
  },
  {
    id: 2,
    user: users[2],
    date: getRandomDate(),
    price: 1.32,
  },
  {
    id: 3,
    user: users[3],
    date: getRandomDate(),
    price: 1.1,
  },
  {
    id: 4,
    user: users[4],
    date: getRandomDate(),
    price: 1.15,
  },
  {
    id: 5,
    user: users[5],
    date: getRandomDate(),
    price: 1.67,
  },
  {
    id: 6,
    user: users[4],
    date: getRandomDate(),
    price: 1.43,
  },
  {
    id: 7,
    user: users[3],
    date: getRandomDate(),
    price: 1.2,
  },
]

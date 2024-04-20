import { User } from "../types/user";
import { items } from "./items";

export const Users: User[] = [
  {
    id: 0,
    firstname: 'Alex',
    surname: "Gorodov",
    nickname: "user0",
    totalSales: 27,
    followers: 23561,
    following: 245,
    bio: 'As an NFT artist, I blend traditional techniques with digital innovation, transcending boundaries in the art world. With a passion for exploring the intersection of technology and creativity, my work reflects a deep appreciation for both the tangible and the virtual. Inspired by the infinite possibilities of blockchain and the decentralized nature of NFTs, I strive to create pieces that provoke thought, evoke emotion, and challenge perceptions. Each artwork is a unique expression of my journey, inviting viewers to join me in exploring new realms of imagination and possibility. Welcome to my digital gallery, where art meets innovation and the future is limitless.',
    collection: items.filter((item) => item.id % 4 === 0),
    avatar: process.env.PUBLIC_URL + "/img/users/user-1.png"
  },
  {
    id: 1,
    firstname: 'John',
    surname: "Smith",
    nickname: "j.smith",
    totalSales: 53,
    followers: 5256,
    following: 953,
    bio: 'As an NFT artist, I merge traditional artistry with digital evolution, crafting pieces that redefine the boundaries of creativity. Inspired by blockchain\'s decentralized ethos, each artwork is a testament to innovation, inviting viewers into a realm where imagination knows no bounds. Welcome to my digital canvas, where art transcends convention and embraces the future.',
    collection: items.filter((item) => item.id % 3 === 0),
    avatar: process.env.PUBLIC_URL + "/img/users/user-2.png"
  },
  {
    id: 2,
    firstname: 'Eva',
    surname: "White",
    nickname: "eva_15",
    totalSales: 12,
    followers: 5256,
    following: 653,
    bio: 'With a palette of pixels and passion, I sculpt digital masterpieces that blur the line between reality and imagination. NFTs are my canvas, and blockchain is my medium, enabling me to create art that resonates in the decentralized landscape of tomorrow.',
    collection: items.filter((item) => item.id % 2 === 0),
    avatar: process.env.PUBLIC_URL + "/img/users/user-12.png"
  },
  {
    id: 3,
    firstname: 'Lana',
    surname: "Del Gray",
    nickname: "i'm.gray",
    totalSales: 103,
    followers: 24496,
    following: 573,
    bio: 'I am an artist of the digital age, weaving dreams into pixels and emotions into code. NFTs are my brush strokes, each stroke a testament to the boundless creativity that thrives in the virtual realm. Welcome to my world, where innovation meets inspiration.',
    collection: items.filter((item) => item.id % 5 === 0),
    avatar: process.env.PUBLIC_URL + "/img/users/user-4.png"
  },
  {
    id: 4,
    firstname: 'Clara',
    surname: "Tsvetkin",
    nickname: "Tsvetkin",
    totalSales: 8,
    followers: 524,
    following: 423,
    bio: 'In the vast expanse of the digital universe, I am an explorer, navigating the infinite possibilities of blockchain and NFTs. Through my art, I seek to capture the essence of humanity in bytes and pixels, inviting viewers to ponder the intersection of technology and emotion.',
    collection: items.filter((item) => item.id % 7 === 0),
    avatar: process.env.PUBLIC_URL + "/img/users/user-5.png"
  },
]

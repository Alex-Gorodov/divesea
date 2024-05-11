export enum AppRoute {
  Root = "/divesea",
  Discover = "/divesea/discover",
  Creators = "/divesea/creators",
  UserPage = "/divesea/creators/:id",
  ProductPage = "/divesea/item/:id",
  Sell = "/divesea/sell",
  Stats = "/divesea/stats",
}

export enum APIRoute {
  Users = "divesea-db/users",
  Items = "divesea-db/items",
  Bids = "divesea-db/bids",
}

export enum HeroItemSizes {
  Active = 392,
  ActiveMobile = 210,
  Inactive = 318,
  InactiveMobile = 170,
}

export enum ScreenSizes {
  Mobile = 430,
  MobileOnly = 768,
  Tablet = 1024,
  Desktop = 1440,
  ContainerMaxWidth = 1250
}

export enum WalletPositions {
  Closed = 1500,
  Opened = 0,
  OpenedMobile = 122,
}

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

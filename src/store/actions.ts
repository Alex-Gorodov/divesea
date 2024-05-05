import { createAction } from "@reduxjs/toolkit";
import { Item } from "../types/item";
import { AppRoute } from "../const";
import { Bid } from "../types/bid";
import { User } from "../types/user";

export const setUploadedNftPath = createAction<{ path: string | null }>('sell/getUploadedNftPath');

export const getUploadedNftPath = createAction<{ path: string }>('sell/getUploadedNftPath');

export const createNFT = createAction<{ item: Item }>('sell/createNFH');

export const redirectToRoute = createAction<AppRoute>('page/redirectToRoute');

export const toggleBidForm = createAction<{ isOpened: boolean, item: Item }>('page/toggleBidForm');

export const addBid = createAction<{bid: Bid, item: Item}>('page/addBid');

export const toggleLike = createAction<{like: boolean, item: Item}>('page/toggleLike');

export const loadItems = createAction<{items: Item[]}>('data/loadItems');

export const loadUsers = createAction<{users: User[]}>('data/loadUsers');

export const setItemsDataLoadingStatus = createAction<{isItemsDataLoading: boolean}>('data/setItemsDataLoadingStatus')

export const setUsersDataLoadingStatus = createAction<{isUsersDataLoading: boolean}>('data/setUsersDataLoadingStatus')

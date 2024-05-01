import { createAction } from "@reduxjs/toolkit";
import { Item } from "../../types/item";
import { AppRoute } from "../../const";
import { Bid } from "../../types/bid";

export const setUploadedNftPath = createAction<{ path: string | null }>('sell/getUploadedNftPath');

export const getUploadedNftPath = createAction<{ path: string }>('sell/getUploadedNftPath');

export const createNFT = createAction<{ item: Item }>('sell/createNFH');

export const redirectToRoute = createAction<AppRoute>('page/redirectToRoute');

export const toggleBidForm = createAction<{ isOpened: boolean }>('page/toggleBidForm');

export const addBid = createAction<{bid: Bid}>('page/addBid');

export const toggleLike = createAction<{like: boolean, item: Item}>('page/toggleLike');

import { createAction } from "@reduxjs/toolkit";
import { Item } from "../../types/item";
import { AppRoute } from "../../const";

export const setUploadedNftPath = createAction<{ path: string }>('sell/getUploadedNftPath');

export const getUploadedNftPath = createAction<{ path: string }>('sell/getUploadedNftPath');

export const createNFT = createAction<{ item: Item }>('sell/createNFH');

export const redirectToRoute = createAction<AppRoute>('page/redirectToRoute');

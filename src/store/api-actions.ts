import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute } from "../const";
import { AppDispatch } from "../types/state";
import { loadItems, loadUsers, setItemsDataLoadingStatus, setUsersDataLoadingStatus } from "./actions";
import firebase from "firebase/compat/app";
import { Item } from "../types/item";
import { User } from "../types/user";


type ThunkOptions = {
  dispatch: AppDispatch;
};

export const fetchItemsAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchItems', async (_arg, { dispatch }) => {
    dispatch(setItemsDataLoadingStatus({isItemsDataLoading: true}));
    const data = (await firebase.database().ref(APIRoute.Items).once("value")).val();
    const itemsArray: Item[] = data ? Object.values(data) : [];
    dispatch(loadItems({items: itemsArray}));
    dispatch(setItemsDataLoadingStatus({isItemsDataLoading: false}));
  }
);

export const fetchUsersAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchUsers', async (_arg, { dispatch }) => {
    dispatch(setUsersDataLoadingStatus({isUsersDataLoading: true}));
    const data = (await firebase.database().ref(APIRoute.Users).once("value")).val();
    const usersArray: User[] = data ? Object.values(data) : [];
    dispatch(setUsersDataLoadingStatus({isUsersDataLoading: false}));
    dispatch(loadUsers({users: usersArray}));
  }
)


// export const clearErrorAction = createAsyncThunk('offers/clearError', () => {
//   setTimeout(() => store.dispatch(setError({error: null})), TIMEOUT_SHOW_ERROR);
// });

// export const loginAction = createAsyncThunk<
// void,
// AuthData,
// ThunkOptions>
// (
//   'user/login',
//   async ({ login: email, password }, { dispatch, extra: api }) => {
//     const { data } = await api.post<UserAuthData>(APIRoute.Login, {
//       email,
//       password,
//     });
//     saveToken(data.token);
//     dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));
//     dispatch(redirectToRoute(AppRoute.Root));
//     dispatch(getUserInformation({userInformation: data}));
//   }
// );

// export const logoutAction = createAsyncThunk<
//   void,
//   undefined,
//   ThunkOptions>
//   (
//     'user/logout', async (_arg, { dispatch, extra: api }) => {
//       await api.delete(APIRoute.Logout);
//       dropToken();
//       dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
//     });

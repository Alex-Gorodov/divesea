import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { Bid } from '../types/bid';
import { Item } from '../types/item';
import { APIRoute } from '../const';

const firebaseConfig = {
  apiKey: "AIzaSyDMfAbrjGAaAmEBf9Cs9FLCVnbur8HxAM0",
  authDomain: "divesea-cf260.firebaseapp.com",
  databaseURL: "https://divesea-cf260-default-rtdb.firebaseio.com",
  projectId: "divesea-cf260",
  storageBucket: "divesea-cf260.appspot.com",
  messagingSenderId: "1044818186400",
  appId: "1:1044818186400:web:2f4786dea96676dd3039c5"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export const addBidToDatabase = (bid: Bid) => {
  const bidWithTimestamp = { ...bid, timestamp: new Date().toISOString() };
  return database.ref(APIRoute.Bids).push(bidWithTimestamp);
};

export const addItemToDatabase = (item: Item) => {
  const itemWithTimestamp = { ...item, addedDate: new Date().toISOString() };
  return database.ref(APIRoute.Items).push(itemWithTimestamp);
}

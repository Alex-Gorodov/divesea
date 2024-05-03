import { State } from "history";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch } from "../types/state";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

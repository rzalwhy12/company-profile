import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppStore, RootState, AppDispatch } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // redefine react hooks for action
export const useAppSelector = useSelector.withTypes<RootState>(); // redefine react hooks for state reducer
export const useAppStore = useStore.withTypes<AppStore>(); // redefine react hooks for access all data in store

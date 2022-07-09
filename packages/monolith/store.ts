import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { zebraApi } from "./slices/zebraApi";
import useNftModal from "./slices/useNftModalSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

const reducers = combineReducers({
  [zebraApi.reducerPath]: zebraApi.reducer,
  useNftModal,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [zebraApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(zebraApi.middleware),
  });

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

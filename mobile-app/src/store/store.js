import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import alertReducer from "./features/alertSlice";
import backdropReducer from "./features/backdropSlice";
import favorisReducer from "./features/favorisSlice";
import currencyReducer from "./features/currencySlice";
import langReducer from "./features/langSlice";
import loginReducer from "./features/loginSlice";
import questionReducer from "./features/questionSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  lang: langReducer,
  alert: alertReducer,
  backdrop: backdropReducer,
  favoris: favorisReducer,
  currency: currencyReducer,
  question: questionReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["alert", "backdrop"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

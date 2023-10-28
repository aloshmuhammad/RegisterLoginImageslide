import { configureStore, combineReducers } from "@reduxjs/toolkit";


import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 



import userSlices from "./userSlice";

const rootReducer = combineReducers({
  userSlice: userSlices,
 
});

const persistConfig = {
  key: "root", 
  storage, // Storage engine to use (e.g., localStorage)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { persistor, store };
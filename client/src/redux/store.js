import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from '../apicalls/api';
import loaderSlice from './loaderSlice';
import usersSlice from './usersSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    loader: loaderSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);
export default store;

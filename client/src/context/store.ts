import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import activitiesReducer from "./activitiesSlice";
export const store = configureStore({
  reducer: { auth: authReducer, activities: activitiesReducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

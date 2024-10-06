import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
      auth: authReducer,  // редюсер для авторизации
      users: userReducer, // редюсер для работы с пользователями
    },
  });

export type RootState = ReturnType<typeof store.getState>; // Тип для всего состояния приложения
export type AppDispatch = typeof store.dispatch; // Типизированный dispatch, который понимает асинхронные действия
  
export default store;
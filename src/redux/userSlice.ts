import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Интерфейс пользователя
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  usersPerPage: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  usersPerPage: 8,
};

//загрузка пользователей
export const fetchUsers = createAsyncThunk<User[], number>('users/fetchUsers', async (page: number, { getState, rejectWithValue }) => {
  const state = getState() as { users: UserState };
  const { usersPerPage } = state.users; // Получаем количество пользователей на странице

  try {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${usersPerPage}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue('Ошибка при загрузке пользователей');
  }
});

//slice для пользователей
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    incrementPage(state) {
      state.currentPage += 1;
    },
    resetState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentPage === 1) {
          state.users = action.payload;
        } else {
          state.users = [...state.users, ...action.payload];
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {incrementPage, resetState} = userSlice.actions

export default userSlice.reducer;

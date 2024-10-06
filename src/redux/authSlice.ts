import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//интерфейс для состояния авторизации
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

//экшн для регистрации пользователя
export const registerUser = createAsyncThunk<string, { name: string; email: string; password: string }, { rejectValue: string }>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка регистрации');
      }
      localStorage.setItem('token', data.token)
      return data.token; // Возвращаем токен
    } catch (error) {
      return rejectWithValue((error as Error).message); // Приводим к строке
    }
  }
);

// Создаем slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Приводим к строке
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

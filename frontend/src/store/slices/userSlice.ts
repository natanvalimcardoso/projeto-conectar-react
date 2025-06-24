import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserFilters } from '../../types';
import { userApi } from '../../services/api';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  filters: UserFilters;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  filters: {},
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (filters: UserFilters, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers(filters);
      console.log('Fetch users response:', response.data);
      // Backend retorna: { success, message, data: [...] }
      const apiResponse = response.data as any;
      return apiResponse.data || apiResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: string; userData: Partial<User> }, { rejectWithValue }) => {
    try {
      const response = await userApi.updateUser(id, userData);
      const apiResponse = response.data as any;
      return apiResponse.data || apiResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

export const adminEditUser = createAsyncThunk(
  'users/adminEditUser',
  async ({ id, userData }: { id: string; userData: { name?: string; email?: string; password?: string; role?: 'admin' | 'user' } }, { rejectWithValue }) => {
    try {
      const response = await userApi.adminEditUser(id, userData);
      const apiResponse = response.data as any;
      return apiResponse.data || apiResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to edit user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      await userApi.deleteUser(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(adminEditUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export const { setFilters, clearError } = userSlice.actions;
export default userSlice.reducer;


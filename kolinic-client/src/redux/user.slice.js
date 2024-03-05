import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activateUser, deleteUser, getMe, getUsers, updateMe } from "../services/apiUser.service";
import { toast } from "react-toastify";

const initializeUser = async () => {
    try {
        const res = await getMe();
        return res;
    } catch (error) {
        return null;
    }
};

export const getMeAction = createAsyncThunk(
    "users/getMe",
    async ({ }, { rejectWithValue }) => {
        try {
            const res = await getMe();
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const updateMeAction = createAsyncThunk(
    "users/updateMe",
    async ({ body, avatar }, { rejectWithValue }) => {
        try {
            const res = await updateMe({ body, avatar });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const getUsersAction = createAsyncThunk(
    "users/getUsers",
    async (searchValue, { rejectWithValue }) => {
        try {
            const res = await getUsers(searchValue || "");
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const activateUserAction = createAsyncThunk(
    "users/activateUser",
    async ({ id, value }, { rejectWithValue }) => {
        try {
            const res = await activateUser({ id, value });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const deleteUserAction = createAsyncThunk(
    "users/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteUser(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);

const initialState = {
    isLoading: false,
    isUpdating: false,
    user: await initializeUser(),
    users: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getMeAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getMeAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, user: action.payload };
            })
            .addCase(getMeAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(updateMeAction.pending, (state) => {
                return { ...state, isUpdating: true };
            })
            .addCase(updateMeAction.fulfilled, (state, action) => {
                toast.success("Update profile successfully", {
                    position: "top-right"
                })
                return { ...state, isUpdating: false, user: action.payload };
            })
            .addCase(updateMeAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isUpdating: false };
            })
            .addCase(getUsersAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getUsersAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, users: action.payload };
            })
            .addCase(getUsersAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(activateUserAction.pending, (state) => {
                return { ...state, isUpdating: true };
            })
            .addCase(activateUserAction.fulfilled, (state, action) => {
                toast.success("Activate user successfully", {
                    position: "top-right"
                });
                return {
                    ...state, isUpdating: false, users: [...state.users.map(user => {
                        if (user.id === action.payload.id) {
                            return action.payload;
                        }
                        return user;
                    })]
                };
            })
            .addCase(activateUserAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isUpdating: false };
            })
            .addCase(deleteUserAction.pending, (state) => {
                return { ...state, isUpdating: true };
            })
            .addCase(deleteUserAction.fulfilled, (state, action) => {
                toast.success("Delete user successfully", {
                    position: "top-right"
                });
                return {
                    ...state, isUpdating: false, users: [...state.users.filter(user => user.id !== action.payload)]
                };
            })
            .addCase(deleteUserAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isUpdating: false };
            })
});

export const {
    setUser
} = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state) => state.user.user;
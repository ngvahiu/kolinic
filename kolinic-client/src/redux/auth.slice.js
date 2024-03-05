import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addPassword, forgotPassword, login, loginBySocial, logout, register, resetPassword, updatePassword } from "../services/apiAuth.service";
import { setUser } from "./user.slice";

export const signInAction = createAsyncThunk(
    "auth/signIn",
    async (body, { rejectWithValue, dispatch }) => {
        try {
            const res = await login(body);
            dispatch(setUser(res.user));
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const signUpAction = createAsyncThunk(
    "auth/signUp",
    async ({ body, callbackFn }, { rejectWithValue }) => {
        try {
            const res = await register(body);
            return { res, callbackFn };
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const forgotPasswordAction = createAsyncThunk(
    "auth/forgotPassword",
    async (email, { rejectWithValue }) => {
        try {
            const res = await forgotPassword(email);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const resetPasswordAction = createAsyncThunk(
    "auth/resetPassword",
    async ({ token, body, callbackFn }, { rejectWithValue }) => {
        try {
            const res = await resetPassword({ token, body });
            return { res, callbackFn };
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const updatePasswordAction = createAsyncThunk(
    "auth/updatePassword",
    async (body, { rejectWithValue, dispatch }) => {
        try {
            const res = await updatePassword(body);
            localStorage.setItem('token', JSON.stringify(res.accessToken));
            dispatch(setUser(res.user));
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const addPasswordAction = createAsyncThunk(
    "auth/addPassword",
    async (body, { rejectWithValue, dispatch }) => {
        try {
            const res = await addPassword(body);
            dispatch(setUser(res));
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const signInSocialAction = createAsyncThunk(
    "auth/signInByGoogle",
    async (body, { rejectWithValue, dispatch }) => {
        try {
            const res = await loginBySocial(body);
            dispatch(setUser(res.user));
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const logoutAction = createAsyncThunk(
    "auth/logout",
    async ({ }, { rejectWithValue }) => {
        try {
            const res = await logout();
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);

const initialState = {
    isLoading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(signInAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(signInAction.fulfilled, (state, action) => {
                toast.success("Sign in successfully", {
                    position: "top-right"
                });
                return { ...state, isLoading: false };
            })
            .addCase(signInAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(signUpAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(signUpAction.fulfilled, (state, action) => {
                toast.success("Please check your email to complete registering process", {
                    position: "top-right",
                    onClose: () => action.payload.callbackFn()
                });
                return { ...state, isLoading: false };
            })
            .addCase(signUpAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(forgotPasswordAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(forgotPasswordAction.fulfilled, (state, action) => {
                toast.success("Send email successfully !", {
                    position: "top-right"
                });
                return { ...state, isLoading: false };
            })
            .addCase(forgotPasswordAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(resetPasswordAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(resetPasswordAction.fulfilled, (state, action) => {
                toast.success("Reset password successfully !", {
                    position: "top-right",
                    onClose: () => action.payload.callbackFn()
                });
                return { ...state, isLoading: false };
            })
            .addCase(resetPasswordAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(updatePasswordAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(updatePasswordAction.fulfilled, (state, action) => {
                toast.success("Update password successfully !", {
                    position: "top-right"
                });
                return { ...state, isLoading: false };
            })
            .addCase(updatePasswordAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(addPasswordAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(addPasswordAction.fulfilled, (state, action) => {
                toast.success("Add password successfully !", {
                    position: "top-right"
                });
                return { ...state, isLoading: false };
            })
            .addCase(addPasswordAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(signInSocialAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(signInSocialAction.fulfilled, (state, action) => {
                toast.success("Sign in successfully", {
                    position: "top-right"
                });
                return { ...state, isLoading: false };
            })
            .addCase(signInSocialAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(logoutAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(logoutAction.fulfilled, (state, action) => {
                toast.success("Log out successfully", {
                    position: "top-right",
                    onClose: () => window.location.reload()
                });
                return { ...state, isLoading: false };
            })
            .addCase(logoutAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
});

export default authSlice.reducer;
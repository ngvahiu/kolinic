import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getDepartments } from "../services/apiDepartment.service";

export const getDepartmentsAction = createAsyncThunk(
    "departments/getDepartments",
    async ({ pageSize, pageNo }, { rejectWithValue }) => {
        try {
            const res = await getDepartments({ pageSize, pageNo });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);

const initialState = {
    isLoading: false,
    isUpdating: false,
    departments: [],
};

const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getDepartmentsAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDepartmentsAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, departments: action.payload };
            })
            .addCase(getDepartmentsAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
});

export default departmentSlice.reducer;
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createDoctor, deleteDoctor, getDoctor, getDoctors, updateDoctor } from "../services/apiDoctor.service";

export const getDoctorsAction = createAsyncThunk(
    "doctors/getDoctors",
    async ({ pageSize, pageNo, search }, { rejectWithValue }) => {
        try {
            const res = await getDoctors({ pageSize, pageNo, search });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const getDoctorAction = createAsyncThunk(
    "doctors/getDoctor",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getDoctor(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const deleteDoctorAction = createAsyncThunk(
    "doctors/deleteDoctor",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteDoctor(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const createDoctorAction = createAsyncThunk(
    "doctors/createDoctor",
    async ({ body, avatar }, { rejectWithValue }) => {
        try {
            const res = await createDoctor({ body, avatar });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);
export const updateDoctorAction = createAsyncThunk(
    "doctors/updateDoctor",
    async ({ id, body, avatar }, { rejectWithValue }) => {
        try {
            const res = await updateDoctor({ id, body, avatar });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);

const initialState = {
    isLoading: false,
    doctors: [],
    doctor: null
};

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        filterDoctorsByDepartment: (state, action) => {
            return { ...state, doctors: state.doctors.filter(doctor => doctor.department.id === action.payload) }
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getDoctorsAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDoctorsAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, doctors: action.payload };
            })
            .addCase(getDoctorsAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(getDoctorAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDoctorAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, doctor: action.payload };
            })
            .addCase(getDoctorAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(deleteDoctorAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(deleteDoctorAction.fulfilled, (state, action) => {
                toast.success("Delete doctor successfully", {
                    position: "top-right"
                })
                return { ...state, isLoading: false, doctors: state.doctors.filter(doctor => doctor.id !== action.payload) };
            })
            .addCase(deleteDoctorAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(createDoctorAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(createDoctorAction.fulfilled, (state, action) => {
                toast.success("Create doctor successfully", {
                    position: "top-right"
                })
                return { ...state, isLoading: false, doctors: [...state.doctors, action.payload] };
            })
            .addCase(createDoctorAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(updateDoctorAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(updateDoctorAction.fulfilled, (state, action) => {
                let newDoctors = structuredClone(current(state).doctors);
                const index = newDoctors.findIndex(doctor => doctor.id === action.payload.id);
                newDoctors[index] = action.payload;
                toast.success("Update doctor successfully", {
                    position: "top-right"
                });
                return { ...state, isLoading: false, doctors: newDoctors };
            })
            .addCase(updateDoctorAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
});

export const {
    filterDoctorsByDepartment
} = doctorSlice.actions;
export default doctorSlice.reducer;
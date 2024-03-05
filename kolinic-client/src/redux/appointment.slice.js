import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cancelAppointment, completeAppointment, createAppointment, createFeedback, getAppointmentsForAdmin, getMyAppointments } from "../services/apiAppointment.service";

export const createAppointmentAction = createAsyncThunk(
    "appointments/createAppointment",
    async (body, { rejectWithValue }) => {
        try {
            const res = await createAppointment(body);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const getMyAppointmentsAction = createAsyncThunk(
    "appointments/getMyAppointments",
    async ({ pageSize, pageNo }, { rejectWithValue }) => {
        try {
            const res = await getMyAppointments({ pageSize, pageNo });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const createFeedbackAction = createAsyncThunk(
    "appointments/createFeedback",
    async (body, { rejectWithValue }) => {
        try {
            const res = await createFeedback(body);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const cancelAppointmentAction = createAsyncThunk(
    "appointments/cancelAppointment",
    async (id, { rejectWithValue }) => {
        try {
            const res = await cancelAppointment(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const getAppointmentsForAdminAction = createAsyncThunk(
    "appointments/getAppointmentsForAdmin",
    async ({ }, { rejectWithValue }) => {
        try {
            const res = await getAppointmentsForAdmin();
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const completeAppointmentAction = createAsyncThunk(
    "appointments/completeAppointment",
    async (id, { rejectWithValue }) => {
        try {
            const res = await completeAppointment(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

const initialState = {
    isLoading: false,
    isCreating: false,
    isUpdating: false,
    isCanceling: false,
    appointments: []
};

const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(createAppointmentAction.pending, (state) => {
                return { ...state, isCreating: true };
            })
            .addCase(createAppointmentAction.fulfilled, (state, action) => {
                toast.success("Make appointment successfully", {
                    position: "top-right"
                });
                return { ...state, isCreating: false, appointments: [...state.appointments, action.payload] };
            })
            .addCase(createAppointmentAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                });
                return { ...state, isCreating: false };
            })
            .addCase(getMyAppointmentsAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getMyAppointmentsAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, appointments: action.payload };
            })
            .addCase(getMyAppointmentsAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                });
                return { ...state, isLoading: false };
            })
            .addCase(createFeedbackAction.pending, (state) => {
                return { ...state, isCreating: true };
            })
            .addCase(createFeedbackAction.fulfilled, (state, action) => {
                let newAppointments = structuredClone(current(state).appointments);
                const index = newAppointments.findIndex(appointment => appointment.id === action.payload.appointment.id);
                newAppointments[index].feedback = action.payload;
                toast.success("Submit feedback successfully", {
                    position: "top-right"
                });
                return { ...state, isCreating: false, appointments: newAppointments };
            })
            .addCase(createFeedbackAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                });
                return { ...state, isCreating: false };
            })
            .addCase(cancelAppointmentAction.pending, (state) => {
                return { ...state, isCanceling: true };
            })
            .addCase(cancelAppointmentAction.fulfilled, (state, action) => {
                toast.success("Cancel appointment successfully", {
                    position: "top-right"
                });
                return { ...state, isCanceling: false, appointments: state.appointments.filter(app => app.id !== action.payload) };
            })
            .addCase(cancelAppointmentAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                });
                return { ...state, isCanceling: false };
            })
            .addCase(getAppointmentsForAdminAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getAppointmentsForAdminAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, appointments: action.payload };
            })
            .addCase(getAppointmentsForAdminAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                });
                return { ...state, isLoading: false };
            })
            .addCase(completeAppointmentAction.pending, (state) => {
                return { ...state, isUpdating: true };
            })
            .addCase(completeAppointmentAction.fulfilled, (state, action) => {
                let newAppointments = structuredClone(current(state).appointments);
                const index = newAppointments.findIndex(appointment => appointment.id === action.payload.id);
                newAppointments[index].completed = true;
                toast.success("Complete appointment successfully", {
                    position: "top-right"
                });
                return { ...state, isUpdating: false, appointments: newAppointments };
            })
            .addCase(completeAppointmentAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                });
                return { ...state, isUpdating: false };
            })
});

export default appointmentSlice.reducer;
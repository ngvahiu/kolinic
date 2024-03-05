import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createService, deleteService, getService, getServices, updateService } from "../services/apiService.service";

export const getServicesAction = createAsyncThunk(
    "services/getServices",
    async ({ pageSize, pageNo, search }, { rejectWithValue }) => {
        try {
            const res = await getServices({ pageSize, pageNo, search });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });
export const getServiceAction = createAsyncThunk(
    "services/getService",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getService(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });
export const deleteServiceAction = createAsyncThunk(
    "services/deleteService",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteService(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });
export const createServiceAction = createAsyncThunk(
    "services/createService",
    async ({ body, logo, img }, { rejectWithValue }) => {
        try {
            const res = await createService({ body, logo, img });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });
export const updateServiceAction = createAsyncThunk(
    "services/updateService",
    async ({ id, body, logo, img }, { rejectWithValue }) => {
        try {
            const res = await updateService({ id, body, logo, img });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

const initialState = {
    isLoading: false,
    isUpdating: false,
    isCreating: false,
    services: [],
    service: null
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getServicesAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getServicesAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, services: action.payload };
            })
            .addCase(getServicesAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(getServiceAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getServiceAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, service: action.payload };
            })
            .addCase(getServiceAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(deleteServiceAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(deleteServiceAction.fulfilled, (state, action) => {
                toast.success("Delete service successfully", {
                    position: "top-right"
                })
                return { ...state, isLoading: false, services: state.services.filter(service => service.id !== action.payload) };
            })
            .addCase(deleteServiceAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(createServiceAction.pending, (state) => {
                return { ...state, isCreating: true };
            })
            .addCase(createServiceAction.fulfilled, (state, action) => {
                toast.success("Create service successfully", {
                    position: "top-right"
                })
                return { ...state, isCreating: false, services: [...state.services, action.payload] };
            })
            .addCase(createServiceAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isCreating: false };
            })
            .addCase(updateServiceAction.pending, (state) => {
                return { ...state, isUpdating: true };
            })
            .addCase(updateServiceAction.fulfilled, (state, action) => {
                let newServices = structuredClone(current(state).services);
                const index = newServices.findIndex(service => service.id === action.payload.id);
                newServices[index] = action.payload;
                toast.success("Update service successfully", {
                    position: "top-right"
                })
                return { ...state, isUpdating: false, services: newServices };
            })
            .addCase(updateServiceAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isUpdating: false };
            })
});

export default serviceSlice.reducer;
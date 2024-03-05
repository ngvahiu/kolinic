import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { cancelDrugOrder, createDrug, createDrugCategory, createDrugOrder, deleteDrug, deleteDrugCategory, getDrug, getDrugCategories, getDrugCategory, getDrugOrders, getDrugOrdersForAdmin, getDrugs, getDrugsByCategory, updateDrug, updateDrugCategory, updateOrderStatus } from "../services/apiDrug.service";
import { clearCart } from "./cart.slice";

export const getDrugsAction = createAsyncThunk(
    "drugs/getDrugs",
    async ({ pageSize, pageNo, direc, sortBy, search }, { rejectWithValue }) => {
        try {
            const res = await getDrugs({ pageSize, pageNo, direc, sortBy, search });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const getDrugsByCategoryAction = createAsyncThunk(
    "drugs/getDrugsByCategory",
    async ({ categoryId, params: { pageSize, pageNo, direc, sortBy } }, { rejectWithValue }) => {
        try {
            const res = await getDrugsByCategory(categoryId, { pageSize, pageNo, direc, sortBy });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);

export const getDrugCategoriesAction = createAsyncThunk(
    "drugs/getDrugCategories",
    async ({ pageSize, pageNo }, { rejectWithValue }) => {
        try {
            const res = await getDrugCategories({ pageSize, pageNo });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const getDrugCategoryAction = createAsyncThunk(
    "drugs/getDrugCategory",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getDrugCategory(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const getDrugAction = createAsyncThunk(
    "drugs/getDrug",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getDrug(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const createDrugCategoryAction = createAsyncThunk(
    "drugs/createDrugCategory",
    async ({ body, img }, { rejectWithValue }) => {
        try {
            const res = await createDrugCategory({ body, img });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const updateDrugCategoryAction = createAsyncThunk(
    "drugs/updateDrugCategory",
    async ({ id, body, img }, { rejectWithValue }) => {
        try {
            const res = await updateDrugCategory({ id, body, img });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const deleteDrugCategoryAction = createAsyncThunk(
    "drugs/deleteDrugCategory",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteDrugCategory(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);

export const createDrugAction = createAsyncThunk(
    "drugs/createDrug",
    async ({ body, img }, { rejectWithValue }) => {
        try {
            const res = await createDrug({ body, img });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const updateDrugAction = createAsyncThunk(
    "drugs/updateDrug",
    async ({ id, body, img }, { rejectWithValue }) => {
        try {
            const res = await updateDrug({ id, body, img });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const deleteDrugAction = createAsyncThunk(
    "drugs/deleteDrug",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteDrug(id);
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    }
);

export const getDrugOrdersForAdminAction = createAsyncThunk(
    "drugs/getDrugOrdersForAdmin",
    async ({ }, { rejectWithValue }) => {
        try {
            const res = await getDrugOrdersForAdmin();
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const getDrugOrdersAction = createAsyncThunk(
    "drugs/getOrders",
    async ({ }, { rejectWithValue }) => {
        try {
            const res = await getDrugOrders();
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const createDrugOrderAction = createAsyncThunk(
    "drugs/createOrder",
    async (body, { dispatch, rejectWithValue }) => {
        try {
            const res = await createDrugOrder(body);
            dispatch(clearCart());
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const cancelDrugOrderAction = createAsyncThunk(
    "drugs/cancelOrder",
    async (id, { rejectWithValue }) => {
        try {
            const res = await cancelDrugOrder(id);
            return { id };
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

export const updateOrderStatusAction = createAsyncThunk(
    "drugs/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const res = await updateOrderStatus({ id, status });
            return res;
        } catch (error) {
            return rejectWithValue(error.response.data.errors[0] || "Internal Server Error");
        }
    });

const initialState = {
    isLoading: false,
    isUpdating: false,
    isCreating: false,
    isCanceling: false,
    drugs: [],
    drugCategories: [],
    drugCategory: null,
    drug: null,
    drugOrders: []
};

const drugSlice = createSlice({
    name: "drug",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getDrugsAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDrugsAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, drugs: action.payload };
            })
            .addCase(getDrugsAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(getDrugsByCategoryAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDrugsByCategoryAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, drugs: action.payload };
            })
            .addCase(getDrugsByCategoryAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(getDrugCategoriesAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDrugCategoriesAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, drugCategories: action.payload };
            })
            .addCase(getDrugCategoriesAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(getDrugCategoryAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDrugCategoryAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, drugCategory: action.payload };
            })
            .addCase(getDrugCategoryAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(getDrugAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDrugAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, drug: action.payload };
            })
            .addCase(getDrugAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(createDrugOrderAction.pending, (state) => {
                return { ...state, isCreating: true };
            })
            .addCase(createDrugOrderAction.fulfilled, (state, action) => {
                toast.success("Create order successfully", {
                    position: "top-right",
                    onClose: () => window.location.reload()
                });

                return { ...state, isCreating: false, drugOrders: [...state.drugOrders, action.payload] };
            })
            .addCase(createDrugOrderAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isCreating: false };
            })
            .addCase(getDrugOrdersAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDrugOrdersAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, drugOrders: action.payload };
            })
            .addCase(getDrugOrdersAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(cancelDrugOrderAction.pending, (state) => {
                return { ...state, isCanceling: true };
            })
            .addCase(cancelDrugOrderAction.fulfilled, (state, action) => {
                toast.success("Cancel order successfully", {
                    position: "top-right"
                })
                return { ...state, isCanceling: false, drugOrders: state.drugOrders.filter(order => order.id !== action.payload.id) };
            })
            .addCase(cancelDrugOrderAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isCanceling: false };
            })
            .addCase(updateOrderStatusAction.pending, (state) => {
                return { ...state, isUpdating: true };
            })
            .addCase(updateOrderStatusAction.fulfilled, (state, action) => {
                let newDrugOrders = [...state.drugOrders];
                const index = newDrugOrders.findIndex(order => order.id === action.payload.id);
                newDrugOrders[index] = action.payload;
                return { ...state, isUpdating: false, drugOrders: newDrugOrders };
            })
            .addCase(updateOrderStatusAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isUpdating: false };
            })
            .addCase(createDrugCategoryAction.pending, (state) => {
                return { ...state, isCreating: true };
            })
            .addCase(createDrugCategoryAction.fulfilled, (state, action) => {
                toast.success("Create drug category successfully", {
                    position: "top-right"
                })
                return { ...state, isCreating: false, drugCategories: [...state.drugCategories, action.payload] };
            })
            .addCase(createDrugCategoryAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isCreating: false };
            })
            .addCase(updateDrugCategoryAction.pending, (state) => {
                return { ...state, isUpdating: true };
            })
            .addCase(updateDrugCategoryAction.fulfilled, (state, action) => {
                let newDrugCategories = structuredClone(current(state).drugCategories);
                const index = newDrugCategories.findIndex(category => category.id === action.payload.id);
                newDrugCategories[index] = action.payload;
                toast.success("Update drug category successfully", {
                    position: "top-right"
                });
                return { ...state, isUpdating: false, drugCategories: newDrugCategories };
            })
            .addCase(updateDrugCategoryAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isUpdating: false };
            })
            .addCase(deleteDrugCategoryAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(deleteDrugCategoryAction.fulfilled, (state, action) => {
                toast.success("Delete drug category successfully", {
                    position: "top-right"
                })
                return { ...state, isLoading: false, drugCategories: state.drugCategories.filter(category => category.id !== action.payload) };
            })
            .addCase(deleteDrugCategoryAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(createDrugAction.pending, (state) => {
                return { ...state, isCreating: true };
            })
            .addCase(createDrugAction.fulfilled, (state, action) => {
                toast.success("Create drug successfully", {
                    position: "top-right"
                })
                return { ...state, isCreating: false, drugs: [...state.drugs, action.payload] };
            })
            .addCase(createDrugAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isCreating: false };
            })
            .addCase(updateDrugAction.pending, (state) => {
                return { ...state, isUpdating: true };
            })
            .addCase(updateDrugAction.fulfilled, (state, action) => {
                let newDrugs = structuredClone(current(state).drugs);
                const index = newDrugs.findIndex(drug => drug.id === action.payload.id);
                newDrugs[index] = action.payload;
                toast.success("Update drug successfully", {
                    position: "top-right"
                });
                return { ...state, isUpdating: false, drugs: newDrugs };
            })
            .addCase(updateDrugAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isUpdating: false };
            })
            .addCase(deleteDrugAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(deleteDrugAction.fulfilled, (state, action) => {
                toast.success("Delete drug successfully", {
                    position: "top-right"
                })
                return { ...state, isLoading: false, drugs: state.drugs.filter(drug => drug.id !== action.payload) };
            })
            .addCase(deleteDrugAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
            .addCase(getDrugOrdersForAdminAction.pending, (state) => {
                return { ...state, isLoading: true };
            })
            .addCase(getDrugOrdersForAdminAction.fulfilled, (state, action) => {
                return { ...state, isLoading: false, drugOrders: action.payload };
            })
            .addCase(getDrugOrdersForAdminAction.rejected, (state, action) => {
                toast.error(action.payload, {
                    position: "top-right"
                })
                return { ...state, isLoading: false };
            })
});

export default drugSlice.reducer;

export const getDrugOrdersList = (state) => state.drug.drugOrders;
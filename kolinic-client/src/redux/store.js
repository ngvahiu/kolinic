import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth.slice';
import userReducer from './user.slice';
import serviceReducer from './service.slice';
import doctorReducer from './doctor.slice';
import departmentReducer from './department.slice';
import blogReducer from './blog.slice';
import drugReducer from './drug.slice';
import cartReducer from './cart.slice';
import appointmentReducer from './appointment.slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        service: serviceReducer,
        doctor: doctorReducer,
        department: departmentReducer,
        blog: blogReducer,
        drug: drugReducer,
        cart: cartReducer,
        appointment: appointmentReducer
    }
});

export default store;
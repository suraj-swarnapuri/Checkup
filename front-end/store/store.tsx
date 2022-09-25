import patientsSlice from '../slice/patientsSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        checkupStates: patientsSlice.reducer
    }
});

export default store;
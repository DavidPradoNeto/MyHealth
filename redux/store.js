import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import vacinaSlice from "./vacinaSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        vacina: vacinaSlice
    }
})
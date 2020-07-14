import { combineReducers, createStore } from "redux";
import {goodsReducer} from "../reducers/goodsReducer";

const rootReducers = combineReducers({
    goodsReducer
});

export type AppRootState = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers);
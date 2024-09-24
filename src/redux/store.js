// redux/store/store.tsx
import { createStore, combineReducers } from "redux";
// import ReducersPlanobus from "./reducers/index";
import ReducersPlanobus from "./reducers/index.js"

const store = createStore(ReducersPlanobus);

export default store;

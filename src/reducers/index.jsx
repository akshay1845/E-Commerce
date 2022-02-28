import { combineReducers } from "redux";
import CardItems from "./reducer";
import API_Data from './api_reducer'
import AddSale from './sale_reducer'

export default combineReducers({
    CardItems,
    API_Data,
    AddSale
});
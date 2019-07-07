import { combineReducers } from 'redux';
const todoReducer =(state=0,action)=>
{
    return state;
};
const hhReducer = (state=2,action) =>
{
    return state;
}
export default combineReducers({todoReducer,hhReducer});
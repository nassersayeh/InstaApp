import {TYPES} from '../actions/authAction'
const initialState ={}
const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case
         TYPES.auth:
            return action.payload;
            default:
                return state
    }
}
export default authReducer
import * as type from '../types'; 

const initialState = {
    characteres: [],
    loading: false,
    error: null,
}

export default function characteres(state = initialState, action){
    switch(action.type){
        case type.GET_CHARACTERES_RESQUESTED: 
            return{
                ...state, 
                loading: true,
            }
        case type.GET_CHARACTERES_SUCCESS: 
            return{
                ...state, 
                loading: false,
                characteres: action.characteres,
            }
        case type.GET_CHARACTERES_FAILED: 
            return{
                ...state, 
                loading: false, 
                error: action.message
            }
        default: 
        return state; 
    }
}
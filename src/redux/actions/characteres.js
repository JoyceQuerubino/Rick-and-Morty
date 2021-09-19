import * as type from '../types'; 

export function getCharacteres(characteres){
    return {
        type: type.GET_CHARACTERES_RESQUESTED, 
        payload: characteres
    }
}
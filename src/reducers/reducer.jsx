import { products } from '../Pages/dashboard/Data'
const intialState = {
    cardData : products,
}
const CardItems = (state = intialState, action) =>{
    switch(action.type){
        
        case "ADD_TO_CART" :
            const d = state.cardData.findIndex((e) => e.id == action.payload)
            state.cardData[d].qty += 1
            
            return {
                ...state,
            }

        case "REMOVE_TO_CART":    
            const d1 = state.cardData.findIndex((e) => e.id == action.payload)
            state.cardData[d1].qty -= 1

            return {
                ...state,
            }
            
        default:
            return  state
    }
}

export default CardItems    
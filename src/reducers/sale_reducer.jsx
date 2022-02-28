const intialSale = {
    addsale : []
}
const AddSale = (state = intialSale, action) =>{
    switch(action.type){
        case "ADD_SALE":
            return {
                ...state,
                addsale:[...state.addsale, action.payload]
            }
        default:
            return  state
    }
}

export default AddSale    
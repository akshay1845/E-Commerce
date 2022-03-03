const intialSale = {
    addsale : []
}
const AddSale = (state = intialSale, action) =>{
    switch(action.type){

        case "ADD_SALE":
            console.log(action.payload)
            return {
                ...state,
                addsale:[...state.addsale, action.payload]
            }
        case "REMOVE_SALE":
            
            const index = state.addsale.findIndex((e) => JSON.stringify(e) === JSON.stringify(action.payload))
            console.log(index)
            state.addsale.splice(index,1)
            console.log(state.addsale)
            return {
                addsale : [...state.addsale]
            }

        default:
            return  state
    }
}

export default AddSale    
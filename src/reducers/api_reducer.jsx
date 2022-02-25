const Apidata = []

const API_Data = (state = Apidata , action) =>{
    switch(action.type){
        
        
        case "FETCH_API_DATA" :
            return [...action.payload]
        default :
            return state
    }
}

export default API_Data
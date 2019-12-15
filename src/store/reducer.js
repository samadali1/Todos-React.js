const reducer = (state = {}, action) => {
    switch(action.type) {
        case "SET_TODO": {
            return {...state, todos: action.data}
        }
        case "CHECK_TODO": {
            return {...state, todos: action.data}
        }
        default: {
            return state;
        }
    }
}

export default reducer;
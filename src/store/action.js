const add_todo = (todo) => {
    return {
        type: "SET_TODO",
        data: todo
    }
}

const update_todo = (todo) => {
    return {
        type: "UPDATE_TODO",
        data: todo
    }
}


export {
    add_todo,
    update_todo,
}
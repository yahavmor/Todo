import { todoService } from "../services/todo.service.js"
import { SET_LOADING, store ,SET_TODOS,REMOVE_TODO } from "./store.js"

export function loadTodos(filterBy){
      store.dispatch({ type: SET_LOADING, isLoading: true })
      return todoService.query(filterBy)
            .then(todos => store.dispatch({ type: SET_TODOS, todos }))
            .catch(err => {
                console.error('err:', err)
                throw err
            })
            .finally(() => store.dispatch({ type: SET_LOADING, isLoading: false }))
}
export function removeTodo(todoId) {
      return todoService.remove(todoId)
            .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
            .catch(err => {
                console.error('err:', err)
                throw err
            })
}
export function setLoading(isLoading) {
      return store.dispatch({ type: SET_LOADING, isLoading })     
}

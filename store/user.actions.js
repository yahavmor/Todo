import { userService } from "../services/user.service.js"
import { store } from "./store.js"


export function login(credentials){
      return userService.login(credentials)
      .then(user => {
            store.dispatch({ type: 'SET_USER', user })
            return user
      })
      .catch(err => {
            console.error('err:', err)
            throw err
      })
}
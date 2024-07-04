import { PropsWithChildren, createContext, useContext, useState } from "react";

const STORAGE_KEY = {
  "token": "token"
}

const initial = {
  profile: {},
  users: {},
  token: localStorage.getItem(STORAGE_KEY.token) || null
}

const store = createContext<any>(initial)

export function StoreProvider({ children }: PropsWithChildren){
  const [state, setState ] = useState(initial)

  function set(key: string, value: any){
    setState(s => ({
      ...s, 
      [key]: Array.isArray(value) ? value : Array.isArray(s[key]) ? [...s[key], value] : {...s[key], ...value}
    }))
  }

  function setToken(token: string){
    if(token === null){
      localStorage.removeItem(STORAGE_KEY.token)
    }
    else localStorage.setItem(STORAGE_KEY.token, token)
    setState(s => ({ ...s, token }))
  }
  
  return(
    <store.Provider value={{...state, set, setToken}}>{ children }</store.Provider>
  )
}

export const useStore = () => useContext(store)
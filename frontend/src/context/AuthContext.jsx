import { createContext, useState, useContext } from "react";

const authContext = createContext()
 
export const AuthProvider = ({children}) =>{

    const [token, setToken] = useState(null)

    const login = (token) => {
        setToken(token)
    }

    const logout = () => {
        setToken(null)
    }

    const isAuthenticated = () => {
        return token !== null
    }

    return (
        <authContext.Provider value={{login, logout, isAuthenticated}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () =>{
    const context  = useContext(authContext)

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
import { createContext, useState, useContext, useEffect } from "react";

const authContext = createContext()
 
export const AuthProvider = ({children}) =>{

    const [token, setToken] = useState(()=>{
        return sessionStorage.getItem("token") || null 
    })

    useEffect(()=>{
        const localToken = sessionStorage.getItem("token")
        if(localToken){
            setToken(localToken)
        }
    },[])

    const login = (token) => {
        sessionStorage.setItem("token", token)
        setToken(token)
    }

    const logout = () => {
        sessionStorage.removeItem("token")
        setToken(null)
    }

    return (
        <authContext.Provider value={{login, logout, token}}>
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
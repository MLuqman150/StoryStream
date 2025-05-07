import { createContext, useState, useContext, useEffect } from "react";

const authContext = createContext()
 
export const AuthProvider = ({children}) =>{

    const [token, setToken] = useState(()=>{
        return sessionStorage.getItem("token") || null 
    })

    const [userEmail, setUserEmail] = useState(() => {
        return sessionStorage.getItem("userEmail") || null
    })

    const [userId, setUserId] = useState(() => {
        return sessionStorage.getItem("userId") || null
    })

    useEffect(()=>{
        const localUserEmail = sessionStorage.getItem("userEmail")
        const localUserId = sessionStorage.getItem("userid")
        const localToken = sessionStorage.getItem("token")
        if(localToken && localUserEmail && localUserId){
            setToken(localToken)
            setUserEmail(localUserEmail)
            setUserId(localUserId)
        }
    },[])

    const login = (token, userEmail, userId) => {
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("userEmail", userEmail)
        sessionStorage.setItem("userId", userId)
        setUserEmail(userEmail)
        setUserId(userId)
        setToken(token)
    }

    const logout = () => {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("userEmail")
        sessionStorage.removeItem("userId")
        setUserEmail(null)
        setUserId(null)
        setToken(null)
    }

    return (
        <authContext.Provider value={{login, logout, token, userEmail, userId}}>
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
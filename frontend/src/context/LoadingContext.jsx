import { createContext, useContext, useState } from "react";

const loadingContext = createContext()

export const LoadingProvider = ({children}) =>{
    const [loading, setLoading] = useState(false)
    const showLoading = () => setLoading(true);
    const hideLoading = () => setLoading(false);
    return (
        <loadingContext.Provider value={{loading, showLoading, hideLoading}}>
            {children}
        </loadingContext.Provider>
    )
}

export const useLoading = () =>{
    const loader = useContext(loadingContext)
    if(!loader){
        throw new Error("useLoading must be used within a LoadingProvider")
    } 
    return loader
}
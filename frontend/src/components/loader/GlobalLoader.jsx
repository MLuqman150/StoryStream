import React from 'react'
import { useLoading } from '../../context/LoadingContext'
import Loader from './Loader.jsx'

const GlobalLoader = () =>{
    const {loading} = useLoading()

    return (
        <>
            {loading && <Loader />}
        </>
    )
}

export default GlobalLoader

import React from 'react';
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'

// Default values shown


const Loader = () => {
    return (
        <>
            <div className='min-h-screen flex justify-center items-center'>
              {/*  <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500'></div> */}
                <Ring
                    size="40"
                    stroke="5"
                    bgOpacity="0"
                    speed="2"
                    color="black" 
                />
            </div>
        </>
    )
}

export default Loader
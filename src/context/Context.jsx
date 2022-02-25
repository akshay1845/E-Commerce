import React, { createContext, useState } from 'react'

export const Logincontext = createContext(null);

const Context = ({ children }) => {

    const [account, setAccount] = useState("");
    
    return (
        <>
            <Logincontext.Provider value={{ account, setAccount }}>
                {children}
            </Logincontext.Provider>
        </>
    )
}

export default Context
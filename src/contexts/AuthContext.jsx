import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
    const [config, setConfig] = useState(localStorage.getItem("userId"));

    return (
        <AuthContext.Provider value={{ config, setConfig }}>
            {props.children}
        </AuthContext.Provider>
    )
}
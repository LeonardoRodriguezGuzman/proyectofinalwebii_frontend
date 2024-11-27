import React, {createContext, useState, useEffect, useContext} from 'react';

const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    login: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {

        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
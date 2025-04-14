import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('authUser');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    const login = (username, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const matchedUser = storedUsers.find(
            (u) => u.username === username && u.password === password
        );

        if (matchedUser) {
            localStorage.setItem('authUser', JSON.stringify(matchedUser));
            setUser(matchedUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('authUser');
        setUser(null);
    };

    const value = { user, login, logout, setUser };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

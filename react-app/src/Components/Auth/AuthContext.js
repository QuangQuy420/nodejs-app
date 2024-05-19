import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

/**
 * Create context to check login of a user.
 * 
 * @param {*} { children } - Children component.
 */
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
          setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
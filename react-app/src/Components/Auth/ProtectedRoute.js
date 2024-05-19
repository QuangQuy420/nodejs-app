import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

/**
 * Check login of a user.
 * 
 * @param {*} { children } - Children component.
 * @returns - Navigate to home page if doesn't login.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log('isAuthenticated', isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
        return navigate('/auth/login');
      }
  }, []);
  
  return children;
};

export default ProtectedRoute;
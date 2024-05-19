import { useForm } from 'react-hook-form';
import axiosInstance from '../Axios/axiosInstance';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Components/Auth/AuthContext';

/**
 * Login component.
 */
const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorLogin, setErrorLogin] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check authenticate and return home page if logged in.
  useEffect(() => {
    if (isAuthenticated) {
        return navigate('/');
      }
  }, [isAuthenticated]);

  /**
   * Call api and handle login.
   * 
   * @param {*} data - { email, password }.
   */
  const onSubmit = async (data) => {
    try {
      setErrorLogin('');
      const response = await axiosInstance.post('/auth/login', data);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('Login successful:', response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrorLogin(error.response.data.error);
      console.error('Login error:', error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email or Phone Number
            </label>
            <input
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type='password'
              {...register('password', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          <div>
            {errorLogin && <p className="text-red-500 text-xs italic">{errorLogin}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
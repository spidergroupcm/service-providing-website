import { Link, useLocation, useNavigate } from 'react-router-dom';
import bgImg from '../../assets/login/login.png';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaGoogle } from "react-icons/fa";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';
  const { signIn, signInWithGoogle } = useContext(AuthContext);

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        title: 'Signin Successful',
        text: 'Welcome back!',
        icon: 'success',
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error',
        text: err?.message || 'Signin failed',
        icon: 'error',
      });
    }
  };

  // Email Password Signin
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;

    try {
      await signIn(email, pass);
      Swal.fire({
        title: 'Signin Successful',
        text: 'Welcome back!',
        icon: 'success',
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error',
        text: err?.message || 'Signin failed',
        icon: 'error',
      });
    }
  };

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-12'>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl'>
        <div
          className='hidden bg-cover bg-center lg:block lg:w-1/2'
          style={{ backgroundImage: `url(${bgImg})` }}
        ></div>

        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
          <p className='mt-3 text-xl text-center text-gray-600'>
            Welcome, Signin Now
          </p>

          <div
            onClick={handleGoogleSignIn}
            className='flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50'
          >
          
            <FaGoogle className='w-5 h-5' />
           
            
            <span className='w-5/6 px-4 py-3 font-bold text-center'>
              Sign in with Google
            </span>
          </div>

          <form onSubmit={handleSignIn} className='text-left'>
            <div className='mt-4 '>
              <label className='block mb-2 text-sm font-medium text-gray-600'>
                Email Address
              </label>
              <input
                autoComplete='email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>

            <div className='mt-4'>
              <label className='block mb-2 text-sm font-medium text-gray-600'>
                Password
              </label>
              <input
                autoComplete='current-password'
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />
            </div>

            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700'
              >
                Sign In
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <Link to='/registration' className='text-xs text-gray-500 uppercase hover:underline'>
              New here? <span className='text-red-500 font-bold'>Register now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



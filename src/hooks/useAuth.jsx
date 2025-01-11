import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

// Custom hook to access authentication context
const useAuth = () => {
  const { user } = useContext(AuthContext); // Destructure user from auth context
  return { user };
};

export default useAuth;







// import { useContext } from 'react';
// import { AuthContext } from '../provider/AuthProvider';

// // Custom hook to access authentication context
// const useAuth = () => {
//   const auth = useContext(AuthContext);
//   return auth;
// };

// // Default export
// export default useAuth;






// import { useContext } from 'react'
// import { AuthContext } from '../provider/AuthProvider'


// const useAuth = () => {
//   const auth = useContext(AuthContext)
//   return auth
// }
// export default useAuth

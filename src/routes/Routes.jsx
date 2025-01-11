import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AddService from "../pages/AddService";
import ManageService from "../pages/ManageService";
import BookedServices from "../pages/BookedServices";
import ServiceToDo from "../pages/ServiceToDo";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import DynamicTitle from "../components/DynamicTitle";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from "./PrivateRoute";

// Loader for ManageService to fetch user-specific services
const manageServiceLoader = async () => {
  const auth = getAuth();
  
  // Wait for user state to be set
  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => resolve(user));
  });

  if (user) {
    const res = await fetch(`https://fasthelpbd-server-side.vercel.app/dashboard/manage-service?email=${user.email}`);
    return res.json();
  } else {
    return [];
  }
};

// Loader for BookedServices to fetch bookings for the logged-in user
const BookedServicesLoader = async () => {
  const auth = getAuth();
  
  const user = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => resolve(user));
  });

  if (user?.email) {
    const response = await fetch(`https://fasthelpbd-server-side.vercel.app/bookings?email=${user.email}`);
    return response.json();
  } else {
    return [];
  }
};

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <DynamicTitle />
        <Main />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("https://fasthelpbd-server-side.vercel.app/service").then(res => res.json()),
      },
      {
        path: '/services',
        element: <Services />,
        loader: () => fetch("https://fasthelpbd-server-side.vercel.app/service"),
      },
      {
        path: "/service-details/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />,
          </PrivateRoute>
        ) ,
        loader: ({ params }) => fetch(`https://fasthelpbd-server-side.vercel.app/service/${params.id}`),
      },
      {
        path: '/dashboard/add-service',
        element:(
          <PrivateRoute>
             <AddService />
          </PrivateRoute>
        )
      },
      {
        path: '/dashboard/manage-service',
        element: (
          <PrivateRoute>
            <ManageService />
          </PrivateRoute>
        ),
        loader: manageServiceLoader,
      },
      {
        path: '/dashboard/booked-services',
        element: (
          <PrivateRoute>
            <BookedServices />
          </PrivateRoute>
        ),
        loader: BookedServicesLoader,
      },
      {
        path: '/dashboard/service-to-do',
        element: (
          <PrivateRoute>
            <ServiceToDo />
          </PrivateRoute>
        )
        
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/registration',
        element: <Register />,
      },
    ]
  },
]);

export default router;



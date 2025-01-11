
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const BookedServices = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchBookings(currentUser.email);
      } else {
        setUser(null);
        setBookings([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchBookings = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(`https://fasthelpbd-server-side.vercel.app/bookings?email=${email}`);
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Booked Services</h1>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookings.map(({ _id, serviceName, serviceImage, providerName, serviceTakingDate, specialInstructions, price, serviceStatus }) => (
            <div key={_id} className="border p-4 rounded-lg shadow-md bg-white">
              <img src={serviceImage} alt={serviceName} className="w-full h-40 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold mb-2">{serviceName}</h2>
              <p><strong>Provider:</strong> {providerName}</p>
              <p><strong>Service Date:</strong> {new Date(serviceTakingDate).toLocaleDateString()}</p>
              <p><strong>Price:</strong> ${price}</p>
              <p><strong>Instructions:</strong> {specialInstructions}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded ${serviceStatus === 'pending' ? 'bg-yellow-200' : 'bg-green-200'}`}>
                  {serviceStatus}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No bookings found. Please book a service.</p>
      )}
    </div>
  );
};

export default BookedServices;



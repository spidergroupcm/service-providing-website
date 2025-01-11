import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ServiceToDo = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchServices(currentUser.email);
      } else {
        setUser(null);
        setServices([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchServices = async (email) => {
    setLoading(true);
    try {
      const response = await fetch(`https://fasthelpbd-server-side.vercel.app/bookings?email=${email}`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`https://fasthelpbd-server-side.vercel.app/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceStatus: newStatus }),
      });

      if (response.ok) {
        setServices((prevServices) =>
          prevServices.map((service) =>
            service._id === id ? { ...service, serviceStatus: newStatus } : service
          )
        );
        alert('Status updated successfully.');
      } else {
        const data = await response.json();
        alert(`Failed to update status: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Services To Do</h1>

      {loading ? (
        <p className="text-center">Loading services...</p>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const {
              _id,
              serviceName,
              serviceImage,
              price,
              providerName,
              providerEmail,
              specialInstructions,
              serviceTakingDate,
              serviceStatus,
            } = service;

            const fallbackImage = 'https://via.placeholder.com/150';

            return (
              <div key={_id} className="border p-4 rounded-lg shadow-md bg-white">
                <img
                  src={serviceImage}
                  alt={serviceName}
                  onError={(e) => (e.target.src = fallbackImage)}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{serviceName}</h2>
                <p><strong>Provider:</strong> {providerName} ({providerEmail})</p>
                <p><strong>Price:</strong> ${price}</p>
                <p><strong>Date:</strong> {new Date(serviceTakingDate).toLocaleDateString()}</p>
                <p><strong>Instructions:</strong> {specialInstructions}</p>
                <p><strong>Status:</strong> 
                  <select
                    value={serviceStatus}
                    onChange={(e) => handleStatusChange(_id, e.target.value)}
                    className="ml-2 p-1 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="working">Working</option>
                    <option value="completed">Completed</option>
                  </select>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center">No services found. Please add services.</p>
      )}
    </div>
  );
};

export default ServiceToDo;




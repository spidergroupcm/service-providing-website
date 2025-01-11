
import { useLoaderData } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import { useState, useEffect } from 'react';

const ManageService = () => {
  const loadedServices = useLoaderData();
  const [services, setServices] = useState(loadedServices);
  const [loading, setLoading] = useState(false);

  // Fetch services on component mount
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://fasthelpbd-server-side.vercel.app/services'); // Adjust API path if necessary
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);  // Refetch data on mount

  // Function to handle service deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://fasthelpbd-server-side.vercel.app/service/${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();

        if (response.ok) {
          const remainingServices = services.filter(service => service._id !== id);
          setServices(remainingServices);
          alert('Service deleted successfully!');
        } else {
          console.error(result.message);
          alert('Failed to delete the service.');
        }
      } catch (error) {
        console.error("Error deleting service:", error);
        alert('An error occurred while trying to delete the service.');
      }
    }
  };

  // Function to handle service update
  const handleUpdate = async (updatedService) => {
    const { _id, ...updatedData } = updatedService;  // Exclude _id from update payload

    try {
      const response = await fetch(`https://fasthelpbd-server-side.vercel.app/service/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();

      if (response.ok) {
        const updatedServices = services.map(service =>
          service._id === _id ? result : service
        );
        setServices(updatedServices);
        alert('Service updated successfully!');
      } else {
        console.error(result.message);
        alert('Failed to update the service.');
      }
    } catch (error) {
      console.error("Error updating service:", error);
      alert('An error occurred while trying to update the service.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Manage Your Services</h1>

      {loading ? (
        <p className="text-center">Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              isManagePage={true}
              onDelete={() => handleDelete(service._id)}
              onEdit={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageService;


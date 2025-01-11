import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ServiceDetails = () => {
  const service = useLoaderData();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    console.log('Modal State:', isModalOpen);
  }, [isModalOpen]);

  if (!service) {
    return <p className="text-gray-700 text-center">Loading service details...</p>;
  }

  const { _id, photo, title, price, serviceArea, description, userName, userPhoto, userEmail } = service;

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in first');
      return;
    }

    const bookingDetails = {
      serviceId: _id,
      serviceName: title,
      serviceImage: photo,
      providerEmail: userEmail,
      providerName: userName,
      userEmail: user.email,
      userName: user.displayName || 'Anonymous',
      serviceTakingDate: bookingDate,
      specialInstructions,
      price,
      serviceStatus: 'pending',
    };

    try {
      const response = await fetch('https://fasthelpbd-server-side.vercel.app/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails),
      });

      if (response.ok) {
        alert('Booking successful!');
        setIsModalOpen(false);
      } else {
        alert('Failed to book service.');
      }
    } catch (error) {
      console.error('Error booking service:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{title || 'Untitled Service'}</h1>
          <img
            className="w-full rounded-lg shadow-lg"
            src={photo}
            alt={title || 'Service Image'}
          />
        </div>
        {/* Right side: Details */}
        <div>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Price:</strong> ${price || 'N/A'}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong>Service Area:</strong> {serviceArea || 'N/A'}
          </p>
          <p className="text-gray-700 text-lg mb-4">{description || 'No description available.'}</p>
          <div className="flex items-center mb-6 bg-white p-4 rounded-lg shadow-md">
            <img
              src={userPhoto}
              alt={userName || 'User Photo'}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-semibold">{userName || 'Anonymous User'}</p>
              <p className="text-gray-500">Service Provider</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-md transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <input
                  type="text"
                  value={_id}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  value={title}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-semibold">Provider Name:</label>
                <input
                  type="text"
                  value={userName}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-semibold">Your Email:</label>
                <input
                  type="text"
                  value={user ? user.email : ''}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-semibold">Service Taking Date:</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-semibold">Price:</label>
                <input
                  type="text"
                  value={price}
                  readOnly
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold">Special Instructions:</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter any special instructions"
                ></textarea>
              </div>
              <button
                type="submit"
                className="col-span-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Purchase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UpdateModal from '../components/UpdateModal';

const ServiceCard = ({ service, isManagePage, onDelete, onEdit }) => {
  const { _id, photo, title, price, serviceArea, userName, userEmail, userPhoto } = service;
  const navigate = useNavigate();

  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleUpdate = (updatedService) => {
    // Call the parent component's onEdit function with the updated service
    onEdit(updatedService);
    setShowModal(false); // Close modal after update
    navigate('/services'); // Redirect to /services after update
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl">
      <img className="h-64 w-full object-cover" src={photo} alt={title} />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-blue-500">${price}</p>
        <p>{serviceArea}</p>

        <div className="flex items-center mt-4">
          <img src={userPhoto} alt="User" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="text-gray-700">{userName}</p>
            <p className="text-sm text-gray-500">{userEmail}</p>
          </div>
        </div>

        <div className="mt-4">
          {isManagePage ? (
            <div className="flex justify-between">
              <button onClick={handleEdit} className="btn btn-warning">Edit</button>
              <button onClick={onDelete} className="btn btn-danger">Delete</button>
            </div>
          ) : (
            <Link to={`/service-details/${_id}`} className="btn btn-primary w-full">View Details</Link>
          )}
        </div>
      </div>

      {/* Update Modal */}
      {showModal && (
        <UpdateModal
          service={service}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ServiceCard;





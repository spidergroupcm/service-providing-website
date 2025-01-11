import { useState } from 'react';

const UpdateModal = ({ service, onClose, onUpdate }) => {
  const [updatedService, setUpdatedService] = useState(service);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService({ ...updatedService, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedService);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl mb-4">Edit Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={updatedService.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={updatedService.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Service Area</label>
            <input
              type="text"
              name="serviceArea"
              value={updatedService.serviceArea}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">description</label>
            <input
              type="text"
              name="description"
              value={updatedService.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>



          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;




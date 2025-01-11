import { getAuth } from 'firebase/auth';
import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleAddService = async (e) => {
    e.preventDefault();

    const form = e.target;
    const photo = form.photo.value;
    const title = form.title.value;
    const price = form.price.value;
    const serviceArea = form.serviceArea.value;
    const description = form.description.value;

    const newService = {
      photo,
      title,
      price,
      serviceArea,
      description,
      userEmail: currentUser.email,
      userName: currentUser.displayName,
      userPhoto: currentUser.photoURL || '/default-avatar.png',
    };

    try {
      const response = await fetch('https://fasthelpbd-server-side.vercel.app/dashboard/add-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        throw new Error('Failed to add service.');
      }

      const data = await response.json();
      if (data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Service added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          form.reset();
          navigate('/services');
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Something went wrong.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-3">
      <form
        className="bg-gray-400 p-5 mb-5 rounded-lg shadow-2xl w-full max-w-lg space-y-6"
        onSubmit={handleAddService}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600">Add New Service</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Service Photo URL</label>
            <input
              type="text"
              name="photo"
              required
              className="input input-bordered w-full mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Service Title</label>
            <input
              type="text"
              name="title"
              required
              className="input input-bordered w-full mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter service title"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              required
              className="input input-bordered w-full mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Service Area</label>
            <select
              name="serviceArea"
              required
              className="select select-bordered w-full mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            >
                <option value="Dhaka">Dhaka</option>
              <option value="Gulshan">Gulshan</option>
              <option value="Banani">Banani</option>
              <option value="Uttara">Uttara</option>
              <option value="Dhanmondi">Dhanmondi</option>
              <option value="Mirpur">Mirpur</option>
              <option value="Badda">Badda</option>
              <option value="Mohakhali">Mohakhali</option>
              <option value="Tejgaon">Tejgaon</option>
              <option value="Baridhara">Baridhara</option>
              <option value="Pallabi">Pallabi</option>
              <option value="Rampura">Rampura</option>
              <option value="Shantinagar">Shantinagar</option>
              <option value="Motijheel">Motijheel</option>
              <option value="Farmgate">Farmgate</option>
              <option value="Wari">Wari</option>
              <option value="Khilgaon">Khilgaon</option>
              <option value="Shyamoli">Shyamoli</option>
              <option value="Azimpur">Azimpur</option>
              <option value="Old Dhaka">Old Dhaka</option>
              <option value="Lalbagh">Lalbagh</option>
              <option value="Jatrabari">Jatrabari</option>
              <option value="Savar">Savar</option>
              <option value="Keraniganj">Keraniganj</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            required
            className="textarea textarea-bordered w-full mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter service description"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium shadow-lg transform transition-transform hover:scale-105"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;


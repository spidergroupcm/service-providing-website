import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const services = useLoaderData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const filteredServices = services
    .filter((service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'ascending') {
        return a.price - b.price;
      } else if (sortOrder === 'descending') {
        return b.price - a.price;
      }
      return 0; // No sorting for 'default'
    });

  return (
    <div className="container mx-auto px-4 bg-white">
      <h1 className="text-3xl font-bold text-center my-6">All Services</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full max-w-xs mr-5"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort by Price</option>
          <option value="ascending">Price: Low to High</option>
          <option value="descending">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;




import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import ServiceCard from '../pages/ServiceCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import banner1 from '../assets/banner/1.png';
import banner2 from '../assets/banner/2.png';
import banner3 from '../assets/banner/3.png';

const Home = () => {
  const services = useLoaderData(); // Loader fetches all services
  const navigate = useNavigate();

  // Randomly selecting 6 services
  const randomServices = services
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Easing function
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="rounded-lg shadow-lg">
      {/* Carousel Section */}
      <div className="relative w-full  overflow-hidden bg-yellow-300">
        <div className="carousel flex transition-transform duration-500">
          <div className="carousel-item w-full">
            <img src={banner1} alt="Banner 1" className="w-full h-[480px] object-cover" />
          </div>
          <div className="carousel-item w-full">
            <img src={banner2} alt="Banner 2" className="w-full h-[480px] object-cover" />
          </div>
          <div className="carousel-item w-full">
            <img src={banner3} alt="Banner 3" className="w-full h-[480px] object-cover" />
          </div>
        </div>
        <button
          className="absolute top-1/2 -translate-y-1/2 left-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
          onClick={() => {
            const carousel = document.querySelector('.carousel');
            carousel.scrollBy({
              left: -carousel.offsetWidth,
              behavior: 'smooth',
            });
          }}
        >
          ❮
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
          onClick={() => {
            const carousel = document.querySelector('.carousel');
            carousel.scrollBy({
              left: carousel.offsetWidth,
              behavior: 'smooth',
            });
          }}
        >
          ❯
        </button>
      </div>

      {/* Featured Services Section */}
      <h1 className="text-4xl font-bold text-center mt-3 mb-3">
      Our Top Featured Services
      </h1>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4" data-aos="fade-up">
        {randomServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
      <div className="flex justify-center mt-8" data-aos="zoom-in">
        <button
          onClick={() => navigate('/services')}
          className="w-auto bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-700"
        >
          See All Services
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-12 mt-12" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-left">
            <p className="italic text-gray-600">
              "The services provided were exceptional and exceeded my expectations!"
            </p>
            <div className="mt-4 flex items-center">
              <img
                src="https://i.ibb.co/DYjcyZ1/p1.png"
                alt="User"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-bold text-gray-800">John Doe</p>
                <p className="text-sm text-gray-500">Entrepreneur</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-right">
            <p className="italic text-gray-600">
              "Highly recommend! Professional and reliable services every time."
            </p>
            <div className="mt-4 flex items-center">
              <img
                src="https://i.ibb.co/8Kg7TW8/p2.png"
                alt="User"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="font-bold text-gray-800">Maria Akter</p>
                <p className="text-sm text-gray-500">Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="bg-blue-500 py-12 mt-12 mb-5 text-white" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="font-bold text-xl mb-2">Top-Rated Services</h3>
            <p>We consistently receive top ratings from our customers for quality and reliability.</p>
          </div>
          <div className="text-center" data-aos="fade-up" data-aos-delay="200">
            <div className="text-4xl mb-2">⏱</div>
            <h3 className="font-bold text-xl mb-2">Quick Response</h3>
            <p>Our team ensures prompt responses and swift resolution to your service needs.</p>
          </div>
          <div className="text-center" data-aos="fade-up" data-aos-delay="300">
            <div className="text-4xl mb-2">💼</div>
            <h3 className="font-bold text-xl mb-2">Professional Team</h3>
            <p>Our experienced professionals are dedicated to delivering excellence in every service.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLoaderData } from 'react-router-dom';
// import ServiceCard from '../pages/ServiceCard';
// import AOS from 'aos';
// import 'aos/dist/aos.css'; 
// import banner1 from '../assets/banner/1.png';
// import banner2 from '../assets/banner/2.png';
// import banner3 from '../assets/banner/3.png';

// const Home = () => {
//   const services = useLoaderData(); // Loader fetches all services
//   const navigate = useNavigate();

//   // Randomly selecting 6 services
//   const randomServices = services
//     .sort(() => 0.5 - Math.random())
//     .slice(0, 6);

//   useEffect(() => {
//     AOS.init({
//       duration: 1000, // Animation duration in milliseconds
//       easing: 'ease-in-out', // Easing function
//       once: true, // Whether animation should happen only once
//     });
//   }, []);

//   return (
//     <div className="rounded-lg shadow-lg">
//       {/* Carousel Section */}
//       <div className='z-10'>
//       <img src={banner1} alt="Banner 1" className="w-full h-auto" />
//       <img src={banner2} alt="Banner 2" className="w-full h-auto" />
//       <img src={banner3} alt="Banner 3" className="w-full h-auto" />
//       </div>

//       {/* Featured Services Section */}
//       <h1
//         className="text-3xl font-bold text-center mt-3 mb-3"
//         data-aos="fade-up"
//       >
//         Featured Services
//       </h1>
//       <div
//         className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-4"
//         data-aos="fade-up"
//       >
//         {randomServices.map((service) => (
//           <ServiceCard key={service._id} service={service} />
//         ))}
//       </div>
//       <div
//         className="flex justify-center mt-8"
//         data-aos="zoom-in"
//       >
//         <button
//           onClick={() => navigate('/services')}
//           className="w-auto bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-700"
//         >
//           See All Services
//         </button>
//       </div>

//       {/* New Section: Testimonials */}
//       <div className="bg-gray-100 py-12 mt-12" data-aos="fade-up">
//         <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
//           <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-left">
//             <p className="italic text-gray-600">
//               "The services provided were exceptional and exceeded my expectations!"
//             </p>
//             <div className="mt-4 flex items-center">
//               <img
//                 src="https://i.ibb.co.com/DYjcyZ1/p1.png"
//                 alt="User"
//                 className="w-12 h-12 rounded-full mr-3"
//               />
//               <div>
//                 <p className="font-bold text-gray-800">John Doe</p>
//                 <p className="text-sm text-gray-500">Entrepreneur</p>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md" data-aos="flip-right">
//             <p className="italic text-gray-600">
//               "Highly recommend! Professional and reliable services every time."
//             </p>
//             <div className="mt-4 flex items-center">
//               <img
//                 src="https://i.ibb.co.com/8Kg7TW8/p2.png"
//                 alt="User"
//                 className="w-12 h-12 rounded-full mr-3"
//               />
//               <div>
//                 <p className="font-bold text-gray-800">Maria Akter</p>
//                 <p className="text-sm text-gray-500">Designer</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* New Section: Our Highlights */}
//       <div className="bg-blue-500 py-12 mt-12 text-white" data-aos="fade-up">
//         <h2 className="text-2xl font-bold text-center mb-8">Why Choose Us?</h2>
//         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
//           <div className="text-center" data-aos="fade-up" data-aos-delay="100">
//             <div className="text-4xl mb-2">⭐</div>
//             <h3 className="font-bold text-xl mb-2">Top-Rated Services</h3>
//             <p>
//               We consistently receive top ratings from our customers for quality and reliability.
//             </p>
//           </div>
//           <div className="text-center" data-aos="fade-up" data-aos-delay="200">
//             <div className="text-4xl mb-2">⏱</div>
//             <h3 className="font-bold text-xl mb-2">Quick Response</h3>
//             <p>
//               Our team ensures prompt responses and swift resolution to your service needs.
//             </p>
//           </div>
//           <div className="text-center" data-aos="fade-up" data-aos-delay="300">
//             <div className="text-4xl mb-2">💼</div>
//             <h3 className="font-bold text-xl mb-2">Professional Team</h3>
//             <p>
//               Our experienced professionals are dedicated to delivering excellence in every service.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



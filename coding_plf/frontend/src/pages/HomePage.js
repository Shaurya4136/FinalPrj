import React, { useState, useRef, useEffect } from 'react';

const HomePage = () => {
  const eventsRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let scrollInterval;

    if (!isHovered) {
      scrollInterval = setInterval(() => {
        if (eventsRef.current) {
          eventsRef.current.scrollLeft += 2;
          
          // Reset scroll when reaching the end
          if (eventsRef.current.scrollLeft >= eventsRef.current.scrollWidth / 2) {
            eventsRef.current.scrollLeft = 0;  // Jump back to the start
          }
        }
      }, 30);  // Adjust the speed as needed
    }

    return () => clearInterval(scrollInterval);  // Cleanup on component unmount
  }, [isHovered]);

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Upcoming Events</h2>
        <div
          ref={eventsRef}
          className="flex space-x-8 overflow-x-auto scrollbar-hide"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ whiteSpace: 'nowrap' }}  // Keep items in a row
        >
          {/* Original Event List */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="min-w-[300px] relative bg-black p-6 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  index % 3 === 0
                    ? 'from-indigo-600 via-purple-600 to-pink-500'
                    : index % 3 === 1
                    ? 'from-teal-500 via-green-600 to-blue-500'
                    : 'from-yellow-500 via-orange-600 to-red-500'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative z-10 p-6">
                <h3 className="text-2xl font-bold mb-2 transition-transform duration-300 transform group-hover:scale-110">
                  Event Name {index + 1}
                </h3>
                <p className="text-gray-300 mb-2">Date: Date {index + 1}</p>
                <p className="text-gray-300 mb-2">Location: Location {index + 1}</p>
                <p className="text-gray-400 mb-4">
                  A brief description of the event. This can include the purpose, activities, and any other relevant details.
                </p>
                <a
                  href="#"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-110"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}

          {/* Duplicate Event List for Looping */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="min-w-[300px] relative bg-black p-6 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  index % 3 === 0
                    ? 'from-indigo-600 via-purple-600 to-pink-500'
                    : index % 3 === 1
                    ? 'from-teal-500 via-green-600 to-blue-500'
                    : 'from-yellow-500 via-orange-600 to-red-500'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
              <div className="relative z-10 p-6">
                <h3 className="text-2xl font-bold mb-2 transition-transform duration-300 transform group-hover:scale-110">
                  Event Name {index + 1}
                </h3>
                <p className="text-gray-300 mb-2">Date: Date {index + 1}</p>
                <p className="text-gray-300 mb-2">Location: Location {index + 1}</p>
                <p className="text-gray-400 mb-4">
                  A brief description of the event. This can include the purpose, activities, and any other relevant details.
                </p>
                <a
                  href="#"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-110"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;

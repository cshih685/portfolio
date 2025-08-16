'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const PhotoAlbum = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // 6 photos from my life
  const photos = [
    {
      id: 1,
      src: '/images/MySelf.JPG',
      alt: 'Photo taken by my wife in New York',
      caption: 'New York Subway - 2024'
      
    },
    {
      id: 2,
      src: '/images/Lovely_Wife.JPG',
      alt: 'Schwerin Castle - A day trip to Schwerin after our wedding',
      caption: 'Schwerin Castle with My Wife - 2025'
    },
    {
      id: 3,
      src: '/images/Dance_Paris.JPG',
      alt: 'Dance in Paris',
      caption: 'Domaine National du Palais-Royal, Paris - 2024'
    },
    {
      id: 4,
      src: '/images/London_Coffee.JPG',
      alt: 'The Gentlemen Baristas - A special coffee shop on Park St',
      caption: 'The Gentlemen Baristas, London - 2022'
    },
    {
      id: 5,
      src: '/images/NewYork_skyline.JPG',
      alt: 'New York Skyline took from SUMMIT One Vanderbilt',
      caption: 'New York Skyline - 2023'
      
    },
    {
      id: 6,
      src: '/images/Stockholm.JPG',
      alt: 'Travel in Nordic, Stockholm City View',
      caption: 'Stockholm City View - 2023'
    }
  ];

  const openModal = (index: number) => {
    setSelectedPhoto(index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1);
    }
  };

  return (
    <section id="photos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera size={32} className="text-blue-600" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              Photos
            </h2>
          </div>
          <p className="text-lg text-slate-600">
            A glimpse into my adventures and experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-medium">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedPhoto !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
              
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
              
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
              >
                <ChevronRight size={32} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
                <p className="text-lg font-medium">{photos[selectedPhoto].caption}</p>
                <p className="text-sm text-gray-300 mt-1">
                  {selectedPhoto + 1} of {photos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoAlbum;

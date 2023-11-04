import React, { useState } from 'react';
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import img1 from '../../assets/images/image-1.webp';
import img2 from '../../assets/images/image-2.webp';
import img3 from '../../assets/images/image-3.webp';
import img4 from '../../assets/images/image-4.webp';
import img5 from '../../assets/images/image-5.webp';
import img6 from '../../assets/images/image-6.webp';
import img7 from '../../assets/images/image-7.webp';
import img8 from '../../assets/images/image-8.webp';
import img9 from '../../assets/images/image-9.webp';
import img10 from '../../assets/images/image-10.jpeg';
import img11 from '../../assets/images/image-11.jpeg';

export default function ImageGallery() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedImages, setSelectedImages] = useState(Array(11).fill(false));
  const [images, setImages] = useState([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11
  ]);

  const handleCheckboxClick = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages[index] = !newSelectedImages[index];
    setSelectedImages(newSelectedImages);
    setSelectedCount(prevCount => prevCount + (newSelectedImages[index] ? 1 : -1));
  };

  const handleImageClick = () => {
    setSelectedCount(prevCount => prevCount);
  };

  const handleDelete = () => {
    const newImages = images.filter((_, index) => !selectedImages[index]);
    setImages(newImages);
    setSelectedCount(0);
    setSelectedImages(Array(11).fill(false));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages.splice(11, 0, reader.result); // Insert after img11
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const draggedImageIndex = parseInt(event.dataTransfer.getData('index'), 10);
    const newImages = [...images];
    const draggedImage = newImages[draggedImageIndex];
    newImages[draggedImageIndex] = newImages[index];
    newImages[index] = draggedImage;
    setImages(newImages);
  };

  return (
    <div className='lg:border lg:p-5 lg:rounded-lg'>
      <div className='flex justify-between mx-5 '>
        <div>
          {selectedCount > 0 ? (
            <div className="mb-4 font-semibold text-xl"> {selectedCount} Files Selected</div>
          ) : (
            <div className="mb-4 font-semibold text-2xl">Gallery</div>
          )}
        </div>
        <div
          className="cursor-pointer text-red-500 font-semibold text-2xl"
          onClick={handleDelete}
        >
          Delete files
        </div>
      </div>
      <hr className='h-[2px] bg-gray-200 w-full mb-5'/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-5">
        {images.map((image, index) => (
          <div
            className={`w-full border-2 rounded-lg image-container ${index === 0 ? 'md:col-span-1 lg:col-span-2 lg:row-span-2' : ''}`}
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, index)}
          >
            <label className="block relative">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className={`w-full h-auto cursor-pointer  ${selectedImages[index] ? 'opacity-75' : ''}`}
                onClick={handleImageClick}
              />
              <input
                type="checkbox"
                className="absolute top-2 left-2 block w-5 h-5"
                checked={selectedImages[index]}
                onChange={() => handleCheckboxClick(index)}
              />
            </label>
          </div>
        ))}
        <div className='w-full border-2 rounded-lg flex flex-col justify-center items-center h-[175px]'>
          <label htmlFor="fileUpload">
            <MdOutlineAddPhotoAlternate size={40} />
            <div className='font-bold'>Add image</div>
          </label>
          <input
            type="file"
            accept="image/*"
            id="fileUpload"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "animate.css";

const ImageUploader2: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].type.startsWith("image/")) {
      setImage(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="flex justify-between w-full gap-6 items-center">
        <h5 className="text-lg md:text-xl font-semibold">Add Image</h5>
        <span>x</span>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <h5 className="font-semibold">
          Add a professional image of the product
        </h5>
        <p className="text-sm">
          Upload an image from your computer or drag and drop in the box below
        </p>
      </div>
      <div
        className={`bg-[#F1FCF4] w-96 h-64 p-6 flex justify-center items-center cursor-pointer gap-4 flex-col ${
          isDragActive === true &&
          "animate__animated animate__pulse animate__infinite"
        }`}
        onDrop={handleDrop}
        onDragOver={onDragOver}
      >
        {image && (
          <div className="mt-4 relative">
            <div className="w-12 h-12 md:w-16 md:h-16 relative rounded-lg">
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploaded Image"
                fill={true}
                sizes=""
                className="object-contain rounded-lg"
              />
            </div>

            <button
              className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
              onClick={removeImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-10.293a1 1 0 0 0-1.414-1.414L10 8.586 7.707 6.293a1 1 0 0 0-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 1 0 1.414 1.414L10 11.414l2.293 2.293a1 1 0 0 0 1.414-1.414L11.414 10l2.293-2.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />
        <p className="text-gray-400">Drag and drop to upload or</p>

        <label htmlFor="fileInput" className="text-[#1C9D51] cursor-pointer">
          Browse Files
        </label>
        <button className="bg-[#1C9D51] px-6 py-2 w-full font-semibold text-white rounded-lg">
          Upload Photo
        </button>
      </div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default ImageUploader2;

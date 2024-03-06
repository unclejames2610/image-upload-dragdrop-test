"use client";
import React, { useEffect, useRef, useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>("");

  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    // Clean up the object URL when the component is unmounted
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // Check if files were dropped
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the files
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped item is a file, get it as a File object
        if (event.dataTransfer.items[i].kind === "file") {
          let file = event.dataTransfer.items[i].getAsFile();
          if (file) {
            handleFile(file);
            break; // Only handle the first file if multiple files were dropped
          }
        }
      }
    } else {
      // Fallback to legacy method to retrieve the file
      let file = event.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleClick = () => {
    fileInput?.current?.click();
  };
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen w-full p-4">
      <div
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
        className="flex flex-col h-48 w-full bg-red-400 cursor-pointer border rounded-md hover:bg-red-700"
        onClick={handleClick}
      >
        <p className="mx-auto">
          Click to select or Drag and drop image here....
        </p>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          hidden
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className=""
        />
      </div>
      {previewUrl && (
        <div className="flex flex-col">
          <img
            src={previewUrl}
            alt="image"
            className="w-48 h-48 rounded inline-block"
          />
          <span> {image?.name} </span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

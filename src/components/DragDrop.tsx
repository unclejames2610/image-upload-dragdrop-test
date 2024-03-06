"use client";

import React, { useEffect, useState } from "react";
import { Accept, useDropzone, FileRejection } from "react-dropzone";

interface PreviewFile extends File {
  preview: string;
}

interface CustomFileRejection extends FileRejection {
  file: File & { path?: string };
}

const DragDrop = () => {
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [fileRejections, setFileRejections] = useState<CustomFileRejection[]>(
    []
  );

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      console.log(acceptedFiles);
      setFiles(
        acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }) as PreviewFile
        )
      );
      setFileRejections(rejectedFiles as CustomFileRejection[]);
    },
    []
  );

  function fileSizeValidator(file: File) {
    if (file.size > 1024 ** 2 * 2) {
      return {
        code: "size-too-large",
        message: `File is larger than 2mb`,
      };
    }
    return null;
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    validator: fileSizeValidator,
  });

  return (
    <div className="flex flex-col p-4 min-h-screen">
      <div
        {...getRootProps({
          role: "button",
        })}
        className=" rounded-lg cursor-pointer items-center justify-center h-56 w-full bg-red-500"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="text-center text-xl bg-blue-500 scale-105 h-full w-full">
            Drop your media files here
          </div>
        ) : (
          <div className="text-center text-xl bg-yellow-400 h-full w-full">
            Drag and drop some files here, or click to select files
          </div>
        )}
      </div>
      {files.map((f) => {
        return <img src={f.preview} className="h-56 w-56" />;
      })}

      {fileRejections.map(({ file, errors }) => {
        return (
          <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
              {errors.map((e) => (
                <li key={e.code}>{e.message}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </div>
  );
};

export default DragDrop;

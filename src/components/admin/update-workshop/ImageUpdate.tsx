"use client";
import { updateWorkshopImage } from "@/components/server/admin/workshops";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  url: string;
  id: string;
  setUpdateImage: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageUpdate: React.FC<Props> = ({ id, url, setUpdateImage }) => {
  const [imagePreview, setImagePreview] = useState(url);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setImagePreview(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`);
  }, [url]);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const router = useRouter();
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        const res = await updateWorkshopImage(id, formData);
        toast.success(res.message);
        setUpdateImage(false);
        router.push("/workshop");
      } catch (err) {
        toast.error("unable to update image");
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-6 bg-white rounded-5 shadow-md position-absolute top-0 end-0 w-75 h-100">
      <div className="d-flex flex-row gap-4 justify-content-center align-items-center mb-4">
        <button
          className="btn btn-danger"
          onClick={() => {
            setUpdateImage(false);
          }}
        >
          Close
        </button>
        <h2 className="text-xl font-semibold text-black">
          Update Profile Image
        </h2>
      </div>

      <label htmlFor="imageInput">
        <div className="w-32 h-32 mb-4">
          <img
            src={`${imagePreview}`}
            alt="Profile Preview"
            className="w-full h-full object-cover rounded-full border"
            width={400}
            height={"auto"}
          />
        </div>
      </label>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
        style={{
          display: "none",
        }}
      />

      {selectedFile === null ? (
        <p>Click Over Image to select a file</p>
      ) : (
        <button
          onClick={handleUpload}
          disabled={!selectedFile}
          className="btn btn-success"
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default ImageUpdate;

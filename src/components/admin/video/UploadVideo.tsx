"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { ImCancelCircle } from "react-icons/im";
import { uploadVideoDetails } from "@/components/server/admin/blog";

type Props = {
  setUploadVideo: React.Dispatch<React.SetStateAction<boolean>>;
  videoCount: number;
};

const VideoUpload: React.FC<Props> = ({ setUploadVideo, videoCount }) => {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const maxSize = 25 * 1024 * 1024; // 25MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      toast.warn("File size exceeds 25MB. Please upload a smaller video.");
      return;
    }

    setVideo(file);
  };

  const handleUpload = async () => {
    if (!video || !title) {
      toast.warn("Please enter a title and select a video.");
      return;
    }
    if (videoCount >= 5) {
      toast.warn("You can upload maximum 5 videos.");
      return;
    }

    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "ml_default");
    formData.append("folder", "samples/ecommerce");

    setUploading(true);
    setUploadProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`
    );

    // Track progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        setVideoUrl(data.secure_url);

        const videoObj = {
          title: title,
          url: data.secure_url,
          cloudinaryPublicId: data.public_id,
        };

        try {
          await uploadVideoDetails(videoObj);
          toast.success("Video uploaded successfully!");
          setTitle("");
          setUploadVideo(false);
        } catch (err) {
          toast.error("Failed to upload video!");
        }
      } else {
        toast.error("Video upload failed.");
      }
      setUploading(false);
    };

    xhr.onerror = () => {
      toast.error("An error occurred during upload.");
      setUploading(false);
    };

    xhr.send(formData);
  };

  return (
    <div className="container mt-5">
      <div className="">
        <div className="d-flex justify-content-center gap-4 align-items-center">
          <ImCancelCircle
            style={{ color: "red", fontSize: "2rem" }}
            onClick={() => setUploadVideo(false)}
          />
          <h2 className="text-center mb-3 text-dark p-0 m-0 mb-0">
            Upload Video
          </h2>
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Video (Max: 25MB)</label>
          <input
            type="file"
            className="form-control"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>
        {uploading ? (
          <div className="progress mt-3">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        ) : (
          <button
            className="btn btn-primary w-100"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        )}

        {videoUrl && (
          <div className="mt-4">
            <h5>Uploaded Video:</h5>
            <video src={videoUrl} controls className="w-100 rounded shadow" />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;

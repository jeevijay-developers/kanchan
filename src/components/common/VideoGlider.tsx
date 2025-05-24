"use client";
import React, { useEffect, useState, useRef } from "react";
import Glide from "@glidejs/glide";
import { getAllVideos } from "../server/admin/blog";
import { MdDeleteOutline } from "react-icons/md";
import DiscussSpinner from "../spinners/DiscussSpinner";

const VideoGlider = () => {
  const [videos, setVideos] = useState([]);
  const [videoCount, setVideoCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    setLoading(true);
    getAllVideos()
      .then((res) => {
        setVideos(res);
        setVideoCount(res.length);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (videos.length === 0) return;

    const glideElement = document.querySelector(".glide");
    if (!glideElement) return;

    const glide = new Glide(".glide", {
      type: "carousel",
      perView: 2,
      focusAt: "center",
      breakpoints: {
        800: {
          perView: 1,
        },
        480: {
          perView: 1,
        },
      },
    });
    glide.mount();

    return () => glide.destroy();
  }, [videos]);

  const handlePlay = (videoId: string) => {
    // Pause the currently playing video if there is one
    if (currentlyPlaying && currentlyPlaying !== videoId) {
      const previousVideo = videoRefs.current[currentlyPlaying];
      if (previousVideo) {
        previousVideo.pause();
      }
    }
    // Set the new currently playing video
    setCurrentlyPlaying(videoId);
  };

  const handleVideoTouch = (e: React.TouchEvent, videoId: string) => {
    if (e.touches.length > 0) {
      const video = e.currentTarget as HTMLVideoElement;
      if (video.paused) {
        handlePlay(videoId);
        video.play();
      } else {
        video.pause();
        setCurrentlyPlaying(null);
      }
    }
  };

  if (loading) {
    return (
      <>
        <h2 className="text-center text-white m-4">Workshop Feedback</h2>
        <DiscussSpinner />
      </>
    );
  }

  return (
    <div className="my-5">
      <h2 className="text-center text-white mb-4">Workshop Feedback</h2>
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {videos.map((video: any) => (
              <li key={video._id} className="glide__slide md:mx-5">
                <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                  <div
                    className="d-flex flex-row justify-content-center mx-4"
                    style={{ width: "500px", height: "auto" }}
                  >
                    <span style={{ color: "white" }}>{video.title}</span>
                  </div>
                  <video
                    ref={(el: HTMLVideoElement | null) => {
                      videoRefs.current[video._id] = el;
                      return void 0; 
                    }}
                    controls
                    loop
                    style={{ width: "500px", height: "500px" }}
                    onPlay={() => handlePlay(video._id)}
                    onTouchStart={(e) => handleVideoTouch(e, video._id)}
                  >
                    <source src={video.url} />
                  </video>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="glide__bullets" data-glide-el="controls[nav]">
          {videos.map((_, index) => (
            <button
              key={index}
              className="glide__bullet"
              data-glide-dir={`=${index}`}
            ></button>
          ))}
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button
            className="glide__arrow glide__arrow--left"
            data-glide-dir="<"
          >
            prev
          </button>
          <button
            className="glide__arrow glide__arrow--right"
            data-glide-dir=">"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoGlider;

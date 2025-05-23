"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import VideoPopup from "@/modals/VideoPopup";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";

import hero_shape_1 from "@/assets/img/hero/mask-shape.png";
import hero_shape_2 from "@/assets/img/arrow-shape.png";

interface DataType {
  id: number;
  bg_img: string;
  sub_title: string;
  title: string;
}
[];

const hero_data: DataType[] = [
  {
    id: 1,
    bg_img: "/assets/img/gallery/banner/1.jpg",
    sub_title: "Special industrial",
    title: "Industrial Manufacturing Forging The future",
  },
  {
    id: 2,
    // bg_img: "/assets/img/hero/hero-2.jpg",
    bg_img: "/assets/img/gallery/banner/2.jpg",
    sub_title: "Special industrial",
    title: "Industrial Manufacturing Forging The future",
  },
  {
    id: 3,
    bg_img: "/assets/img/gallery/banner/3.jpg",
    sub_title: "Special industrial",
    title: "Industrial Manufacturing Forging The future",
  },
  {
    id: 4,
    bg_img: "/assets/img/gallery/banner/4.jpg",
    sub_title: "Special industrial",
    title: "Industrial Manufacturing Forging The future",
  },
  {
    id: 5,
    bg_img: "/assets/img/gallery/banner/5.jpg",
    sub_title: "Special industrial",
    title: "Industrial Manufacturing Forging The future",
  },
  {
    id: 6,
    bg_img: "/assets/img/gallery/banner/6.jpg",
    sub_title: "Special industrial",
    title: "Industrial Manufacturing Forging The future",
  },
  {
    id: 7,
    bg_img: "/assets/img/gallery/banner/7.jpg",
    sub_title: "Special industrial",
    title: "Industrial Manufacturing Forging The future",
  },
  {
    id: 8,
    bg_img: "/assets/img/gallery/banner/8.jpg",
    sub_title: "Special industrial",
    title: "Industrial Manufacturing Forging The future",
  },
];

const setting = {
  loop: true,
  slidesPerView: 1,
  effect: "fade",
  speed: 2000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".dot",
    clickable: true,
  },
};

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="hero-section">
        <ul className="hero-social">
          <li>
            <Link href="https://www.facebook.com/share/1C67kmqoRb/">
              <i className="fa-brands fa-facebook-f"></i>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/academic_performance_coach?igsh=YjN3d2ZwanM3OHI0"
              className="active"
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/in/performancecoachkanchankabra9096207767?utm_source=share&utm_campaign=share_via&utm_content=profi">
              <i className="fa-brands fa-linkedin-in"></i>
            </Link>
          </li>
          {/* <li>
            <Link href="#0">
              <i className="fa-brands fa-youtube"></i>
            </Link>
          </li> */}
        </ul>

        <div className="swiper-dot">
          <div className="dot"></div>
        </div>
        <Swiper
          {...setting}
          modules={[Pagination, EffectFade, Autoplay]}
          className="swiper hero-slider"
          effect="fade"
        >
          {hero_data.map((item) => (
            <SwiperSlide key={item.id} className="swiper-slide">
              <div
                className="hero-1 bg-cover"
                style={{ backgroundImage: `url(${item.bg_img})` }}
              >
                <div
                  className="shape-image"
                  data-animation="fadeInLeft"
                  data-delay="2.2s"
                >
                  <Image src={hero_shape_1} alt="shape-img" />
                </div>
                <div className="container">
                  <div className="row g-4 align-items-center justify-content-between">
                    <div className="col-xl-9">
                      <div className="hero-content">
                        <h2 data-animation="fadeInUp" data-delay="1.3s">
                          {/* Welcome to{" "} */}
                          Dr. Kanchan kabra The &nbsp;
                          <span style={{ color: "#ffe000" }}>
                            mindset coach
                          </span>
                        </h2>
                        <h2 data-animation="fadeInUp" data-delay="1.5s">
                          Unlock your potential with Dr. Kanchan <br />- I am
                          not here to promise instant miracles.
                          {/* Transform your mind <br /> - Transform your life! */}
                        </h2>
                        <p style={{ color: "white", whiteSpace: "none" }}>
                          We shift your DIRECTION - and once that happens, miracles flow
                        </p>
                        <div className="hero-button">
                          <Link
                            href="/about"
                            data-animation="fadeInUp"
                            data-delay="1.7s"
                            className="theme-btn"
                            style={{
                              backgroundColor: "#00394f",
                            }}
                          >
                            Explore More
                          </Link>
                          <Link
                            href="/about"
                            data-animation="fadeInUp"
                            data-delay="1.7s"
                            className="theme-btn-2 white-border"
                          >
                            Our Services
                            <span className="shape-img">
                              <Image src={hero_shape_2} alt="shape-img" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-xl-2">
                      <div className="video-box">
                        <a
                          onClick={() => setIsVideoOpen(true)}
                          style={{ cursor: "pointer" }}
                          className="video-btn ripple video-popup"
                          data-animation="fadeInUp"
                          data-delay="1.4s"
                        >
                          <i className="fa-solid fa-play"></i>
                        </a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"Ml4XCF-JS0k"}
      />
    </>
  );
};

export default Hero;

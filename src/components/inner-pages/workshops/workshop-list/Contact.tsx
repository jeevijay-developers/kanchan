import Image from "next/image";
import Link from "next/link";

import contact_img1 from "@/assets/img/shape.png";
import contact_img2 from "@/assets/img/contact.png";
import contact_img3 from "@/assets/img/arrow-shape.png";


const Contact = () => {
  return (
    <section className="contact-info-section fix section-padding">
      <div className="shape-image">
        <Image src={contact_img1} alt="shape-img" />
      </div>
      <div className="container">
        <div className="contact-info-wrapper">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div className="info-image">
                <Image  src={contact_img2} alt="img" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 mt-5 mt-lg-0">
              <div className="info-content">
                <div className="section-title">
                  <span>Join Our Workshops</span>
                  <h2>Want to participate in a workshop?</h2>
                </div>
                <p className="mt-4 mt-md-0">
                  We offer engaging and insightful workshops designed to
                  enhance your skills, knowledge, and professional growth. Join
                  our expert-led sessions to gain hands-on experience and
                  valuable insights.
                </p>
                <div className="about-info-items">
                  <Link href="/contact" className="theme-btn-2">
                    Contact Us
                    <span className="shape-img">
                      <Image src={contact_img3} alt="shape-img" />
                    </span>
                  </Link>
                  <div className="call-area">
                    <span>or Call us</span>
                    <div className="icon">
                      <i className="fa-solid fa-phone-volume"></i>
                      <h6>
                        <Link
                          href="tel:+91-90962-07767"
                          style={{ color: "#14b2f1 " }}
                        >
                          +91 90962 07767
                        </Link>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

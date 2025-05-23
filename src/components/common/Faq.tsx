"use client";
import { useState } from "react";
import faq_img from "@/assets/img/faq.jpg";
import Image from "next/image";

interface DataType {
  id: number;
  title: string;
  desc: JSX.Element;
  space?: string;
  data_wow_delay: string;
}
[];

const faq_data: DataType[] = [
  {
    id: 1,
    data_wow_delay: ".3s",
    space: "mb-3",
    title: "What services does Dr. Kanchan kabra offer?",
    desc: (
      <>
        <ol type="1">
          <li>Mindset Reset Coaching</li>
          <li>Academic Success Blueprint</li>
          <li>Parent Support Sessions</li>
          <li>Confidence Building Pathways</li>
          <li>Stress Relief Strategies</li>
        </ol>
        {/* Yes, we specialize in designing and manufacturing custom bottles, caps,
        closures, and measuring cups tailored to your specific needs. */}
      </>
    ),
  },
  {
    id: 2,
    data_wow_delay: ".5s",
    space: "mb-3",
    title: "Who can benefit from these coaching programs?",
    desc: (
      <>
        <ul>
          <li>
            Anyone looking for personal or professional growth can benefit,
            including:
            <ul>
              <li>Students (Ages 13–23)</li>
              <li>Homemakers (Ages 30+)</li>
              <li>Working Women (Ages 25–35)</li>
              <li>Parents of Teenagers</li>
              <li>Educators and Coaches</li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    data_wow_delay: ".7s",
    space: "mb-3",
    title: "How can I book a coaching session?",
    desc: (
      <>
        You can book a session through the Contact Us page or by reaching out
        via:
        <table>
          <tbody>
            <tr>
              <td>Email: </td>
              <td>mindsetmanifestationacademy@gmail.com</td>
            </tr>
            <tr>
              <td>Phone / WhatsApp:</td>
              <td>90962 07767</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: 4,
    data_wow_delay: ".9s",
    title: "Are these programs available online?",
    desc: (
      <>
        Yes! Dr. Kanchan kabra offers both online and offline coaching. You can
        join live webinars, book one-on-one coaching calls, or attend in-person
        seminars.
      </>
    ),
  },
  {
    id: 5,
    data_wow_delay: ".9s",
    title: "What types of courses are available?",
    desc: (
      <>
        <ul>
          <li> Mindset Mastery Program</li>
          <li> Success Blueprint for Entrepreneurs</li>
          <li>Confidence & Leadership Coaching</li>
          <li> Breakthrough Goal-Setting Workshop</li>
        </ul>
      </>
    ),
  },
  {
    id: 6,
    data_wow_delay: ".9s",
    title: "Can Educational institution Book Dr kanchan kabra for training?",
    desc: (
      <>
        Educational institutions can book Dr. Kanchan Kabra for training
        programs tailored for teachers, parents, and students. She also provides
        expert consultation to help schools upgrade their learning environment
        and enhance student experiences. Contact us to collaborate or invite Dr.
        Kabra to your institution.
      </>
    ),
  },
  {
    id: 7,
    data_wow_delay: ".9s",
    title: "Where can I find success stories and testimonials?",
    desc: (
      <>
        You can visit our Gallery and Testimonials sections to see photos,
        videos, and success stories of people who have transformed their lives
        through Dr. Kanchan kabra&apos;s coaching.
      </>
    ),
  },
];

const Faq = ({ style }: any) => {
  const [activeId, setActiveId] = useState<number>(1);

  const toggleAccordion = (id: number) => {
    setActiveId((prevActiveId) => (prevActiveId === id ? -1 : id));
  };

  return (
    <>
      {faq_data.map((item) => (
        <div
          key={item.id}
          className={`accordion-item ${style ? "mb-3" : ""} ${
            item.space
          } wow fadeInUp`}
          data-wow-delay={item.data_wow_delay}
        >
          <h5 className="accordion-header">
            <button
              onClick={() => toggleAccordion(item.id)}
              className={`accordion-button ${
                activeId !== item.id ? "collapsed" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#faq${item.id}`}
              aria-expanded="false"
              aria-controls={`${item.id}`}
            >
              {item.title}
            </button>
          </h5>
          <div
            id={`${item.id}`}
            className={`accordion-collapse collapse ${
              activeId === item.id ? "show" : ""
            }`}
            data-bs-parent="#accordion"
          >
            <div className="accordion-body">{item.desc}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Faq;

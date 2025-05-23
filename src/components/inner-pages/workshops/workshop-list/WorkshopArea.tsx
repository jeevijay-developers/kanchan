"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  getAllWorkshopCategories,
  getAllWorkshops,
  getWorkshopById,
  getWorkshopsByCateById,
} from "@/components/server/admin/workshops";
import DiscussSpinner from "@/components/spinners/DiscussSpinner";
import style from "./WorkshopArea.module.css";
import update from "@/assets/img/update.png";
import { WorkshopCategory, Workshop, categoryType } from "@/types/workshop";
import NoWorkshopFound from "@/components/not-found/NoWorkshopFound ";
// interface Workshop {
//   _id: any;
//   title: string;
//   shortDec: string;
//   longDec: string;
//   image: string;
//   price: number;
//   offerPrice: number;
// }

const WorkshopArea = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState<String>("USER");
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function handleViewDetails(id: any) {
    const token = localStorage.getItem("kanchan-token");
    const user = localStorage.getItem("kanchan-user");
    if (!token || !user) {
      toast.warning("Please Login First");
      return;
    }
    router.push(`/workshop-details/${id}`);
  }
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [selectedCateId, setSelectedCateId] = useState<string>("");
  useEffect(() => {
    // fetch all the categories
    const user = localStorage.getItem("kanchan-user");
    if (user) setUserRole(JSON.parse(user).role);
    getAllWorkshopCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setSelectedCateId(data[0]._id);
      })
      .catch((err) => {
        toast.error("Error fetching categories");
      });
  }, []);

  // this fetching the workshops
  useEffect(() => {
    if (selectedCateId === "") return;

    setLoading(true);
    getWorkshopsByCateById(selectedCateId)
      .then((data) => {
        setWorkshops(data);
        toast.success("Workshops Loaded");
      })
      .catch((err) => {
        console.error("Error fetching workshops:", err);
        toast.error("Failed to fetch workshops");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCateId]);

  if (loading) {
    return <DiscussSpinner />;
  }

  return (
    <section className="workshop-section fix section-padding">
      <section>
        <ul className="d-flex flex-row gap-2 w-100 overflow-auto mx-5 my-4">
          {categories.length > 0 &&
            categories.map((item) => (
              <li
                className={`list-group-item px-3 py-2 border-1 border-white ${
                  item._id === selectedCateId
                    ? "bg-primary text-white"
                    : "bg-info-subtle text-black"
                }  rounded-3 text-black cursor-pointer`}
                key={item._id}
                onClick={() => setSelectedCateId(item._id)}
                style={{
                  cursor: "pointer",
                }}
              >
                {item.categoryName}
              </li>
            ))}
        </ul>
      </section>

      <div className="container">
        <div className="row">
          {workshops.length > 0 ? (
            workshops.map((item) => (
              <div
                key={item._id}
                className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp position-relative border-1 border-white"
              >
                {userRole === "ADMIN" && (
                  <div
                    className="position-absolute"
                    style={{ right: "10px", top: "-20px", cursor: "pointer" }}
                    onClick={() => router.push(`/update-workshop/${item._id}`)}
                  >
                    <Image src={update} alt="update icon" />
                  </div>
                )}
                <div className="workshop-items">
                  <div className="workshop-image rounded-2">
                    <img
                      className="rounded-2"
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`}
                      width={300}
                      height={200}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        boxShadow: "0px 0px 3px white",
                      }}
                      alt="service-img"
                    />
                  </div>
                  <section
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      background: " #000000",
                      padding: "10px",
                    }}
                  >
                    <div className="workshop-content" style={{ width: "75%" }}>
                      <h6>
                        <span style={{ textAlign: "center" }}>
                          {item.title}
                        </span>
                      </h6>
                      <p>{item.shortDec}</p>
                      {/* <p>{item.longDec}</p> */}
                    </div>
                  </section>
                  <button
                    onClick={() => handleViewDetails(item._id)}
                    className={style.viewDetailsButton}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <NoWorkshopFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkshopArea;

"use client";
import menu_data from "@/data/MenuData";
import Link from "next/link.js";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import admin_routes from "@/data/Admin";
import { toast } from "react-toastify";

const MobileMenu = () => {
  const [ROLE, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Prevents SSR issues
      const user = localStorage.getItem("kanchan-user");
      try {
        setRole(user ? JSON.parse(user)?.role : null);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setRole(null);
      }
    }
  }, []);
  const [navTitle, setNavTitle] = useState("");
  const currentRoute = usePathname();

  const isMenuItemActive = (menuLink: string) => {
    return currentRoute === menuLink;
  };

  const isSubMenuItemActive = (subMenuLink: string) => {
    return currentRoute === subMenuLink;
  };

  //openMobileMenu
  const openMobileMenu = (menu: any) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };

  const router = useRouter();

  const handleQuery = (para: string) => {
    const USER = localStorage.getItem("kanchan-user");
    if (USER) {
      const U = JSON.parse(USER);
      if (para === "qry") {
        router.push(`/query/${U._id}`);
      } else if (para === "booking") {
        router.push(`/book-event`);
      } else if (para === "workshop") {
        router.push(`/workshop`);
      } else if (para === "login") {
        router.push("/login");
      } else if (para === "logout") {
        router.push("/login");
        try {
          localStorage.removeItem("kanchan-token");
          localStorage.removeItem("kanchan-user");
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      if (para === "login") {
        router.push("/login");
      } else {
        toast.warn("Please Login First...");
      }
    }
  };

  return (
    <ul>
      {menu_data.filter((menu:any) =>{
        if(menu.title === 'Login' || menu.title === 'Logout'){
          return false;
        }
        return true
      }).map((menu: any) => (
        <li key={menu.id}>
          <Link
            href={menu.link}
            className={isMenuItemActive(menu.link) ? "active" : ""}
          >
            {menu.title}
          </Link>
          {menu.has_dropdown && (
            <>
              {menu.sub_menus && (
                <ul
                  className="submenu"
                  style={{
                    display: navTitle === menu.title ? "block" : "none",
                  }}
                >
                  {menu.sub_menus.map((sub_m: any, i: any) => (
                    <li key={i}>
                      <Link
                        href={sub_m.link}
                        className={`${
                          sub_m.link && isSubMenuItemActive(sub_m.link)
                            ? "active"
                            : ""
                        }`}
                      >
                        {sub_m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {menu.has_dropdown && (
            <a
              onClick={() => openMobileMenu(menu.title)}
              className={`mean-expand ${
                navTitle === menu.title ? "mean-clicked" : ""
              }`}
              style={{ fontSize: "18px", cursor: "pointer" }}
            >
              <i className="far fa-plus"></i>
            </a>
          )}
        </li>
      ))}
      {ROLE === "ADMIN" &&
        admin_routes.map((menu: any) => (
          <li key={menu.id}>
            <Link
              href={menu.path}
              className={`${
                isMenuItemActive(menu.link) ||
                (menu.sub_menus &&
                  menu.sub_menus.some(
                    (sub_m: any) =>
                      sub_m.link && isSubMenuItemActive(sub_m.link)
                  ))
                  ? "active"
                  : ""
              }`}
              style={{
                color: menu.title === "Home" ? "#ffe000" : "white",
              }}
            >
              {menu.title}
            </Link>
          </li>
        ))}
      {ROLE !== "ADMIN" && (
        <>
          <li
            className="submenu my-2 "
            style={{
              borderBottom: "1px solid #ffffff38",
            }}
            onClick={() => {
              handleQuery("qry");
            }}
          >
            <span
              className={`text-white fw-bold`}
              style={{
                cursor: "pointer",
              }}
            >
              Query
            </span>
          </li>
          <li
            className="submenu my-2 "
            style={{
              borderBottom: "1px solid #ffffff38",
            }}
            onClick={() => {
              handleQuery("booking");
            }}
          >
            <span
              className={`text-white fw-bold`}
              style={{
                cursor: "pointer",
              }}
            >
              Book Event
            </span>
          </li>
          <li
            className="submenu my-2 "
            style={{
              borderBottom: "1px solid #ffffff38",
            }}
            onClick={() => {
              handleQuery("workshop");
            }}
          >
            <span
              className={`text-white fw-bold`}
              style={{
                cursor: "pointer",
              }}
            >
              Workshops
            </span>
          </li>
        </>
      )}
      {ROLE === null ? (
        <li
          className="submenu my-2 "
          style={{
            borderBottom: "1px solid #ffffff38",
          }}
          onClick={() => {
            handleQuery("login");
          }}
        >
          <span
            className={`text-white fw-bold`}
            style={{
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </li>
      ) : (
        <li
          className="submenu my-2 "
          style={{
            borderBottom: "1px solid #ffffff38",
          }}
          onClick={() => {
            handleQuery("logout");
          }}
        >
          <span
            className={`text-white fw-bold`}
            style={{
              cursor: "pointer",
            }}
          >
            Logout
          </span>
        </li>
      )}
    </ul>
  );
};

export default MobileMenu;

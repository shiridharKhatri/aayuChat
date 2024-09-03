"use client";
import { useEffect, useState } from "react";
import { Io5Icons, FaIcons } from "../tools/icons/icons";
import Image from "next/image";
export default function Navbar(props) {
  const [scroll, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      style={{ position: props.position }}
      className={scroll ? "isScrolledNav" : "navbar"}
    >
      <Image
        id="logo"
        src={`/image/main-logo.svg`}
        height="130"
        width="130"
        alt="Logo"
      />
      <div className="navbar-main-section">
        <form id="formInpSearch">
          <input type="search" placeholder="Search peoples..." />
          <button>
            <Io5Icons.IoSearch />
          </button>
        </form>
        <div className="moreDetails">
          <ul>
            <li>About</li>
            <li>Explore</li>
            <li>Message</li>
            <li>More</li>
          </ul>
          <button>
            <FaIcons.FaUserPlus />
            &nbsp;Signup
          </button>
        </div>
      </div>
    </nav>
  );
}

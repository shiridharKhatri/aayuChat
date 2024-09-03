import Image from "next/image";
import React from "react";
import { FaIcons, Io5Icons } from "../tools/icons/icons";
export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <FaIcons.FaFacebookF />,
      color: "#1877f2",
    },
    {
      name: "Instagram",
      icon: <FaIcons.FaInstagram />,
      color: "#bc2a8d",
    },
    {
      name: "Twitter",
      icon: <FaIcons.FaTwitter />,
      color: "#1da1f2",
    },
    {
      name: "Github",
      icon: <FaIcons.FaGithub />,
      color: "#211F1F",
    },
    {
      name: "Youtube",
      icon: <FaIcons.FaYoutube />,
      color: "#ff0000",
    },
    {
      name: "Viber",
      icon: <FaIcons.FaViber />,
      color: "#665CAC",
    },
  ];

  return (
    <>
      <footer>
        <div className="footerSec">
          <div className="firstSection">
            <div className="one">
              <Image
                src="/image/main-logo.svg"
                height="200"
                width="200"
                alt="logo"
              />
            </div>
            <div className="two">
              <h1>Menu</h1>
              <ul>
                <li>Sign up</li>
                <li>Sign in</li>
                <li>Messanges</li>
                <li>Random chat</li>
                <li>Make room</li>
              </ul>
            </div>
            <div className="three">
              <h1>More</h1>
              <ul>
                <li>About</li>
                <li>Privacy policy</li>
                <li>Report a problem</li>
                <li>Contact us</li>
                <li>FAq</li>
              </ul>
            </div>
            <div className="four">
              <h1>Subscribe</h1>
              <p>
                Subscribe to Our Newsletter for Exclusive Updates, New Features,
                and Exciting Chats on our Platform!
              </p>
              <form action="">
                <input type="text" placeholder="example@gmail.com" />
                <button>
                  <Io5Icons.IoSend />
                </button>
              </form>
            </div>
          </div>
          <div className="socialMe">
            <ul>
              {socialLinks.map((e, index) => {
                return (
                  <li
                    style={{ background: e.color, color: "#ffffff" }}
                    key={index}
                  >
                    {e.icon}
                  </li>
                );
              })}
            </ul>
            <p>&copy; 2023 Aayu chat co. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

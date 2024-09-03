"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  BiIcons,
  Io5Icons,
  Fa6Icons,
  RiIcons,
  PiIcons,
} from "../tools/icons/icons";
import { ContextProvider } from "../context/State";
import Cookies from "js-cookie";

export default function Page() {
  const { fetchProfile } = useContext(ContextProvider);
  const [searchUser, setSearchuser] = useState("");
  const [profile, setProfileData] = useState(null);
  const searchUserOnChange = () => {};
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProfile(Cookies.get("id"));
      setProfileData(data);
    };
    fetchData();
  }, [fetchProfile]);
  return (
    <section className="container">
      <div className="container-one">
        <div className="users">
          <div className="headtext">
            <Image
              height={100}
              width={100}
              src="/image/main-logo.svg"
              alt="logo"
            />
            <button>
              <BiIcons.BiDotsVerticalRounded />
            </button>
          </div>
          <div className="searchContact">
            <form action="">
              <input
                value={searchUser}
                name="username"
                onChange={searchUserOnChange}
                type="search"
                placeholder="Search contact..."
              />
              <button>
                <Io5Icons.IoSearch />
              </button>
            </form>
            <div className="selection">
              <select name="" id="">
                <option value="">Newest</option>
                <option value="">Oldest</option>
              </select>
            </div>
          </div>
          <div className="cardMain">
            <div className="primaryCard">
              <div className="cards">
                <div className="image">
                  <div
                    className="onlineStatus"
                    style={{ background: "#00ff00" }}
                  ></div>
                  <Image
                    style={{ border: ".2rem solid #00ff00" }}
                    src="/image/avatar/girl/g28.png"
                    alt="profile"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="content">
                  <h2>
                    Shiridhar Khatri <span>1min ago</span>
                  </h2>
                  <h3>
                    <span id="messageText">Hello how are you</span>{" "}
                    <span id="notificationMessage">
                      <Image src="/image/sec-logo.svg" height={10} width={10} />
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="closeDiv"></div>
      </div>
      <div className="container-two">
        {profile === null || profile?.success !== true ? (
          <div className="profileTopHead">
            <div className="profileHeadImage">
              <div className="image-loader"></div>
              <div className="profileName profileName-loader">
                <h1></h1>
                <p></p>
              </div>
            </div>
            <div className="otherProfileDetailSec otherProfileDetailSec-loader">
              <button></button>
              <button></button>
              <button></button>
            </div>
          </div>
        ) : (
          <div className="profileTopHead">
            <div className="profileHeadImage">
              <Image
                style={{ borderRadius: "50%" }}
                src={profile?.user.image}
                alt="profile"
                height={70}
                width={70}
              />
              <div className="profileName">
                <h1>{profile?.user.name}</h1>
                <p>@{profile?.user.username}</p>
              </div>
            </div>
            <div className="otherProfileDetailSec">
              <button id="premiumCrown">
                {" "}
                <Fa6Icons.FaCrown /> <span>{profile?.user.crown}</span>
              </button>
              <button>
                <Io5Icons.IoNotifications />
              </button>
              <button>
                {" "}
                <RiIcons.RiSettings3Fill />
              </button>
            </div>
          </div>
        )}
        <div className="mainCardFilterContainer">
          <h1 id="genderFilterHeaderText">
            <PiIcons.PiGenderIntersexBold />
            &nbsp;Gender filter
          </h1>
          <p id="genderFilterParagraphText">
            Start chatting now to connect with people from around the globe.
            Remember to be respectful and adhere to our{" "}
            <a href="#">community guidelines</a> for an enjoyable experience.
          </p>
          <div className="cardsFilterContainer">
            <div className="cardFilterPrimary">
              <div className="cardFilterSecondary">
                <div className="imageGender">
                  <span>
                    <Fa6Icons.FaCrown />
                  </span>
                  <Image
                    src="/image/genderFilter/male.png"
                    alt="male"
                    height={150}
                    width={150}
                  />
                </div>
                <div style={{ background: "#2986cc" }} className="genderType">
                  <h2>Male (10)</h2>
                </div>
              </div>
            </div>
            <div className="cardFilterPrimary">
              <div className="cardFilterSecondary">
                <div className="imageGender">
                  <Image
                    src="/image/genderFilter/random.png"
                    alt="random"
                    height={150}
                    width={150}
                  />
                </div>
                <div style={{ background: "#cccccc" }} className="genderType">
                  <h2>Random</h2>
                </div>
              </div>
            </div>
            <div className="cardFilterPrimary">
              <div className="cardFilterSecondary">
                <div className="imageGender">
                  <span>
                    <Fa6Icons.FaCrown />
                  </span>
                  <Image
                    src="/image/genderFilter/female.png"
                    alt="female"
                    height={150}
                    width={150}
                  />
                </div>
                <div style={{ background: "#c90076" }} className="genderType">
                  <h2>Female (10)</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="buyCrowns">
            <div className="primaryCrownStore">
              <div className="secondaryCrownStore">
                <div className="logo">
                  <h3>
                    {" "}
                    <Fa6Icons.FaCrown />
                  </h3>
                </div>
                <div className="textSection">
                  <h1>Buy more crowns</h1>
                  <p>
                    If you're lacking crowns, you can purchase them here to
                    select the gender you prefer.
                  </p>
                </div>
                <h1 id="rightCrownStoreArrow">
                  <Fa6Icons.FaChevronRight />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

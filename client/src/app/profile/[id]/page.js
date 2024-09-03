"use client";

import { useEffect, useState } from "react";
import {
  BsIcons,
  Fa6Icons,
  FiIcons,
  HiIconss,
  Io5Icons,
  TbIcons,
  FaIcons,
  BiIcons,
  GoIcons,
  MdIcons,
  CiIcons,
} from "../../tools/icons/icons";
import Image from "next/image";
import { profile } from "../api";
import moment from "moment";
import Mainloader from "../../tools/loader/Mainloader";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";

export default function page({ params }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [status, setStatus] = useState({
    isOnline: false,
    offlineDate: "none",
  });
  const userId = params.id;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let profileData = await profile(userId);

        if (profileData.success === true) {
          setData(profileData.user);
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const io = socket();
    io.on("online-data", (data) => {
      data.forEach((e) => {
        if (e.id === userId) {
          setStatus({
            isOnline: e.isOnline,
            offlineDate: e.offlineDate,
          });
        }
      });
    });
  }, []);
  return (
    <>
      <Navbar position="relative" />
      {loader === true ? (
        <Mainloader />
      ) : (
        <section className="profileSection">
          <button id="backToHome">
            <Fa6Icons.FaAngleLeft />
            Back to home
          </button>
          <div className="firstSectionProfile">
            <div className="joint-section-profile">
              <div id="textHead">
                <h1>{data?.username}</h1>
              </div>
              <div className="image-profile">
                <Image
                  id="profile"
                  src={data?.image}
                  height="150"
                  width="150"
                  alt="Logo"
                />
                <p>
                  <HiIconss.HiOutlineUpload />
                </p>
              </div>
              <div className="userDetailsSection">
                <h1>
                  {data?.name}{" "}
                  {data?.gender === "female" ? (
                    <span style={{ background: "#b33474" }}>
                      <Io5Icons.IoFemale />
                    </span>
                  ) : data?.gender === "male" ? (
                    <span style={{ background: "#2da9d9" }}>
                      <Io5Icons.IoMale />
                    </span>
                  ) : (
                    <span style={{ background: "#445" }}>
                      <Io5Icons.IoMaleFemale />
                    </span>
                  )}
                </h1>
                <p>
                  @{data?.username}{" "}
                  <span>
                    <Io5Icons.IoCopyOutline />
                  </span>
                </p>
                <div className="buttonss">
                  <button id="logout">
                    {" "}
                    <Io5Icons.IoChatbubbleEllipsesSharp />
                    &nbsp;Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="detailsSectionProfile">
            <div className="biographySection">
              <h2 id="bioHeader">
                <span style={{ color: "#ffffff" }}>
                  <MdIcons.MdInterests />
                  &nbsp; Interest
                </span>
              </h2>
              {!data?.interest ||
              data?.interest.length <= 0 ||
              data?.interest === null ? (
                <div className="no-interest-section">
                  <h1>
                    {" "}
                    <FiIcons.FiPlusCircle />
                  </h1>
                  <p>Add interest</p>
                </div>
              ) : (
                <div className="interestBox">
                  {data?.interest.map((e) => {
                    return <p>{e}</p>;
                  })}
                </div>
              )}
            </div>

            <div className="thirdSec">
              <h1 style={{ justifyContent: ` flex-start` }}>
                <Io5Icons.IoPerson />
                &nbsp; Profile Details
              </h1>
              <ul>
                <li>
                  <span className="keySpan">
                    <span
                      style={{
                        backgroundImage: `linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)`,
                      }}
                    >
                      <BsIcons.BsFilePerson />
                    </span>
                    Status
                  </span>
                  {status.isOnline === true && status.offlineDate === null ? (
                    <span className="valueSpan">
                      <span id="activeStatus"></span>Online
                    </span>
                  ) : status.isOnline === false &&
                    status.offlineDate === "none" ? (
                    <span className="valueSpan">
                      <span
                        style={{ background: "#445" }}
                        id="activeStatus"
                      ></span>
                      Offline
                    </span>
                  ) : (
                    <span className="valueSpan">
                      <span
                        style={{ background: "#445" }}
                        id="activeStatus"
                      ></span>
                      left {moment(status.offlineDate).fromNow()}
                    </span>
                  )}
                </li>
                <li>
                  <span className="keySpan">
                    <span
                      style={{
                        backgroundImage: `linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%)`,
                      }}
                    >
                      <Io5Icons.IoPersonOutline />
                    </span>
                    Age
                  </span>
                  <span className="valueSpan">
                    {data?.age === null ? "N/A" : data?.age}
                  </span>
                </li>
                <li>
                  <span className="keySpan">
                    <span
                      style={{
                        backgroundImage: `linear-gradient( 135deg, #FFAA85 10%, #B3315F 100%)`,
                      }}
                    >
                      <Io5Icons.IoMailOutline />
                    </span>
                    Email
                  </span>
                  <span className="valueSpan">{data?.email}</span>
                </li>
                <li>
                  <span className="keySpan">
                    <span
                      style={{
                        backgroundImage: `linear-gradient( 135deg, #97ABFF 10%, #123597 100%)`,
                      }}
                    >
                      <Io5Icons.IoCallOutline />
                    </span>{" "}
                    Phone{" "}
                  </span>
                  <span className="valueSpan">
                    {data?.number === null ? "N/A" : data?.number}
                  </span>
                </li>

                <li>
                  <span className="keySpan">
                    <span
                      style={{
                        backgroundImage: `linear-gradient( 135deg, #FF6FD8 10%, #3813C2 100%)`,
                      }}
                    >
                      <CiIcons.CiLocationOn />
                    </span>{" "}
                    Location{" "}
                  </span>

                  <span className="valueSpan">
                    {data?.location === null ? "N/A" : data?.location}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="belowProfileBtn">
            <button id="delete">
              <BiIcons.BiBlock />
              &nbsp;Block
            </button>
            <button id="reportAc">
              <GoIcons.GoReport />
              &nbsp;Report
            </button>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

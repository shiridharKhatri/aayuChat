"use client";

import { useEffect, useRef, useState } from "react";
import {
  BsIcons,
  Fa6Icons,
  FiIcons,
  HiIconss,
  Io5Icons,
  TbIcons,
  FaIcons,
  BiIcons,
  MdIcons,
  CiIcons,
} from "../tools/icons/icons";
import Image from "next/image";
import Cookies from "js-cookie";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { profile, updateProfile } from "./api";
import Addinterest from "./Addinterest";
import Mainloader from "../tools/loader/Mainloader";
import { useRouter } from "next/navigation";
import Buttonloader from "../tools/loader/Buttonloader";
import Deleteaccount from "./Deleteaccount";
export default function page() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState({ main: true, button: false });
  const userId = Cookies.get("id");
  const [logout, setLogout] = useState(false);
  const [inpValue, setValue] = useState({
    age: data?.age,
    phone: data?.number,
    location: data?.location,
  });
  const deleteSection = useRef(null)
  const [active, useActive] = useState(false);
  const inpOnChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...inpValue, [name]: value });
  };
  const editSection = () => {
    useActive(true);
  };
  const closeEditSection = () => {
    useActive(false);
  };
  const logoutOnCLick = () => {
    setLogout(true);
    Cookies.remove("token");
    Cookies.remove("id");
    router.push("/");
  };
  const deleteAccount = ()=>{
    deleteSection.current.style.display = "flex"
  }
  const applyProfileChanges = async () => {
    setLoader((prevData) => ({ ...prevData, button: true }));
    try {
      let data = {
        age: inpValue.age,
        location: inpValue.location,
        number: Number(inpValue.phone),
      };
      let response = await updateProfile(
        data,
        Cookies.get("id"),
        Cookies.get("token")
      );
      if (response.success === true) {
        window.location.reload();
      } else {
        console.log(response.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const openInterestOpt = () => {
    const addInterestMainSection = window.document.getElementById(
      "addInterestMainSection"
    );
    addInterestMainSection.style.display = "flex";
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let profileData = await profile(userId);

        if (profileData.success === true) {
          setData(profileData.user);
          setLoader((prevData) => ({ ...prevData, main: false }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <>
      <Navbar position="relative" />
      {loader.main === true ? (
        <section className="profileSection">
          <Mainloader />
        </section>
      ) : (
        <section className="profileSection">
          <Addinterest interestData={data.interest} />
          <Deleteaccount email={data?.email} reff={deleteSection}/>
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
                  {logout === true ? (
                    <button id="logout">
                      <Buttonloader color="var(--color-two)" />
                    </button>
                  ) : (
                    <button onClick={logoutOnCLick} id="logout">
                      <BiIcons.BiLogOutCircle />
                      &nbsp;Logout
                    </button>
                  )}
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
                <span onClick={openInterestOpt}>
                  <FiIcons.FiPlusCircle />
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
                  {data?.interest.map((e, index) => {
                    return <p key={index}>{e}</p>;
                  })}
                </div>
              )}
            </div>

            <div className="thirdSec">
              <h1>
                <span>
                  {" "}
                  <Io5Icons.IoPerson />
                  &nbsp; Profile Details
                </span>

                <span
                  onClick={editSection}
                  style={{ color: "var(--primary-color)" }}
                >
                  <FiIcons.FiEdit />
                </span>
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
                  <span className="valueSpan">
                    <span id="activeStatus"></span>Online
                  </span>
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
                  {active === true ? (
                    <input
                      type="text"
                      onChange={inpOnChange}
                      value={inpValue.age}
                      name="age"
                      placeholder={data?.age}
                    />
                  ) : (
                    <span className="valueSpan">{data?.age}</span>
                  )}
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

                  {active === true ? (
                    <input
                      type="text"
                      onChange={inpOnChange}
                      value={inpValue.phone}
                      name="phone"
                      placeholder={data?.number}
                    />
                  ) : (
                    <span className="valueSpan">
                      {data?.number === null ? "N/A" : data?.number}
                    </span>
                  )}
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

                  {active === true ? (
                    <input
                      type="text"
                      onChange={inpOnChange}
                      value={inpValue.location}
                      name="location"
                      placeholder={data?.location}
                    />
                  ) : (
                    <span className="valueSpan">{data?.location}</span>
                  )}
                </li>
              </ul>
              {active === true ? (
                <div className="buttonChangesProfile">
                  <button
                    style={{
                      background: "transparent",
                      color: "var(--primary-color)",
                    }}
                    onClick={closeEditSection}
                  >
                    Cancel
                  </button>
                  <button id="applyChanges" onClick={applyProfileChanges}>
                    {loader.button === true ? (
                      <Buttonloader color="var(--color-two)" />
                    ) : (
                      "Apply changes"
                    )}
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="belowProfileBtn">
            <button id="delete" onClick={deleteAccount}>
              <BiIcons.BiBlock />
              &nbsp;Delete account
            </button>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

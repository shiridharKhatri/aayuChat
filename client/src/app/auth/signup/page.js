"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { signupAuth } from "../api";
import Verify from "../Verify";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import { CiIcons, Io5Icons, LuIcons, MdIcons } from "../../tools/icons/icons";
import Buttonloader from "../../tools/loader/Buttonloader";
export default function page() {
  const [value, setValue] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [gender, setGender] = useState("n/a");
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const successDiv = useRef(null);
  const signupOnChange = (e) => {
    const { name, value: inputValue } = e.target;
    setValue((prevValue) => ({ ...prevValue, [name]: inputValue }));
    setError({
      name: "",
      username: "",
      email: "",
      password: "",
      repassword: "",
    });
  };
  const genderOnChange = (e) => {
    setGender(e.target.id);
  };
  const signupOnClick = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (value.password !== value.rePassword) {
        setError((prevData) => ({
          ...prevData,
          repassword: "Password and re-typed password doesn't match.",
        }));
        setLoader(false);
      } else {
        let signup = await signupAuth(
          value.name,
          value.email,
          value.username,
          value.password,
          gender,
          "/image"
        );
        if (signup.success === true) {
          setSuccess(true);
          setLoader(false);
          setUserId(signup.id);
          // successDiv.current.style.top = "2rem";
          // setTimeout(() => {
          //   successDiv.current.style.top = "-15rem";
          // }, 3000);
        } else {
          setLoader(false);
          setSuccess(false);
          if (signup.error) {
            signup.error?.forEach((e) => {
              if (e.path === "name") {
                setError((prevData) => ({ ...prevData, name: e.msg }));
              } else if (e.path === "username") {
                setError((prevData) => ({ ...prevData, username: e.msg }));
              } else if (e.path === "email") {
                setError((prevData) => ({ ...prevData, email: e.msg }));
              } else if (e.path === "password") {
                setError((prevData) => ({ ...prevData, password: e.msg }));
              }
            });
          } else {
            if (signup.path === "email") {
              setError((prevData) => ({ ...prevData, email: signup.msg }));
            } else {
              setError((prevData) => ({ ...prevData, username: signup.msg }));
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar position="relative" />
      {!success ? (
        <section className="authSection signupMain">
          {/* <div className="successMessage" ref={successDiv}>
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z"
                fill="#393a37"
                fillRule="evenodd"
              ></path>
            </svg>
            <h3>Please check your email for verification code!</h3>
          </div> */}
          <h1 id="fadedBgText">SIGN Up</h1>
          <div className="authPrimary signupCardPrimary">
            <div className="authSecondary signupCardSecondary">
              <div className="firstSectionSignup">
                <Image
                  src="/image/main-logo.svg"
                  height="100"
                  width="100"
                  alt="logo"
                />
                <div className="details-signup">
                  <h1>Sign up</h1>
                  <p>Create new account and get started.</p>
                </div>
              </div>
              <form action="">
                <div
                  style={
                    error.name.length > 2
                      ? {
                          border: ".2rem solid rgba(255,0,0,0.9)",
                          boxShadow: `0px 0px 65px 0px rgba(255,0,0,0.21) `,
                        }
                      : { border: ".2rem solid #445" }
                  }
                  className="authForm name"
                >
                  <label htmlFor="name">
                    <CiIcons.CiUser />
                  </label>
                  <input
                    onChange={signupOnChange}
                    value={value.name}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full name"
                  />
                </div>
                {error.name.length > 2 ? (
                  <p>
                    <MdIcons.MdErrorOutline />
                    &nbsp;{error.name}
                  </p>
                ) : (
                  ""
                )}
                <div
                  style={
                    error.username.length > 2
                      ? {
                          border: ".2rem solid rgba(255,0,0,0.9)",
                          boxShadow: `0px 0px 65px 0px rgba(255,0,0,0.21) `,
                        }
                      : { border: ".2rem solid #445" }
                  }
                  className="authForm username"
                >
                  <label htmlFor="username">
                    <LuIcons.LuAtSign />
                  </label>
                  <input
                    onChange={signupOnChange}
                    value={value.username}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                  />
                </div>
                {error.username.length > 2 ? (
                  <p>
                    <MdIcons.MdErrorOutline />
                    &nbsp;{error.username}
                  </p>
                ) : (
                  ""
                )}
                <div
                  style={
                    error.email.length > 2
                      ? {
                          border: ".2rem solid rgba(255,0,0,0.9)",
                          boxShadow: `0px 0px 65px 0px rgba(255,0,0,0.21) `,
                        }
                      : { border: ".2rem solid #445" }
                  }
                  className="authForm email"
                >
                  <label htmlFor="email">
                    <Io5Icons.IoMailOutline />
                  </label>
                  <input
                    onChange={signupOnChange}
                    value={value.email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@gmail.com"
                  />
                </div>
                {error.email.length > 2 ? (
                  <p>
                    <MdIcons.MdErrorOutline />
                    &nbsp;{error.email}
                  </p>
                ) : (
                  ""
                )}
                <div
                  style={
                    error.password.length > 2
                      ? {
                          border: ".2rem solid rgba(255,0,0,0.9)",
                          boxShadow: `0px 0px 65px 0px rgba(255,0,0,0.21) `,
                        }
                      : { border: ".2rem solid #445" }
                  }
                  className="authForm password"
                >
                  <label htmlFor="password">
                    <Io5Icons.IoLockClosedOutline />
                  </label>
                  <input
                    onChange={signupOnChange}
                    value={value.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Type password"
                  />
                </div>
                {error.password.length > 2 ? (
                  <p>
                    <MdIcons.MdErrorOutline />
                    &nbsp;{error.password}
                  </p>
                ) : (
                  ""
                )}
                <div
                  style={
                    error.repassword.length > 2
                      ? {
                          border: ".2rem solid rgba(255,0,0,0.9)",
                          boxShadow: `0px 0px 65px 0px rgba(255,0,0,0.21) `,
                        }
                      : { border: ".2rem solid #445" }
                  }
                  className="authForm re-password"
                >
                  <label htmlFor="re-password">
                    <Io5Icons.IoLockClosedOutline />
                  </label>
                  <input
                    onChange={signupOnChange}
                    value={value.rePassword}
                    type="password"
                    name="rePassword"
                    id="re-password"
                    placeholder="re-type your password"
                  />
                </div>
                {error.repassword.length > 2 ? (
                  <p>
                    <MdIcons.MdErrorOutline />
                    &nbsp;{error.repassword}
                  </p>
                ) : (
                  ""
                )}
                <div className="radio-button-container">
                  <div className="radio-button">
                    <input
                      onChange={genderOnChange}
                      type="radio"
                      className="radio-button__input"
                      id="male"
                      name="gender"
                    />
                    <label className="radio-button__label" htmlFor="male">
                      <span className="radio-button__custom"></span>
                      Male
                    </label>
                  </div>
                  <div className="radio-button">
                    <input
                      onChange={genderOnChange}
                      type="radio"
                      className="radio-button__input"
                      id="female"
                      name="gender"
                    />
                    <label className="radio-button__label" htmlFor="female">
                      <span className="radio-button__custom"></span>
                      Female
                    </label>
                  </div>
                  <div className="radio-button">
                    <input
                      onChange={genderOnChange}
                      type="radio"
                      className="radio-button__input"
                      id="other"
                      name="gender"
                    />
                    <label className="radio-button__label" htmlFor="other">
                      <span className="radio-button__custom"></span>
                      Other
                    </label>
                  </div>
                </div>
                <button onClick={signupOnClick}>
                  {loader === true ? (
                    <Buttonloader color="var(--color-two)" />
                  ) : (
                    "Sign up"
                  )}
                </button>
              </form>
              <h4>
                Already have a Account? <a href="">Sign in</a>.
              </h4>
            </div>
          </div>
        </section>
      ) : (
        <Verify
          email={value.email}
          id={userId}
          gender={gender}
          name={value.name}
        />
      )}
      <Footer />
    </>
  );
}

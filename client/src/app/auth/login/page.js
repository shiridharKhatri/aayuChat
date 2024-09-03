"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRef, useState } from "react";
import { loginAuth } from "../api";
import { useRouter } from "next/navigation";
import Verify from "../Verify";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import { Io5Icons, MdIcons } from "../../tools/icons/icons";
import Buttonloader from "../../tools/loader/Buttonloader";
export default function page() {
  const [value, setValue] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const successDiv = useRef(null);
  const router = useRouter();
  const loginValueOnChange = (e) => {
    setData({});
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const loginOnCLick = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      let login = await loginAuth(value.email, value.password);
      if (login.success === true && login.status === 200) {
        // router.push("/");
        Cookies.set("token", login.token);
        Cookies.set("id", login.id);
        successDiv.current.style.top = "2rem";
        setTimeout(() => {
          successDiv.current.style.top = "-15rem";
        }, 3000);
        setLoader(false);
      } else if (login.success === true && login.status === 401) {
        setData(login);
        setSuccess(true);
        setLoader(false);
      } else {
        setLoader(false);
        setData(login);
      }
    } catch (error) {
      console.error("Error fetching recent messages:", error.message);
    }
  };
  return (
    <>
      <Navbar position="relative" />
      {!success ? (
        <section className="authSection loginMain">
          <div className="successMessage" ref={successDiv}>
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
            <h3>Successfully logged in!</h3>
          </div>
          <h1 id="fadedBgText">SIGN IN</h1>
          <div className="authPrimary loginCardPrimary">
            <div className="authSecondary loginCardSecondary">
              <div className="firstDivLogin">
                <Image
                  src="/image/main-logo.svg"
                  height="100"
                  width="100"
                  alt="logo"
                />
                <div className="details-login">
                  <h1>Sign in</h1>
                  <p>Please login to continue.</p>
                </div>
              </div>
              <form action="">
                <div
                  style={
                    data.success === false && data.type === "email"
                      ? {
                          border: ".2rem solid rgba(255,0,0,0.9)",
                          boxShadow: `0px 0px 65px 0px rgba(255,0,0,0.21) `,
                        }
                      : { border: ".2rem solid #445", boxShadow: `none` }
                  }
                  className="authForm email"
                >
                  <label htmlFor="emailLogin">
                    <Io5Icons.IoMailOutline />
                  </label>
                  <input
                    value={value.email}
                    onChange={loginValueOnChange}
                    type="email"
                    name={"email"}
                    id="emailLogin"
                    placeholder="example@gmail.com"
                  />
                </div>
                {data.success === false && data.type === "email" ? (
                  <p>
                    <MdIcons.MdErrorOutline />
                    &nbsp;{data.msg}
                  </p>
                ) : (
                  ""
                )}
                <div
                  style={
                    data.success === false && data.type === "password"
                      ? {
                          border: ".2rem solid rgba(255,0,0,0.9)",
                          boxShadow: `0px 0px 65px 0px rgba(255,0,0,0.21) `,
                        }
                      : { border: ".2rem solid #445", boxShadow: `none` }
                  }
                  className="authForm password"
                >
                  <label htmlFor="passwordLogin">
                    {" "}
                    <Io5Icons.IoLockClosedOutline />
                  </label>
                  <input
                    value={value.password}
                    onChange={loginValueOnChange}
                    type="password"
                    name="password"
                    placeholder="Type password..."
                  />
                </div>
                {data.success === false && data.type === "password" ? (
                  <p>
                    <MdIcons.MdErrorOutline />
                    &nbsp;{data.msg}
                  </p>
                ) : (
                  ""
                )}
                <div className="rememberDet">
                  <div className="remember">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me.</label>
                  </div>
                  <h5>Forget password?</h5>
                </div>
                <button onClick={loginOnCLick}>
                  {loader === true ? (
                    <Buttonloader color="var(--color-two)" />
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
              <h4>
                Don't have an Account? <a href="">Sign up</a>.
              </h4>
            </div>
          </div>
        </section>
      ) : (
        <Verify email={value.email} id={data.userId} />
      )}
      <Footer />
    </>
  );
}

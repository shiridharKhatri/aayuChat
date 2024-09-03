"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { changeAvatar } from "./api";
import Buttonloader from "../tools/loader/Buttonloader";
import { GiIcons } from "../tools/icons/icons";
import { male, female } from "../tools/avatar/avatar";
export default function Avatar(props) {
  const [avatarProfile, setAvatar] = useState("");
  const [letter, setLetter] = useState("");
  const [loader, setLoader] = useState({ random: false, selected: false });

  const avatarOption = (src) => {
    setAvatar(src);
  };

  let name = props.name;
  let gender = props.gender;
  const setRandomAvatar = async () => {
    setLoader((prevData) => ({ ...prevData, random: true }));
    try {
      let random = Math.floor(Math.random() * (31 - 1 + 1)) + 1;
      let image = gender === "male" ? male[random].path : female[random].path;
      let data = await changeAvatar(props.id, image);
      if (data.success === true) {
        setLoader((prevData) => ({ ...prevData, random: false }));
      } else {
        setLoader((prevData) => ({ ...prevData, random: false }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setAvatarOnClick = async () => {
    setLoader((prevData) => ({ ...prevData, selected: true }));

    try {
      let data = await changeAvatar(props.id, avatarProfile);
      if (data.success === true) {
        setLoader((prevData) => ({ ...prevData, selected: false }));
      } else {
        setLoader((prevData) => ({ ...prevData, selected: false }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let letterFirst = name.slice(0, 1);
    setLetter(letterFirst);
  }, []);
  return (
    <section className="ChooseAvatar">
      <div className="profileDisplay">
        {!avatarProfile || avatarProfile === "" ? (
          <div className="noAvatar">
            <h1>{letter}</h1>
          </div>
        ) : (
          <Image
            priority={true}
            src={avatarProfile}
            height={130}
            width={130}
            alt="avatar"
          />
        )}

        <p>Choose avatar</p>
      </div>
      <div className="avatarDisplay">
        {gender === "male"
          ? male.map((e, index) => {
              return (
                <div
                  onClick={() => {
                    avatarOption(e.path);
                  }}
                  key={index}
                  className="avatarSec"
                >
                  <Image
                    priority={true}
                    src={e.path}
                    height={90}
                    width={90}
                    alt="profileAvatar"
                  />
                </div>
              );
            })
          : female.map((e, index) => {
              return (
                <div
                  onClick={() => {
                    avatarOption(e.path);
                  }}
                  key={index}
                  className="avatarSec"
                >
                  <Image
                    priority={true}
                    src={e.path}
                    height={90}
                    width={90}
                    alt="profileAvatar"
                  />
                </div>
              );
            })}
        <div
          className="noImage"
          onClick={() => {
            avatarOption("");
          }}
        >
          <h1>{letter}</h1>
        </div>
      </div>
      <div className="setProfileBtn">
        {loader.random === true ? (
          <button onClick={setRandomAvatar}>
            <Buttonloader color="var(--primary-color)"/>
          </button>
        ) : (
          <button onClick={setRandomAvatar}>
            <GiIcons.GiPerspectiveDiceSixFacesRandom />
            &nbsp;Random profile
          </button>
        )}
        {loader.selected === true ? (
          <button id="setProfileBtnPrimary" onClick={setAvatarOnClick}>
            <Buttonloader color="var(--primary-color)"/>
          </button>
        ) : (
          <button id="setProfileBtnPrimary" onClick={setAvatarOnClick}>
            {!avatarProfile || avatarProfile === "" ? (
              <div className="noAvatarSec">
                <h1>{letter}</h1>
              </div>
            ) : (
              <Image src={avatarProfile} height={20} width={20} alt="avatar" />
            )}
            Set profile
          </button>
        )}
      </div>
    </section>
  );
}

"use client";
import Cookies from "js-cookie";
import { createContext, useEffect } from "react";
export const ContextProvider = createContext();
import React, { useState } from "react";
export const StateProvider = ({ children }) => {
  let host = process.env.NEXT_PUBLIC_HOST;
  const [recentMessage, setRecentmsg] = useState(null);
  const fetchProfile = async (id) => {
    try {
      const response = await fetch(`${host}/auth/fetchbyid/${id}`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        cache: "default",
      });
      const responseData = await response.json();
      if (responseData.success === true) {
        return responseData;
      } else {
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRecentMessage = async () => {
    try {
      const response = await fetch(
        `${host}/message/api/recent-message/${Cookies.get("id")}`,
        {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            "auth-token": Cookies.get("token"),
          },
          cache: "default",
        }
      );
      const responseData = await response.json();
      if (responseData.success === true) {
        setRecentmsg(responseData);
        console.log(responseData)
      } else {
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecentMessage();
  }, []);
  return (
    <ContextProvider.Provider value={{ fetchProfile, recentMessage, fetchRecentMessage }}>
      {children}
    </ContextProvider.Provider>
  );
};

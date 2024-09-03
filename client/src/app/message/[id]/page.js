"use client";
import Image from "next/image";
import { Fa6Icons, HiIcons, Io5Icons, RiIcons } from "../../tools/icons/icons";
import React, { useContext, useEffect, useState } from "react";
import Messagebox from "./Messagebox";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { ContextProvider } from "../../context/State";
import moment from "moment";
import { useRouter } from "next/navigation";
export default function page({ params }) {
  let router = useRouter();
  const [searchUser, setSearchuser] = useState(null);
  const [onlineUser, setOnlineuser] = useState(null);
  const [filterValue, setFilter] = useState("chat");
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState([]);
  const [messageCreatedDate, setMessagecreateddate] = useState("");
  const { fetchProfile, recentMessage, fetchRecentMessage } =
    useContext(ContextProvider);

  const searchUserOnChange = () => {};
  const filterChange = (filter) => {
    setFilter(filter);
  };
  useEffect(() => {
    let newSocket = io(process.env.NEXT_PUBLIC_HOST);
    newSocket.emit("user-online", Cookies.get("id"));
    setSocket(newSocket);
  }, []);

  const sendMessage = (value, reply) => {
    function generateRandomNumber() {
      const min = 10000000;
      const max = 99999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const random8DigitNumber = generateRandomNumber();
    const newMessage = {
      _id: random8DigitNumber,
      content: value,
      reply,
      date: new Date(),
    };
    let allData = {
      receiver: params.id,
      random8DigitNumber,
      value,
      id: Cookies.get("id"),
    };
    socket?.emit("filter-user", allData);
    socket?.emit("is-typing", {
      sender: Cookies.get("id"),
      receiver: params.id,
      status: false,
    });
    let newData;
    if (
      message.length > 0 &&
      message[message.length - 1].sender === Cookies.get("id")
    ) {
      newData = {
        ...message[message.length - 1],
        data: [...message[message.length - 1].data, newMessage],
      };
      setMessage([...message.slice(0, -1), newData]);
    } else {
      newData = {
        data: [newMessage],
        sender: Cookies.get("id"),
        date: new Date(),
      };
      setMessage([...message, newData]);
    }
  };
  function compareDates(a, b) {
    return new Date(a.lastMessage.time) - new Date(b.lastMessage.time);
  }
  useEffect(() => {
    try {
      const fetchMessage = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/message/api/get-private-message`,
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              "auth-token": Cookies.get("token"),
            },
            body: JSON.stringify({
              sender: Cookies.get("id"),
              receiver: params.id,
            }),
            cache: "default",
          }
        );
        const responseData = await response.json();
        if (responseData.success === true) {
          if (Array.isArray(responseData.message.message)) {
            setMessage([...message, ...responseData.message.message]);
            setMessagecreateddate(responseData.message.messageCreatedDate);
          } else {
            console.error(
              "Message data is not an array:",
              responseData.message.message
            );
          }
        } else {
          console.log(responseData);
        }
      };

      fetchMessage();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    socket?.on("receive-message", (messageData) => {
      let receive = new Audio("/audio/receive.mp3");
      receive.play();
      fetchRecentMessage();
      if (
        messageData.sender === params.id &&
        messageData.receiver === Cookies.get("id")
      ) {
        setMessage((prevMessages) => {
          if (
            prevMessages.length > 0 &&
            prevMessages[prevMessages.length - 1].sender === messageData.sender
          ) {
            return [
              ...prevMessages.slice(0, -1),
              {
                ...prevMessages[prevMessages.length - 1],
                data: [
                  ...prevMessages[prevMessages.length - 1].data,
                  {
                    _id: messageData.data._id,
                    content: messageData.data.content,
                    reply: messageData.data.reply,
                    date: messageData.data.date,
                  },
                ],
              },
            ];
          } else {
            let newData = {
              data: [
                {
                  _id: messageData.data._id,
                  content: messageData.data.content,
                  reply: messageData.data.reply,
                  date: messageData.data.date,
                },
              ],
              sender: messageData.sender,
              date: messageData.date,
            };
            return [...prevMessages, newData];
          }
        });
        // chatContainerRef.current.scrollTo({
        //   top: chatContainerRef.current.scrollHeight,
        //   behavior: "smooth",
        // });
      }
    });
    return () => {
      socket?.off("receive-message");
    };
  }, [socket]);
  useEffect(() => {
    socket?.on("online-data", (data) => {
      setOnlineuser(data);
    });
  }, [socket]);
  const number = [1423, 2413, 35123];
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
            <div className="btnsSetting">
              <button id="crownBtn">
                <Fa6Icons.FaCrown /> <span>10</span>
              </button>
              <button>
                <RiIcons.RiSettings3Fill />
              </button>
            </div>
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
              <button
                onClick={() => {
                  filterChange("chat");
                }}
                style={
                  filterValue === "chat"
                    ? {
                        background: "var(--primary-color)",
                        color: "var(--color-two)",
                      }
                    : {
                        background: "transparent",
                        color: "var(--primary-color)",
                      }
                }
              >
                Chat&nbsp;
                <Io5Icons.IoChatbubbleEllipsesSharp />
              </button>
              <button
                onClick={() => {
                  filterChange("room");
                }}
                style={
                  filterValue === "room"
                    ? {
                        background: "var(--primary-color)",
                        color: "var(--color-two)",
                      }
                    : {
                        background: "transparent",
                        color: "var(--primary-color)",
                      }
                }
              >
                Groups&nbsp;
                <HiIcons.HiUserGroup />
              </button>
            </div>
          </div>
          {recentMessage === null || recentMessage.success !== true ? (
            <div className="cardMain .cardMain-loader">
              {number.map((e) => {
                return (
                  <div key={e} className="primaryCard primaryCard-loader">
                    <div className="cards cards-loader">
                      <div className="image image-load"></div>
                      <div className="content content-loader">
                        <h2>
                          <span
                            style={{ borderRadius: "3rem" }}
                            className="spanLoaderOne"
                          ></span>{" "}
                          <span
                            style={{ borderRadius: "3rem" }}
                            className="spanLoaderTwo"
                          ></span>
                        </h2>
                        <h3>
                          <span className="messageLoaderOne"></span>{" "}
                          <span className="messageLoadertwo"></span>
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {filterValue === "room" ? (
                <div className="cardMain">
                  <div className="primaryCard">
                    <div className="cards">
                      <div className="image">
                        <Image
                          style={{ background: "orange" }}
                          src={"/image/group.png"}
                          alt="profile"
                          height={100}
                          width={100}
                        />
                      </div>
                      <div className="content">
                        <div className="nameDetailsSection">
                          <h2>Group name</h2>
                          <span>5:11 PM</span>
                        </div>
                        <h3>
                          <span id="messageText">Hi How are you</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cardMain">
                  {recentMessage?.recentMessage
                    .sort(compareDates)
                    .reverse()
                    .map((e, index) => {
                      return (
                        <div
                          key={index}
                          className="primaryCard"
                          style={
                            params.id === e.receiver.id
                              ? {
                                  background: "#44445536",
                                  borderRight: `0.2rem solid var(--primary-color)`,
                                }
                              : {
                                  background: "transparent",
                                  borderRight: "none",
                                }
                          }
                        >
                          <div
                            className="cards"
                            onClick={() => {
                              router.push(`/message/${e.receiver.id}`);
                            }}
                          >
                            <div className="image">
                              <div
                                className="onlineStatus"
                                style={{
                                  background:
                                    onlineUser &&
                                    onlineUser.some(
                                      (user) =>
                                        user &&
                                        user.id === e.receiver.id &&
                                        user.isOnline
                                    )
                                      ? "#00ff00"
                                      : "#445",
                                }}
                              ></div>

                              <Image
                                style={{
                                  border:
                                    onlineUser &&
                                    onlineUser.some(
                                      (user) =>
                                        user &&
                                        user.id === e.receiver.id &&
                                        user.isOnline
                                    )
                                      ? ".2rem solid #00ff00"
                                      : ".2rem solid #445",
                                }}
                                src={e.receiver.image}
                                alt="profile"
                                height={100}
                                width={100}
                              />
                            </div>
                            <div className="content">
                              <div className="nameDetailsSection">
                                <h2 id="usersName">
                                  {e.receiver.name}{" "}
                                  {e.receiver.gender === "male" ? (
                                    <span
                                      style={{
                                        background: "#2da9d9",
                                        width: "3rem",
                                        color: `var(--color-two)`,
                                      }}
                                    >
                                      <Io5Icons.IoMale />
                                    </span>
                                  ) : e.receiver.gender === "female" ? (
                                    <span
                                      style={{
                                        background: "#b33474",
                                        width: "3rem",
                                        color: `var(--color-two)`,
                                      }}
                                    >
                                      <Io5Icons.IoFemale />
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        background: "#445",
                                        width: "3rem",
                                        color: `var(--color-two)`,
                                      }}
                                    >
                                      <Io5Icons.IoMaleFemale />
                                    </span>
                                  )}
                                </h2>
                                <span>
                                  {moment().diff(
                                    moment(e.lastMessage.time),
                                    "hours"
                                  ) < 24
                                    ? moment(e.lastMessage.time).format(
                                        "h:mm A"
                                      )
                                    : moment(e.lastMessage.time).fromNow(true) +
                                      " ago"}
                                </span>
                              </div>
                              <h3>
                                <span
                                  id="messageText"
                                  style={
                                    e.lastMessage.isNew === true
                                      ? { fontWeight: "bold", opacity: "1" }
                                      : { fontWeight: "400", opacity: "0.5" }
                                  }
                                >
                                  {e.lastMessage.msg}
                                </span>{" "}
                                {e.lastMessage.isNew === true ? (
                                  <span id="notificationMessage">
                                    <Image
                                      src="/image/sec-logo.svg"
                                      height={10}
                                      width={10}
                                    />
                                  </span>
                                ) : (
                                  ""
                                )}
                              </h3>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </>
          )}
        </div>
        {/* <div className="closeDiv"></div> */}
      </div>

      <Messagebox
        user={params.id}
        socket={socket}
        sendMessage={sendMessage}
        message={message}
        fetchProfile={fetchProfile}
        onlineUser={onlineUser}
        messageCreatedDate={messageCreatedDate}
      />
    </section>
  );
}

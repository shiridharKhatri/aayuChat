import Cookies from "js-cookie";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BsIcons,
  Io5Icons,
  FaIcons,
  GrIcons,
  TfiIcons,
  RxIcons,
} from "../../tools/icons/icons";
import Typing from "../../tools/loader/Typing";
import EmojiPicker from "emoji-picker-react";
import { ContextProvider } from "../../context/State";
const audio =
  typeof window !== "undefined"
    ? {
        send: new Audio("/audio/send.mp3"),
        typing: new Audio("/audio/typing.mp3"),
      }
    : null;
export default function Messagebox(props) {
  const { fetchRecentMessage } = useContext(ContextProvider);
  const [messageVal, setMessageval] = useState("");
  const [profile, setProfileData] = useState(null);

  const [boolean, setBoolean] = useState({
    send: false,
    delivered: false,
    isTyping: false,
  });

  const [recording, setRecording] = useState(false);
  const [emojiBoolean, setEmojiboolean] = useState(false);
  const [reply, setReply] = useState("");
  const mediaRecorderRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageSentIcon = useRef(null);
  const replyDisplay = useRef(null);
  const chunksRef = useRef([]);
  let id = Cookies.get("id");
  let currentDate = new Date();
  const replyMessage = (id) => {
    let text = document.getElementById(id);
    setReply(text.innerText);
    replyDisplay.current.style.display = "flex";
  };
  const closeReplyDisplay = () => {
    setReply("");
    replyDisplay.current.style.display = "none";
  };
  const recordVoice = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
          chunksRef.current.push(event.data);
        };
        mediaRecorderRef.current = mediaRecorder;
        console.log(mediaRecorderRef.current);
        mediaRecorder.start();
        setRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
    setTimeout(() => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
        setRecording(false);
        const audioBlob = new Blob(chunksRef.current, { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        console.log(audioBlob);
        audio.play();
      }
    }, 7000);
  };
  const showTime = (id) => {
    let sendDate = document.getElementById(id);
    if (sendDate.style.display === "flex") {
      sendDate.style.display = "none";
    } else {
      sendDate.style.display = "flex";
    }
  };

  const messageValOnChange = (e) => {
    setMessageval(e.target.value);
    if (e.target.value === "") {
      messageSentIcon.current.style.transform = "rotate(-45deg)";
      props.socket?.emit("is-typing", {
        sender: id,
        receiver: props.user,
        status: false,
      });
    } else {
      messageSentIcon.current.style.transform = "rotate(0deg)";
      props.socket?.emit("is-typing", {
        sender: id,
        receiver: props.user,
        status: true,
      });
    }
  };

  const handleEmojiClick = (event) => {
    setMessageval((prevInputValue) => prevInputValue + event.emoji);
  };

  const showEmoji = () => {
    if (emojiBoolean === false) {
      setEmojiboolean(true);
    } else {
      setEmojiboolean(false);
    }
  };

  const fileValue = (e) => {
    const sendImage = document.getElementById("sendImage");
    sendImage.style.display = "block";
    if (e.target.files[0].type === "application/pdf") {
      sendImage.src = "/image/file/pdf.png";
    } else if (
      e.target.files[0].type === "video/mp4" ||
      e.target.files[0].type === "video/quicktime"
    ) {
      sendImage.src = "/image/file/mp4.png";
    } else if (
      e.target.files[0].type === "audio/mpeg" ||
      e.target.files[0].type === "audio/mp3"
    ) {
      sendImage.src = "/image/file/mp3.png";
    } else {
      sendImage.src = URL.createObjectURL(e.target.files[0]);
    }
  };
  const sendMessageOnClick = async (e) => {
    e.preventDefault();
    replyDisplay.current.style.display = "none";
    let headersList = {
      Accept: "*/*",
      "auth-token": Cookies.get("token"),
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      sender: id,
      receiver: props.user,
      messageData: {
        data: {
          content: messageVal,
          reply: reply,
        },
        sender: id,
      },
    });
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/message/api/send`,
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
    let data = await response.json();
    if (data.success === true) {
      fetchRecentMessage();
    }
    audio.send.play();
    props.sendMessage(messageVal, reply);
    setMessageval("");
    messageSentIcon.current.style.transform = "rotate(-45deg)";
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await props.fetchProfile(props.user);
      setProfileData(data);
    };
    fetchData();
  }, [props.fetchProfile]);

  useEffect(() => {
    props.socket?.on("typing-status", (data) => {
      if (data.sender === props.user && data.receiver === id) {
        audio.typing.loop = true;
        setBoolean((prevdata) => ({
          ...prevdata,
          isTyping: data.status,
        }));
        if (data.status === true) {
          audio.typing.play();
        } else {
          audio.typing.pause();
        }
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    });
    return () => {
      props.socket?.off("typing-status");
    };
  }, [props.socket]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        console.log("Escape key clicked");
      }
    };
    window.document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="container-two" style={{ justifyContent: `space-between` }}>
      <div className="headerDetails">
        <div className="menuPush">
          <BsIcons.BsChevronCompactRight />
        </div>
        {profile === null || !profile.success ? (
          <div className="user-details user-details-loader">
            <div className="image-loader"></div>
            <div className="det">
              <h1></h1>
              <p></p>
            </div>
          </div>
        ) : (
          <div className="user-details">
            <Image
              style={{ borderRadius: "50%" }}
              src={profile?.user.image}
              alt="profile"
              height={100}
              width={100}
            />
            <div className="det">
              <h1>{profile?.user.name}</h1>
              {props.onlineUser === null ? (
                <p>
                  <span id="offlineStatusOnline"></span>
                  Offline
                </p>
              ) : (
                (() => {
                  const user = props.onlineUser.find(
                    (e) => e.id === props.user
                  );
                  if (user) {
                    return user.isOnline ? (
                      <p key={user.id}>
                        <span
                          style={{ background: "#00ff00" }}
                          id={`offlineStatusOnline`}
                        ></span>
                        Online
                      </p>
                    ) : (
                      <p key={user.id}>
                        <span id="offlineStatusOnline"></span>
                        {moment(user.offlineDate).fromNow()}
                      </p>
                    );
                  } else {
                    return (
                      <p>
                        <span id="offlineStatusOnline"></span>
                        Offline
                      </p>
                    );
                  }
                })()
              )}
            </div>
          </div>
        )}
        <div className="assests">
          <button id="callingIcon">
            <Io5Icons.IoCall />
            <span>Call</span>
          </button>
          <button>
            <Io5Icons.IoVideocam />
          </button>
          <button>
            <Io5Icons.IoEllipsisVerticalSharp />
          </button>
        </div>
      </div>

      <div
        onClick={() => {
          setEmojiboolean(false);
        }}
        ref={chatContainerRef}
        className="chatBoxMain"
        id="mainChatBox"
      >
        {!props.message || props.message.length === 0 ? (
          <div className="noMessageWithPerson">
            <h4>
              Say hi👋 to <span>person</span> or skip.
            </h4>
            <button>Skip</button>
          </div>
        ) : (
          <>
            <div className="messageCreatedDate">
              <h3
                style={{
                  textAlign: "center",
                  color: `var(--color)`,
                  fontWeight: "400",
                  marginBottom: "2rem",
                }}
              >
                {moment(props.messageCreatedDate).isValid()
                  ? moment(props.messageCreatedDate).format("LLL")
                  : moment(currentDate).format("LLL")}
              </h3>
            </div>
            {props.message?.map((e, index) => {
              return (
                <div
                  key={index}
                  className={`mainChatDiv ${
                    e.sender === id ? "right" : "left"
                  }`}
                >
                  {e.sender !== id ? (
                    <>
                      {profile === null || !profile.success ? (
                        <div className="chatImageLoader"></div>
                      ) : (
                        <Image
                          style={{ borderRadius: "50%" }}
                          src={profile?.user.image}
                          alt="profile"
                          height={100}
                          width={100}
                        />
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  <div className="chatDet">
                    {e.data.map((msg, ind) => {
                      return (
                        <div key={ind} className="messageContentSection">
                          <div className="privateMsgPar">
                            <h6 id={`${msg._id}date`}>
                              {moment().diff(moment(msg.date), "hours") < 24
                                ? moment(msg.date).format("h:mm A")
                                : moment(msg.date).fromNow(true) + " ago"}{" "}
                              &#10003; sent
                            </h6>

                            <p
                              id={`${msg._id}message`}
                              onClick={() => {
                                showTime(`${msg._id}date`);
                              }}
                              key={ind}
                              className="chatMessage"
                            >
                              {msg.reply === "" || !msg.reply ? (
                                ""
                              ) : (
                                <span id="replyId">{msg.reply}</span>
                              )}
                              <span
                                style={
                                  e.sender === id && e.data[0]._id === msg._id
                                    ? { borderRadius: "3rem 3rem 1rem 3rem" }
                                    : e.sender === id &&
                                      e.data[e.data.length - 1]._id === msg._id
                                    ? { borderRadius: "3rem 1rem 3rem 3rem" }
                                    : e.sender !== id &&
                                      e.data[0]._id === msg._id
                                    ? { borderRadius: "3rem 3rem 3rem 1rem" }
                                    : e.sender !== id &&
                                      e.data[e.data.length - 1]._id === msg._id
                                    ? { borderRadius: "1rem 3rem 3rem 3rem" }
                                    : e.sender === id &&
                                      e.data[0]._id !== msg._id &&
                                      e.data[e.data.length - 1]._id !== msg._id
                                    ? { borderRadius: "3rem 1rem 1rem 3rem" }
                                    : e.data.length === 1
                                    ? { borderRadius: "3rem" }
                                    : { borderRadius: "1rem 3rem 3rem 1rem" }
                                }
                                id={`${msg._id}indMessage`}
                                className="indMessageP"
                              >
                                {msg.content}
                              </span>
                            </p>
                          </div>
                          <span
                            onClick={() => {
                              replyMessage(`${msg._id}indMessage`);
                            }}
                          >
                            <FaIcons.FaReply />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {boolean.isTyping === true ? (
              <div className="mainChatDiv left mainChatDivTypedLoader">
                <Image
                  style={{ borderRadius: "50%" }}
                  src={profile?.user.image}
                  alt="profile"
                  height={100}
                  width={100}
                />
                <div className="chatDet">
                  <div className="messageContentSection">
                    <h6>Typing...</h6>
                    <p className="loaderTyping">
                      <Typing />
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <div className="typeMessage">
        <div className="attachMentDisplaySection">
          <div className="sendImageDisplay">
            <span><RxIcons.RxCross2/></span>
            <img id="sendImage" alt="sendImage" />
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            id="attachment"
            onChange={fileValue}
          />
        </div>
        <div className="emojiPicker">
          <EmojiPicker
            theme="dark"
            skinTonesDisabled={true}
            open={emojiBoolean}
            onEmojiClick={handleEmojiClick}
          />
        </div>

        <form action="">
          <div className="inputForm-primary">
            <div className="repltTextDisplay" ref={replyDisplay}>
              <div className="firstReplydisplay">
                <h4>
                  {" "}
                  <FaIcons.FaReply />
                  &nbsp;Reply to {profile?.user.name}
                </h4>
                <p>{reply}</p>
              </div>
              <div className="secondReplydisplay">
                <h1 onClick={closeReplyDisplay}>
                  <RxIcons.RxCross2 />
                </h1>
              </div>
            </div>
            <div className="inputForm">
              <div className="skipPerson">
                <TfiIcons.TfiReload />
              </div>
              <input
                onClick={() => {
                  setEmojiboolean(false);
                }}
                value={messageVal}
                onChange={messageValOnChange}
                type="text"
                placeholder="Type your text..."
              />
              <label
                htmlFor="attachment"
                className="attachmentBtn inputMenuSec"
              >
                <GrIcons.GrAttachment />
              </label>
              <label
                onClick={recordVoice}
                htmlFor="#"
                className="voiceMail inputMenuSec"
              >
                <FaIcons.FaMicrophone />
              </label>
              <label
                onClick={showEmoji}
                htmlFor="#"
                className="emojiKey inputMenuSec"
              >
                <BsIcons.BsEmojiLaughing />
              </label>
            </div>
          </div>

          <button
            disabled={messageVal === "" || messageVal.length === 0}
            ref={messageSentIcon}
            onClick={sendMessageOnClick}
          >
            <Io5Icons.IoSend />
          </button>
        </form>
      </div>
    </div>
  );
}

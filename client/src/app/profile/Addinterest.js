import React, { useEffect, useRef, useState } from "react";
import { FiIcons } from "../tools/icons/icons";
import { addInterest } from "./api";
import Cookies from "js-cookie";
import Buttonloader from "../tools/loader/Buttonloader";

export default function Addinterest(props) {
  let array = props.interestData;
  const [tags, setTags] = useState(array);
  const [inputTag, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  let interestSec = useRef(null);
  const addTagsOnChange = (e) => {
    setInput(e.target.value);
  };
  const addTags = (e) => {
    e.preventDefault();
    setTags([...tags, inputTag]);
    setInput("");
  };
  const removetag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };
  const cancelCick = () => {
    interestSec.current.style.display = "none";
  };
  const applyInterestOnClick = async () => {
    setLoader(true);
    try {
      let interests = await addInterest(
        tags,
        Cookies.get("id"),
        Cookies.get("token")
      );
      if (interests && interests.success === true) {
        window.location.reload();
      } else {
        console.log("Failed to add interest");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="addInterestMainSection"
      className="addInterestMainSection"
      ref={interestSec}
    >
      <div className="interestMainCard-primary">
        <div className="interestMainCard-secondary">
          <form action="">
            <input
              onChange={addTagsOnChange}
              value={inputTag}
              type="text"
              placeholder="Add your interest"
            />
            <button onClick={addTags} disabled={tags?.length >= 23}>
              <FiIcons.FiPlusCircle />
            </button>
          </form>
          <div className="screenSection">
            {tags?.map((e, index) => {
              return (
                <p
                  key={index}
                  onClick={() => {
                    removetag(index);
                  }}
                >
                  {e}
                </p>
              );
            })}
          </div>
          <p id="tagNote">
            Note: The tag limit is restricted to a maximum of 27 entries
          </p>
          <div className="interestAddButton">
            <button onClick={cancelCick}>Cancel</button>
            <button
              style={{
                background: "var(--primary-color)",
                color: `var(--color-two)`,
                fontWeight: "400",
              }}
              onClick={applyInterestOnClick}
            >
              {loader === true ? (
                <Buttonloader color="var(--color-two)" />
              ) : (
                "Apply"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

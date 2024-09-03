import React, { useState } from "react";
import { RxIcons } from "../tools/icons/icons";
import { deleteAccount } from "./api";
import Cookies from "js-cookie";

export default function Deleteaccount(props) {
  const [emailValue, setValue] = useState("");
  const emailValueOnChange = (e) => {
    setValue(e.target.value);
  };
  const deleteAccountOnCLick = async () => {
    try {
      const deleteAc = await deleteAccount(
        Cookies.get("id"),
        Cookies.get("token")
      );
      if (deleteAc.success === true) {
        console.log(deleteAc.msg);
      } else {
        console.log(deleteAc.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelDelete = () => {
    props.reff.current.style.display = "none";
  };
  return (
    <div
      ref={props.reff}
      //   style={{ display: "flex" }}
      id="addInterestMainSection"
      className="addInterestMainSection"
    >
      <div className="interestMainCard-primary">
        <div className="interestMainCard-secondary deleteMainCard">
          <h1>Delete your account</h1>
          <h5>
            Are you sure you wish to proceed with deleting your account?
            Deleting your account will result in the permanent loss of the
            following items
          </h5>
          <ul>
            <li>
              <span>
                <RxIcons.RxCrossCircled />
              </span>
              All messages associated with your account will be permanently
              deleted.
            </li>
            <li>
              <span>
                <RxIcons.RxCrossCircled />
              </span>
              All account information, including personal details, will be
              removed from our records.
            </li>
            <li>
              <span>
                <RxIcons.RxCrossCircled />
              </span>
              Access to your account will no longer be available after deletion.
            </li>
            <li>
              <span>
                <RxIcons.RxCrossCircled />
              </span>
              Your account will be promptly deleted upon your confirmation.
            </li>
          </ul>
          <p>
            Please type "
            <span style={{ color: "var(--primary-color)" }}>{props.email}</span>
            " to delete your account
          </p>
          <input
            value={emailValue}
            onChange={emailValueOnChange}
            type="text"
            placeholder="example@gmail.com"
          />
          <div className="deleteAcBtns">
            <button onClick={cancelDelete}>Cancel</button>
            <button
              onClick={deleteAccountOnCLick}
              disabled={emailValue !== props.email}
              id="confirmDelete"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

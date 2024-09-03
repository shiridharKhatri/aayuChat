import React from 'react'
import { HiIcons, Io5Icons, GiIcons, MdIcons } from '../tools/icons/icons'
import Image from 'next/image'
export default function Header() {
  return (
    <>
    <header>
        <div className="firstSection">
        <h1 id="absoluteHeader">AAYU</h1>
        <h1>
          Start <span>Chatting</span> with new peoples.
        </h1>
        <p>
          Make group and start chatting with friends or connect with random
          person.
        </p>
        <div className="btnss">
          <button>
            <HiIcons.HiUserGroup />
            &nbsp;Create Room
          </button>
          <button id="randomChat">
            <Io5Icons.IoChatbubbleEllipsesSharp />
            &nbsp;Random chat
          </button>
        </div>
      </div>
      <div className="secondSection">
        <Image
          id="headerImage"
          src="/image/header.gif"
          height={500}
          width={300}
          alt="Header"
        />
      </div>
    </header>
    <section className="headBanner">
      <div className="primaryBanner">
        <div className="secondaryBanner">
          <div className="bannerDetailsBox firstChat">
            <h1>
              {" "}
              <Io5Icons.IoChatbubbleEllipsesSharp />
            </h1>
            <h2>Private chat</h2>
            <p>
              Privately connect with others using their IDs or email addresses.
            </p>
          </div>
          <div className="bannerDetailsBox secondChat">
            <h1>
              <HiIcons.HiUserGroup />
            </h1>
            <h2>Create group</h2>
            <p>
              Create dynamic groups and engage in lively conversations with
              others, fostering a sense of community.
            </p>
          </div>
          <div className="bannerDetailsBox thirdSection">
            <h1>
              <GiIcons.GiCardRandom />
            </h1>
            <h2>Random peoples</h2>
            <p>
              Connect and chat with people from around the world, making global
              conversations accessible at your fingertips.
            </p>
          </div>
          <div className="bannerDetailsBox fourthSection">
            <h1>
              <MdIcons.MdPrivacyTip />
            </h1>
            <h2>Security</h2>
            <p>
              Secure chats on our servers, with shared photos automatically
              deleted within 24 hours for added privacy
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

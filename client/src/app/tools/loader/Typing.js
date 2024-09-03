import Image from "next/image";
import React from "react";

export default function Typing() {
  return (
    <div className="typingLoader">
      <div className="typing-one typingDots">
        <Image
          src="/image/sec-logo.svg"
          alt="typingLoader"
          height={10}
          width={10}
        />
      </div>
      <div className="typing-two typingDots">
        <Image
          src="/image/sec-logo.svg"
          alt="typingLoader"
          height={10}
          width={10}
        />
      </div>
      <div className="typing-three typingDots">
        <Image
          src="/image/sec-logo.svg"
          alt="typingLoader"
          height={10}
          width={10}
        />
      </div>
    </div>
  );
}

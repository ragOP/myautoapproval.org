import { useEffect, useState } from "react";

function TypingText({ text, speed = 24, className = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let index = 0;

    const intervalId = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(intervalId);
      }
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [text, speed]);

  return <p className={className}>{displayed}</p>;
}

export default TypingText;

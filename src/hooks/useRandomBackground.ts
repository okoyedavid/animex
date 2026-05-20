import { useEffect, useState } from "react";

export function useRandomBackground(): string {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const imageNumber = Math.floor(Math.random() * 6) + 1;
    setBackgroundImage(`url('/download${imageNumber}.jpeg')`);
  }, []);

  return backgroundImage;
}

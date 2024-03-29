import { useEffect, useState } from "react";
import Image from "next/image";
import { Graphic } from "../sections/Sections";

const ImagePrefetcher = ({ images }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [allImagesCycled, setAllImagesCycled] = useState(!images);
  const imgs = images ? (Array.isArray(images) ? images : [images]) : [];

  useEffect(() => {
    if (imgs.length === 0) {
      setAllImagesCycled(true);
      return;
    }

    const intervalId = setInterval(() => {
      setImgIndex((prevIndex) => {
        if (prevIndex + 1 >= imgs.length) {
          setAllImagesCycled(true);
          clearInterval(intervalId);
        }
        return (prevIndex + 1) % imgs.length;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, [imgs]);

  return allImagesCycled ? null : (
      <Graphic
        className="graphic__none"
        img={imgs[imgIndex]}
        type={imgs[imgIndex].media}
        priority={true}
      />
  );
};

export default ImagePrefetcher;

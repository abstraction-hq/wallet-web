import { useState } from "react";
import { default as NextImage, ImageProps } from "next/image";

const Image = ({ className, ...props }: ImageProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const isVideo = (url: string): boolean => {
    if (!url) return false;
    const videoExtensions = ["mp4"];
    const extension = url.split(".").pop();
    return extension ? videoExtensions.includes(extension) : false;
  };

  if (isVideo(props.src as string)) {
    return (
      <video
        className="object-cover transform group-hover:scale-110 transition-transform duration-300"
        width={props.width}
        height={props.height}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={props.src as string} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <NextImage
      className={`inline-block align-top opacity-0 transition-opacity ${
        loaded && "opacity-100"
      } ${className || ""}`}
      onLoad={() => setLoaded(true)}
      {...props}
    />
  );
};

export default Image;

import { useEffect, useState } from 'react';
import thumbnailImg from '@assets/thumbnail.png';

function SmartImage({ src, ...props }) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.src = src;

    img.onload = () => {
      if (isMounted) setImgSrc(src);
    };

    img.onerror = () => {
      if (isMounted) setImgSrc(thumbnailImg);
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <img 
      src={imgSrc || thumbnailImg}
      alt=""
      className="card-img-top"
      {...props}
    />
  );
}

export default SmartImage;

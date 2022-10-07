import { useEffect, useState } from "react";
import Lightbox from "./Lightbox";
import "./styles.css";

const UNSPLASH_TOKEN = "IuUIrEzS18wcSe_gUpbNxXdePlMrIc9l4kAVjnO5rB8";

export default function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [activeLightboxImageIndex, setActiveLightboxImageIndex] = useState(
    null
  );
  const fetchImages = () => {
    fetch(
      `https://api.unsplash.com/photos?client_id=${UNSPLASH_TOKEN}&per_page=30&page=${page}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPage(page + 1);
        setImages((prevImages) => [...prevImages, ...json]);
      });
  };
  useEffect(() => {
    fetchImages();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollPos = Math.ceil(
      window.innerHeight + document.documentElement.scrollTop
    );
    if (
      !(
        scrollPos - 10 < document.documentElement.offsetHeight &&
        scrollPos + 10 > document.documentElement.offsetHeight
      ) ||
      isFetching
    )
      return;
    setIsFetching(true);
    console.log(isFetching);
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchImages();
    setIsFetching(false);
  };

  return (
    <>
      <div className="gallery">
        {images.map((image, index) => (
          <div
            className="thumbnail"
            key={image.id}
            onClick={() => setActiveLightboxImageIndex(index)}
          >
            <img src={image.urls.thumb} />
          </div>
        ))}
      </div>
      {activeLightboxImageIndex !== null && (
        <Lightbox
          image={images[activeLightboxImageIndex]}
          closeLightBox={() => setActiveLightboxImageIndex(null)}
          onLeft={() =>
            setActiveLightboxImageIndex((prevIndex) =>
              prevIndex !== 0 ? prevIndex - 1 : 0
            )
          }
          onRight={() =>
            setActiveLightboxImageIndex((prevIndex) =>
              prevIndex !== images.length - 1 ? prevIndex + 1 : prevIndex
            )
          }
        />
      )}
      {isFetching && (
        <div className="loading">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Ajax-loader%282%29.gif" />
        </div>
      )}
    </>
  );
}

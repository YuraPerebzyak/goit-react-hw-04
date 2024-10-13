import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos, onImageClick }) => {
  return (
    <ul className={css.gallery_list}>
      {photos !== null &&
        photos.map((item) => {
          return (
            <li className={css.gallery_item} key={item.id}>
              <ImageCard
                onClick={() => onImageClick(item.urls.regular)}
                src={item.urls.small}
                alt={item.alt_description}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;

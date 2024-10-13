import css from "./ImageCard.module.css";
const ImageCard = ({ src, alt, onClick }) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <img className={css.gallery_img} src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;

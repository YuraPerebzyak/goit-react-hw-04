import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={css.load_more_btn} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;

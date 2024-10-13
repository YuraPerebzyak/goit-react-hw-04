import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const accessKey = "1DvPss355r_LZTDZabo9wiowWQ8qvJCxVx-qtJManhw";

  const getPhotos = async (query, page = 1) => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}`;
    try {
      setIsLoading(true);
      const { data } = await axios.get(url, {
        headers: { Authorization: `Client-ID ${accessKey}` },
      });
      setTotalPages(data.total_pages);
      if (page === 1) {
        setPhotos(data.results);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (searchText) => {
    setQuery(searchText);
    setPage(1);
    getPhotos(searchText);
  };
  const loadMorePhotos = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getPhotos(query, nextPage);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (page > 1) {
      console.log("Scrolling page");
      window.scrollBy({
        top: window.innerHeight / 2,
        behavior: "smooth",
      });
    }
  }, [page]);

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage error={error} />}
      <ImageGallery photos={photos} onImageClick={openModal} />
      {page < totalPages && !isLoading && (
        <LoadMoreBtn onClick={loadMorePhotos} />
      )}
      {isLoading && <Loader />}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageUrl={selectedImage}
      />
    </>
  );
}

export default App;

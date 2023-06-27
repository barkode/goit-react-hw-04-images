import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Api } from 'components/Utils/Api';
import { AppContainer } from './App.styled';

const apiService = new Api();

export const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchRequest) return;

    const fetchGalleryItems = (query, page) => {
      setLoading(true);

      apiService.query = query;
      apiService.page = page;

      apiService
        .fetchPost()
        .then(data => {
          const newData = data.hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id,
              tags,
              webformatURL,
              largeImageURL,
            })
          );

          setGalleryItems(prevGalleryItems => [
            ...prevGalleryItems,
            ...newData,
          ]);
          setTotalHits(data.totalHits);

          if (!data.totalHits) {
            setError(true);

            return toast.warn(
              '🦄 Sorry, there are no images matching your search query. Please try again.'
            );
          }

          if (page === 1) {
            toast.success(`🦄 Hooray! We found ${data.total} images.`);
          }
        })
        .catch(error => {
          toast.error(error.message);
          setError(true);
          setGalleryItems([]);
          setTotalHits(0);
          setGalleryPage(1);
        })
        .finally(() => setLoading(false));
    };

    fetchGalleryItems(searchRequest, galleryPage);
  }, [searchRequest, galleryPage]);

  const handleFormSubmit = searchQuery => {
    setSearchRequest('');
    setGalleryItems([]);
    setTotalHits(0);
    setGalleryPage(1);
    setError(false);

    setSearchRequest(searchQuery);
  };

  const onLoadMore = () => {
    setGalleryPage(prevGalleryPage => prevGalleryPage + 1);
  };

  return (
    <AppContainer>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <Searchbar>
        <SearchForm onSubmit={handleFormSubmit} />
      </Searchbar>

      {!error && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {galleryItems.length !== 0 && galleryItems.length < totalHits && (
        <Button onClick={onLoadMore} />
      )}
    </AppContainer>
  );
};

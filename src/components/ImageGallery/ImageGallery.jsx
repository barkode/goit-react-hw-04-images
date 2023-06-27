import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ galleryItems }) => {
  return (
    <Gallery>
      {galleryItems.map(({ id, largeImageURL, tags, webformatURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            largeImageURL={largeImageURL}
            tags={tags}
            webformatURL={webformatURL}
          />
        );
      })}
    </Gallery>
  );
};

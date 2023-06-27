import { LoaderPicture } from './Loader.styled';
import RiseLoader from 'react-spinners/RiseLoader';

export const Loader = () => {
  return (
    <LoaderPicture>
      <RiseLoader color="#3f51b5" margin={5} size={40} speedMultiplier={2} />
    </LoaderPicture>
  );
};

import { Blocks } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <Blocks
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </LoaderContainer>
  );
};

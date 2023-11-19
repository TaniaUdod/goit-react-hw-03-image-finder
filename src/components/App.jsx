import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'api/image';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Notify } from 'notiflix';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    error: '',
    totalPages: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, currentPage } = this.state;
    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.handleImages(query, currentPage);
    }
  }

  handleImages = async () => {
    const { query, currentPage } = this.state;

    try {
      this.setState({ isLoading: true });
      const data = await getImages(query, currentPage);

      if (!data.hits.length) {
        Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        this.setState({ isLoading: false });
        return;
      }

      if (currentPage === 1) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isLoading: false,
        error: '',
        totalPages: currentPage < Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  handleSubmit = query => {
    this.setState({
      images: [],
      currentPage: 1,
      query: query,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, isLoading, totalPages, currentPage } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
      </AppContainer>
    );
  }
}

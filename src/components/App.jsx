import { Component } from 'react';
import { getImages } from 'api/image';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Notify } from 'notiflix';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    error: '',
    isLoadMore: false,
    url: '',
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
        this.setState({ isLoading: false, isLoadMore: false });
        return;
      }

      if (currentPage === 1) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        isLoading: false,
        error: '',
        isLoadMore: currentPage < Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }

    this.setState({
      images: [],
      currentPage: 1,
      query: query,
    });
  };

  openModal = url => {
    this.setState({ url });
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, isLoading, isLoadMore, url, error } = this.state;
    return (
      <AppContainer>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {url && <Modal closeModal={this.openModal} url={url} />}
        {isLoadMore && <Button onClick={this.loadMore} />}
        {error && (
          <p style={{ textAlign: 'center', margin: 'auto' }}>
            Sorry. {error} 😭
          </p>
        )}
      </AppContainer>
    );
  }
}

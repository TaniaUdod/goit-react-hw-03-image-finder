import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages, newData } from 'api/image';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

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
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.handleImages(this.state.query, this.state.currentPage);
    }
  }

  handleImages = async () => {
    const { query, currentPage } = this.state;
    try {
      this.setState({ isLoading: true });
      const data = await getImages(query, currentPage);
      const newImages = newData(data.hits);

      this.setState(state => ({
        images: [...state.images, ...newImages],
        isLoading: false,
        error: '',
        totalPages: Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.response.data, isLoading: false });
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
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {images.length > 0 && totalPages !== currentPage && !isLoading && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}

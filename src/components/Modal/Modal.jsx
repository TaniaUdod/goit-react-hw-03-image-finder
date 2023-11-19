import { Component } from 'react';
import { ModalContainer, Overlay } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = event => {
    if (event.code === 'Escape' || event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <Overlay onClick={this.handleKeydown}>
        <ModalContainer>
          <img src={largeImageURL} alt={tags} />
        </ModalContainer>
      </Overlay>
    );
  }
}

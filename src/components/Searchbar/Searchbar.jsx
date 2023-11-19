import { Component } from 'react';
import {
  Button,
  Form,
  Input,
  SearchbarContainer,
  Span,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({ query: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <header>
          <Form onSubmit={this.handleSubmit}>
            <Button type="submit">
              <Span>Search</Span>
            </Button>

            <Input
              type="text"
              name="query"
              value={this.state.query}
              onChange={this.handleInputChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              required
            />
          </Form>
        </header>
      </SearchbarContainer>
    );
  }
}

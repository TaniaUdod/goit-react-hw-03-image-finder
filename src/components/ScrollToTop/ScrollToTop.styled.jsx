import styled from 'styled-components';
import ScrollToTop from 'react-scroll-to-top';

export const ScrollUpButton = styled(ScrollToTop)`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.8);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(255, 255, 255, 0.6);

  &:hover {
    transform: scale(1.24);
    background-color: #ffffff;
  }
`;

import { Btn } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <div>
      <Btn type="button" onClick={onClick}>
        Load more
      </Btn>
    </div>
  );
};

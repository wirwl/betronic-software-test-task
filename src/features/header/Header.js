import './Header.scss';
import Title from '../title/Title';
import Button from '../button/Button';
import block from 'bem-cn';

const b = block('header');

export default function Header(props) {
  const {
    titleText,
    buttonText,
    link,
    isButtonDisabled = false,
    theme
  } = props;
  return (
    <header className={b()}>
      <Title text={titleText} />
      <Button theme={theme} isDisabled={isButtonDisabled} link={link} text={buttonText} />
    </header>
  );
}
import './Title.scss';
import logo from '../../logo.svg';
import block from 'bem-cn';

const b = block('title');

export default function Title(props) {
  return (
    <div className={b()}>
      <img className={b('image')} src={logo} alt="title" width="30px" height="30px" />
      <span className={b('text')}>{props.text}</span>
    </div>
  );
}
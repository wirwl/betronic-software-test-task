import './NodeInfoTable.scss';
import block from 'bem-cn';
import Button from '../button/Button';
import { removeNode } from '../../AppSlice';
import { useDispatch } from 'react-redux';

const b = block('node-info-table');

export default function NodeInfoTable(props) {
  const {
    items,
    buttonText = 'Remove node',
    link,
    fullRoute,
    isButtonDisabled = false,
    theme
  } = props;

  const dispatch = useDispatch();

  const handleButtonRemoveNodeClick = () => {
    dispatch(removeNode({ fullRoute }));
  }

  return (
    <div className={b()}>
      <ul className={b('items')}>
        {items.map((item, index) => {
          return (
            <li className={b('item')} key={index}>
              <h3 className={b('header')}>{item.header}</h3>
              <span className={b('value')}>{item.value}</span>
            </li>
          );
        })}
      </ul>
      <Button theme={theme} isDisabled={isButtonDisabled} link={link} className={b('button-remove-node')} text={buttonText} onClick={handleButtonRemoveNodeClick} />
    </div>
  );
}
import './ChildNodesList.scss';
import block from 'bem-cn';
import { Link } from 'react-router-dom';

const b = block('child-nodes-list');

export default function ChildNodesList(props) {
  const { title = 'List of child nodes', items, fullRoute } = props;
  return (
    <div className={b()}>
      <h3 className={b('title')}>{title}</h3>
      <ul className={b('items')}>
        {items.length ? items.map((item, index) => {
          const route = fullRoute === '/' ? item.route : fullRoute + item.route;
          return (
            <li className={b('item')} key={index}>
              <Link className={b('link')} to={route}>{item.title}</Link>
            </li>
          );
        }) : <li className={b('empty')}>&gt;empty&lt;</li>
        }
      </ul>
    </div>
  );
}
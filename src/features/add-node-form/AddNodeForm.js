import './AddNodeForm.scss';
import block from 'bem-cn';
import Button from '../button/Button';
import { addNode } from '../../AppSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTheme } from '../../theme';

const b = block('add-node-form');

export default function AddNodeForm(props) {
  const {
    fullRoute,
    theme
  } = props;
  const routes = fullRoute.substring(1).split('/');
  const tree = useSelector(state => state.app);
  const dispatch = useDispatch();
  const [route, setRoute] = useState('');
  const [title, setTitle] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isRouteAlreadyExists, setIsRouteAlreadyExists] = useState(false);
  const themeClass = getTheme(theme);

  const checkIsRouteAlreadyExists = (nodes, newRoute, index = 1) => {
    let isExists = false;
    const currentRoute = routes[index];
    for (let i = 0; i < nodes.length; i++) {
      const isEqualRoutes = nodes[i].route.substring(1) === currentRoute;
      const isRouteisRoot = routes.length === 1;
      const array = isRouteisRoot ? nodes : nodes[i].nodes
      if (isEqualRoutes || isRouteisRoot) {
        index += 1;
        if (index >= routes.length) {
          for (let t = 0; t < array.length; t++) {
            if (newRoute === array[t].route) {
              isExists = true;
              break;
            }
          }
          break;
        } else
          isExists = checkIsRouteAlreadyExists(nodes[i].nodes, newRoute, index);
      }
    }
    return isExists;
  }

  const handleAddNodeFormSubmit = (e) => {
    let normalizeRoute = route[0] === '/' ? route : `/${route}`;
    let createdTitle = title;
    if (title.length === 0)
      createdTitle = `${normalizeRoute[1].toLocaleUpperCase()}${normalizeRoute.substring(2)}`;
    const isExists = checkIsRouteAlreadyExists(tree.nodes, normalizeRoute);
    if (!isExists) {
      dispatch(addNode({
        fullRoute,
        newNode: {
          route: normalizeRoute,
          nodes: [],
          title: createdTitle
        }
      }));
    } else { setIsRouteAlreadyExists(true); e.preventDefault(); }
  }

  const handleRouteInputChange = (e) => {
    let value = e.target.value.trim();
    if (value.length > 0 && value !== '/') {
      setRoute(value);
      setIsButtonDisabled(false);
    } else setIsButtonDisabled(true);
    if (isRouteAlreadyExists)
      setIsRouteAlreadyExists(false);
  }

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value.trim());
  }

  return (
    <form className={b({ theme: themeClass })} id="addNodeForm" onSubmit={handleAddNodeFormSubmit}>
      <label className={b('route')}>
        <span className={b('caption')}>Route</span>
        <input className={b('route-input')} onChange={handleRouteInputChange} type='text' placeholder='type node route' />
      </label>
      <label className={b('title')}>
        <span className={b('caption')}>Title</span>
        <input className={b('title-input')} onChange={handleTitleInputChange} type='text' placeholder='type node title' />
      </label>
      <div className={b('error-already-exists', { show: isRouteAlreadyExists })}>{'This route already exists!'}</div>
      <div className={b('submit-button')}>
        <Button theme={theme} isDisabled={isButtonDisabled} type="submit" text={'Add new node'} />
      </div>
    </form>
  );
}

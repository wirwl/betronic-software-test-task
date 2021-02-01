import React from 'react';
import Header from './features/header/Header';
import './App.scss';
import block from 'bem-cn';
import NodeInfoTable from './features/node-info-table/NodeInfoTable';
import AddNodeForm from './features/add-node-form/AddNodeForm';
import ChildNodesList from './features/child-nodes-list/ChildNodesList';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { THEMES } from './theme';

const b = block('app');

function App(props) {
  const tree = useSelector(state => state.app);
  const route = props.location.pathname;
  const routes = route.substring(1).split('/');
  const isRootRoute = route === '/main';

  const { vkontakte, whatsapp, gitlab } = THEMES;

  const getNodeFromRoute = (node, routes, index = 1) => {
    let nodeByRoute = { route: 'not found', nodes: [], title: 'route not found' };
    if (index === routes.length) {
      nodeByRoute = node;
    }
    else {
      const currentRoute = routes[index];
      for (let i = 0; i < node.nodes.length; i++) {
        if (node.nodes[i].route.substring(1) === currentRoute) {
          index += 1;
          if (index === routes.length) {
            nodeByRoute = node.nodes[i];
            break;
          } else nodeByRoute = getNodeFromRoute(node.nodes[i], routes, index);
        }
      }
    }
    return nodeByRoute;
  };

  const getParentRoute = (route) => {
    const index = route.lastIndexOf('/');
    return index === 0 ? '/' : route.substring(0, index);
  };

  const nodeForDisplay = getNodeFromRoute(tree, routes);
  const childNodesCount = nodeForDisplay.nodes.length;
  const parentRoute = getParentRoute(route);

  const getTheme = (childNodesCount) => {
    if (childNodesCount === 0) return vkontakte;
    if (childNodesCount === 1) return whatsapp;
    if (childNodesCount >= 2) return gitlab;
  }

  const theme = getTheme(childNodesCount);

  return (
    route === '/' ? <Redirect to={tree.route} /> :
      <div className={b()}>
        <div className={b('item')}>
          <Header theme={theme} isButtonDisabled={isRootRoute} link={parentRoute} titleText={nodeForDisplay.title} buttonText={'Go to parent node'} />
        </div>
        <main className={b('main-content')}>
          <div className={b('item')}>
            <NodeInfoTable theme={theme} isButtonDisabled={isRootRoute} fullRoute={route} link={parentRoute} items={[
              { header: 'Route', value: nodeForDisplay.route },
              { header: 'Title', value: nodeForDisplay.title },
              { header: 'Amount nodes', value: childNodesCount }
            ]} />
          </div>
          <div className={b('item')}>
            <AddNodeForm theme={theme} fullRoute={route} />
          </div>
          <div className={b('item')}>
            <ChildNodesList fullRoute={route} items={nodeForDisplay.nodes} />
          </div>
        </main>
      </div>
  );
}

export default withRouter(App);

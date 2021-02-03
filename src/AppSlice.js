import { createSlice } from '@reduxjs/toolkit';
import { deepCopy } from './utils';
import { initialReduxState } from './defaults'

let initialState = sessionStorage.getItem('app');
initialState = initialState ? JSON.parse(initialState) : initialReduxState;

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    addNode: (state, action) => {
      const { fullRoute, newNode } = action.payload;
      const newState = deepCopy(state);
      const routes = fullRoute.substring(1).split('/');

      const addNodeToTree = (node, routes, newNode, index = 1) => {
        if (index === routes.length) {
          node.nodes.push(newNode);
        }
        else {
          const currentRoute = routes[index];
          for (let i = 0; i < node.nodes.length; i++) {
            if (node.nodes[i].route.substring(1) === currentRoute) {
              index += 1;
              addNodeToTree(node.nodes[i], routes, newNode, index);
            }
          }

        }
      };
      addNodeToTree(newState, routes, newNode);
      return newState;
    },
    removeNode: (state, action) => {
      const { fullRoute } = action.payload;
      const newState = deepCopy(state);
      const routes = fullRoute.substring(1).split('/');

      const removeNodeFromTree = (node, routes, index = 1) => {
        const currentRoute = routes[index];
        for (let i = 0; i < node.nodes.length; i++) {
          if (node.nodes[i].route.substring(1) === currentRoute) {
            if (index === routes.length - 1) {
              const children = node.nodes[i].nodes;
              node.nodes.splice(i, 1, ...children);
            } else {
              index += 1;
              removeNodeFromTree(node.nodes[i], routes, index);
            }
          }
        }
      };
      removeNodeFromTree(newState, routes);
      return newState;
    },
  },
});

export const { addNode, removeNode } = appSlice.actions;
export default appSlice.reducer;

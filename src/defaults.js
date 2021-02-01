export const initialReduxState = {
  route: '/main',
  nodes: [],
  title: 'Main'
};

export const initialReduxStateForTesting = {
  route: '/main',
  nodes: [
    {
      route: '/node1', nodes: [
        {
          route: '/node1-2-1', nodes: [
            { route: '/node1-2-1-1', nodes: [], title: 'Node1-2-1-1' },
          ], title: 'Node1-2-1'
        },
        { route: '/node1-2-2', nodes: [], title: 'Node1-2-2' }
      ], title: 'Node1'
    },
    { route: '/node2', nodes: [], title: 'Node2' }
  ],
  title: 'Main'
};
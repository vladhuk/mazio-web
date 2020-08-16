import React, { FunctionComponent } from 'react';
import Maze from '../Maze';

const App: FunctionComponent = () => {
  return <Maze size={{ height: 5, width: 5 }} walls={[]} cells={[]} />;
};

export default App;

import React from 'react';
import './App.scss';

import { useAppSelector } from './redux/store'

function App() {

  const state = useAppSelector((state) => state)

  console.log("STATE", state)

  return (
    <div className="App">
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;

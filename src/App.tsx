import { useDataFeed } from './utils/datafeed';

import './App.scss';

function App() {
  const { connected } = useDataFeed();

  console.log(connected, '>>>>>>>', process.env);

  return (
    <div className="App">
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <pre>You are {connected ? 'now' : 'NOT'} connected</pre>
      </header>
    </div>
  );
}

export default App;

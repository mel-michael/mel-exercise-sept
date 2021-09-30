import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './redux/index';
import { Contract, EventType, FeedType } from './redux/orderbook/types';
import { update } from './redux/wsconnection/slice';
import { upsert } from './redux/orderbook/slice';
import { WS, initConnection } from './utils/ws';

import './App.scss';

const dataFeedUrl = process.env.REACT_APP_DATA_FEED;

const message: Contract = { event: EventType.SUBSCRIBE, feed: FeedType.book_ui_1, product_ids: ['PI_XBTUSD'] };

function App() {
  const dispatch = useAppDispatch();
  const { connected } = useAppSelector((state) => state.wsconnection);

  useEffect(() => {
    if (!connected && dataFeedUrl) {
      initConnection({
        url: dataFeedUrl,
        onOpen: () => {
          dispatch(update({ connected: true }));
        },
        onClose: () => {
          dispatch(update({ connected: false }));
        }
      });
    }
    if (connected) {
      WS.onmessage = (event) => {
        console.log(`[message] Data received from server`);
        const feeds = JSON.parse(event.data);
        if (feeds.asks || feeds.bids) {
          dispatch(upsert(feeds));
        }
      };
    }
  }, [connected, dispatch]);

  const sendMessage = () => {
    WS.send(JSON.stringify(message));
  };

  const unsubscribeMessage = () => {
    const msg: Contract = { ...message };
    msg.event = EventType.UNSUBSCRIBE;

    WS.send(JSON.stringify(msg));
  };

  return (
    <div className="App">
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <pre>You are {connected ? 'now' : 'NOT'} connected</pre>

        <button type="button" onClick={sendMessage}>
          Send message
        </button>
        <button type="button" onClick={unsubscribeMessage}>
          Unsubscribe Message
        </button>
      </header>
    </div>
  );
}

export default App;

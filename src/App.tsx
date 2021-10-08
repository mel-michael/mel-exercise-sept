import { useEffect } from 'react';

// components
import Trade from './pages/trade';

// store & types
import { upsert } from './redux/orderbook/slice';
import { update } from './redux/wsconnection/slice';
import { useAppDispatch, useAppSelector } from './redux';
import { Contract, EventType, FeedType } from './redux/orderbook/types';

// utils
import { WS, initConnection } from './utils/ws';

// styles
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
        <h3 className="py-3">
          Just Another Order Book App
        </h3>
        <pre>You are {connected ? 'now' : 'NOT'} connected</pre>

        <button type="button" onClick={sendMessage}>
          Send message
        </button>
        <button type="button" onClick={unsubscribeMessage}>
          Unsubscribe Message
        </button>
      </header>
      <Trade />
    </div>
  );
}

export default App;

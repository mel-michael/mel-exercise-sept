import { useEffect } from 'react';
import styled from 'styled-components';

// components
import Trade from './pages/trade';

// store & types
import { upsert } from './redux/orderbook/slice';
import { update } from './redux/wsconnection/slice';
import { useAppDispatch, useAppSelector } from './redux';
import { Contract, EventType, FeedType, Products } from './redux/orderbook/types';

// utils
import { WS, initConnection } from './utils/ws';

// styles
import './App.scss';

const ToggleDiv = styled.div`
  text-align: center;
  position: fixed;
  bottom: 0;
  padding: 1rem;
  width: 100%;
  border-top: 1px solid #333;
  background-color: #212121;
`;

const ToggleButton = styled.button`
  background-color: #ab62fa;
  color: white;
  border-radius: 4px;
  font-size: small;
  border: none;
  padding: 0.4rem 1rem;
  transition: background-color 0.5s ease-in-out;

  &:hover {
    background-color: #552e7e;
    transition: background-color 0.5s ease-in-out;
  }
`;

const dataFeedUrl = process.env.REACT_APP_DATA_FEED;

const message: Contract = {
  event: EventType.SUBSCRIBE,
  feed: FeedType.book_ui_1,
  product_ids: ['PI_XBTUSD']
};

function App() {
  const dispatch = useAppDispatch();
  const { activeProduct } = useAppSelector((state) => state.orderbook);
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
        console.log(`[message] Data received from server`, event.data);
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
  const toggleFeed = () => {
    unsubscribeMessage();
    const newProdId = activeProduct === 'PI_XBTUSD' ? 'PI_ETHUSD' : 'PI_XBTUSD';
    const msg: Contract = { ...message, product_ids: [newProdId] };
    WS.send(JSON.stringify(msg));
  };

  console.log('MES', activeProduct)

  const unsubscribeMessage = () => {
    const msg: Contract = { ...message, product_ids: [activeProduct] };
    msg.event = EventType.UNSUBSCRIBE;

    console.log('MES', msg)

    WS.send(JSON.stringify(msg));
  };

  return (
    <div className="App">
      <header>
        <h3 className="py-3">Just Another Order Book App</h3>
        <pre>You are {connected ? 'now' : 'NOT'} connected</pre>

        <button type="button" onClick={sendMessage}>
          Send message
        </button>
        <button type="button" onClick={unsubscribeMessage}>
          Unsubscribe Message
        </button>
      </header>
      <Trade />
      <ToggleDiv>
        <ToggleButton onClick={toggleFeed}>Toggle Feed</ToggleButton>
      </ToggleDiv>
    </div>
  );
}

export default App;

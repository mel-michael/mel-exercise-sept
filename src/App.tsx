import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// components
import Trade from './pages/trade';
import Modal from './components/Modal';

// store & types
import { upsert } from './redux/orderbook/slice';
import { update } from './redux/wsconnection/slice';
import { useAppDispatch, useAppSelector } from './redux';
import { Contract, EventType, FeedType } from './redux/orderbook/types';

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
  const appRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(true);
  const { connected } = useAppSelector((state) => state.wsconnection);
  const { activeProduct } = useAppSelector((state) => state.orderbook);

  const connectToOrderBook = (url: string) => {
    initConnection({
      url,
      onOpen: () => {
        dispatch(update({ connected: true }));
      },
      onClose: () => {
        dispatch(update({ connected: false }));
      }
    });
  };

  const disconnectOrderBook = () => {
    console.log(':::: DISCONNNECTED ::::');
    WS.close(1000, 'Disconnect');
    setShowModal(true);
  };

  useEffect(() => {
    if (connected) {
      WS.onmessage = (event) => {
        const feeds = JSON.parse(event.data);
        if (feeds.asks || feeds.bids) {
          dispatch(upsert(feeds));
        }
      };
    }
  }, [connected, dispatch]);

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (appRef.current && !document.hidden && connected) {
        disconnectOrderBook();
      }
    });
  }, [appRef, connected]);

  const sendMessage = () => {
    const msg: Contract = { ...message, product_ids: [activeProduct] };
    WS.send(JSON.stringify(msg));
  };

  const toggleFeed = () => {
    unsubscribeMessage();
    const newProdId = activeProduct === 'PI_XBTUSD' ? 'PI_ETHUSD' : 'PI_XBTUSD';
    const msg: Contract = { ...message, product_ids: [newProdId] };
    WS.send(JSON.stringify(msg));
  };

  console.log('MESSAGE', activeProduct);

  const unsubscribeMessage = () => {
    const msg: Contract = { ...message, product_ids: [activeProduct] };
    msg.event = EventType.UNSUBSCRIBE;

    console.log('MES', msg);

    WS.send(JSON.stringify(msg));
  };

  return (
    <>
      {showModal && (
        <Modal>
          <div className="text-center">
            <h3 className="py-3">Welcome</h3>
            <pre
              style={{ maxWidth: 400 }}
              className={`mx-auto p-2 alert ${connected ? 'alert-success' : 'alert-danger'}`}
            >
              You are {connected ? 'now' : 'NOT'} connected
            </pre>

            <div className="form-check form-switch my-3 d-flex justify-content-center">
              <input
                className="form-check-input me-2"
                type="checkbox"
                role="switch"
                id="connect"
                onChange={() => {
                  if (!connected && dataFeedUrl) {
                    connectToOrderBook(dataFeedUrl);
                  }
                  if (connected) {
                    disconnectOrderBook();
                  }
                }}
                checked={connected}
                style={{ cursor: 'pointer' }}
              />
              <label className="form-check-label" htmlFor="connect">
                Click to {connected ? 'Disconnect' : 'Connect'}
              </label>
            </div>

            <button
              type="button"
              disabled={!connected}
              className="btn btn-dark mt-2 mb-3"
              onClick={() => {
                setShowModal(false);
                sendMessage();
              }}
            >
              View Order Book
            </button>
          </div>
        </Modal>
      )}
      <div className="App" ref={appRef}>
        <h3 className="py-3">Just Another Order Book App</h3>
        <Trade />
        <ToggleDiv>
          <ToggleButton onClick={toggleFeed}>Toggle Feed</ToggleButton>
        </ToggleDiv>
      </div>
    </>
  );
}

export default App;

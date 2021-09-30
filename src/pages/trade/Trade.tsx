import React from 'react';
import styled from 'styled-components';

// stroe
import { useAppSelector } from '../../redux';

const Row = styled.div`
  display: flex;
  width: 100%;
  font-size: 0.8rem;

  & span {
    padding: 0.2rem 0.5rem;
    text-align: right;
    width: 100%;
  }
`;
const Header = styled(Row)`
  font-weight: bold;
  margin-top: 1rem;
  text-transform: uppercase;
  border-top: 1px solid #333;
  border-bottom: 1px solid #ccc;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Trade = (): JSX.Element => {
  const { asks, bids } = useAppSelector((state) => state.orderbook);
  return (
    <>
      <div>
        <span>Order Book</span>
        <span>Spread: 123</span>
      </div>
      <Container>
        <div style={{ width: '100%' }}>
          <Header>
            <span>Total</span>
            <span>Size</span>
            <span>Price</span>
          </Header>
          {asks.map(({ price, size, total }) => (
            <Row key={price}>
              <span>{total?.toLocaleString()}</span>
              <span>{size.toLocaleString()}</span>
              <span>{price.toLocaleString()}</span>
            </Row>
          ))}
        </div>
        <div style={{ width: '100%' }}>
          <Header>
            <span>Price</span>
            <span>Size</span>
            <span>Total</span>
          </Header>
          {bids.map(({ price, size, total }) => (
            <Row key={price}>
              <span>{price.toLocaleString()}</span>
              <span>{size.toLocaleString()}</span>
              <span>{total?.toLocaleString()}</span>
            </Row>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Trade;

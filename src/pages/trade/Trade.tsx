// store
import { useAppSelector } from '../../redux';

// styles
import { Row, Header, HeaderInfo, Container, Spread } from './Trade.styled';

const Trade = (): JSX.Element => {
  const isMobileScreen = window.matchMedia('(max-width: 480px)').matches;
  const { asks, bids, spread, spreadPercentage } = useAppSelector((state) => state.orderbook);
  const updatedAsks = isMobileScreen ? [...asks].reverse() : asks;

  return (
    <>
      <HeaderInfo>
        <span>Order Book</span>
        <span className="d-none d-sm-inline">
          Spread: {spread} ({spreadPercentage.toFixed(2)}%)
        </span>
      </HeaderInfo>
      <Container>
        <div className="w-100">
          <Header className="d-none d-md-flex">
            <span>Total</span>
            <span>Size</span>
            <span>Price</span>
          </Header>
          {bids.map(({ price, size, total }) => (
            <Row key={price}>
              <span className="bid d-inline d-sm-none">{price.toLocaleString()}</span>
              <span className="d-none d-md-inline">{total?.toLocaleString()}</span>
              <span>{size.toLocaleString()}</span>
              <span className="d-inline d-sm-none">{total?.toLocaleString()}</span>
              <span className="bid d-none d-md-inline">{price.toLocaleString()}</span>
            </Row>
          ))}
        </div>
        <div className="w-100">
          <Header>
            <span>Price</span>
            <span>Size</span>
            <span>Total</span>
          </Header>
          {updatedAsks.map(({ price, size, total }) => (
            <Row key={price}>
              <span className="ask">{price.toLocaleString()}</span>
              <span>{size.toLocaleString()}</span>
              <span>{total?.toLocaleString()}</span>
            </Row>
          ))}
          <Spread>
            Spread: {spread} ({spreadPercentage.toFixed(2)}%)
          </Spread>
        </div>
      </Container>
    </>
  );
};

export default Trade;

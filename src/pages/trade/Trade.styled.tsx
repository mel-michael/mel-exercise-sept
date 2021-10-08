import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  width: 100%;
  font-size: 0.8rem;

  & span {
    padding: 0.2rem 0.5rem;
    text-align: right;
    width: 100%;
    &.bid {
      color: #35be53;
    }
    &.ask {
      color: #e22336;
    }
  }
`;

export const Header = styled(Row)`
  font-weight: bold;
  margin-top: 1rem;
  color: #98a6af;
  text-transform: uppercase;
  border-top: 1px solid #464646;
  border-bottom: 1px solid #292929;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    & div {
      &:nth-of-type(2) {
        order: 1;
      }
      &:nth-of-type(1) {
        order: 2;
      }
    }
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  & span {
    padding: 0 1rem;
    color: #98a6af;
  }
`;

export const Spread = styled.p`
  display: none;
  color: #98a6af;
  font-size: 0.8rem;
  padding: 0.25rem 0;
  margin: 0.5rem 0;
  border-top: 1px solid #292929;
  border-bottom: 1px solid #292929;

  @media screen and (max-width: 480px) {
    display: block;
  }
`;

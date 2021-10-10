import { FC } from 'react';
import styled, { css } from 'styled-components';

export const MaskContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100%;
  overflow: auto;
  z-index: 1000;
  background: rgba(38, 35, 104, 0.82);
`;

const ModalContainer = styled.div<{ containerWidth?: number }>`
  position: relative;
  top: 10%;
  width: 60%;
  height: auto;
  max-width: 850px;
  background: white;
  margin: 0 auto;
  border-radius: 12px;
  overflow: auto;
  padding: 50px;

  @media screen and (max-width: 480px) {
    width: 92%;
    padding: 30px;
  }
`;

type ModalProps = {
  closeModal?: VoidFunction;
  containerWidth?: number;
};

const Modal: FC<ModalProps> = ({ children, containerWidth }) => (
  <MaskContainer>
    <ModalContainer containerWidth={containerWidth}>{children}</ModalContainer>
  </MaskContainer>
);

export default Modal;

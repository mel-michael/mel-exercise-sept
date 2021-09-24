export let WS: WebSocket;

type ConnectionProps = {
  url: string;
  onOpen: () => void;
  onClose: () => void;
};

export const initConnection = ({ url, onOpen, onClose }: ConnectionProps) => {
  if (!url) {
    throw new Error('Connection url not found');
  }

  WS = new WebSocket(url);

  WS.onopen = () => {
    onOpen();
  };

  WS.onclose = () => {
    onClose();
  };
};

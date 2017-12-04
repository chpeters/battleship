import { Socket } from 'phoenix'

export function configureChannel(tableCode) {
  const socket = new Socket('ws://127.0.0.1:4000/socket');
  socket.connect();
  const channel = socket.channel('table:' + tableCode);
  return channel
}
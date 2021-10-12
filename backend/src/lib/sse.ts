import { clients, SSEClient, SSE } from '../controller/sseController';

export function sendEventsToAll(event: SSE) {
  clients.forEach((c: SSEClient) => c.response.write(`${JSON.stringify(event)}\n\n`));
}

export function sendEventToUser(event: SSE) {
  clients.forEach((c: SSEClient) =>
    c.id === event.userId ? c.response.write(`${JSON.stringify(event)}\n\n`) : null,
  );
}

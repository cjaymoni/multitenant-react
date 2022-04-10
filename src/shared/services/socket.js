export const client = new WebSocket(
  `wss://196.43.196.108:3345/ws/${localStorage.user_id}`
);

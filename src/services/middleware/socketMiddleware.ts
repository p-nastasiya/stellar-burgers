// import { Middleware } from 'redux';
// import { refreshToken } from '@api';

// export const socketMiddleware = (): Middleware => {
//   return (store) => {
//     let socket: WebSocket | null = null;

//     return (next) => (action) => {
//       const { dispatch } = store;
//       const { type, payload } = action;

//       if (type === 'WS_CONNECT') {
//         socket = new WebSocket(payload);
//       }

//       if (socket) {
//         socket.onmessage = (event) => {
//           const data = JSON.parse(event.data);
//           dispatch({ type: 'WS_MESSAGE', payload: data });
//         };

//         socket.onclose = (event) => {
//           if (event.code !== 1000) {
//             refreshToken().then(() => {
//               dispatch({ type: 'WS_CONNECT', payload: payload });
//             });
//           }
//         };
//       }

//       next(action);
//     };
//   };
// };

const socketIOEmitterMiddleware = (socket) => () => (next) => (action) => {
  if (action.socket && action.socket.send && action.socket.send.channel) {
    let io = socket;
    if (action.socket.namespace) {
      io = io.of(action.socket.namespace);
    }
    if (action.socket.room) {
      io = io.to(action.socket.room);
    }
    io.emit(action.socket.send.channel, action.payload);
  }
  return next(action);
};

const socketIOSubscriberMiddleware = (socket) => ({ dispatch }) => (next) => (
  action
) => {
  if (action.socket) {
    const {
      socket: { subscribe, unsubscribe, handle },
    } = action;
    if (subscribe) {
      const { event, responseType } = subscribe;
      if (event && handle) {
        socket.on(event, handle);
      } else if (event && responseType) {
        socket.on(event, (socketResponse) => {
          dispatch({ type: responseType, payload: socketResponse });
        });
      }
    }
    if (unsubscribe) {
      const { event } = unsubscribe;

      socket.removeListener(event);
    }
  }

  return next(action);
};

module.exports = {
  socketIOEmitterMiddleware,
  socketIOSubscriberMiddleware,
};

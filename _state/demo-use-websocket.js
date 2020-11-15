import {useRef, useMemo} from "react"
import ReactDOM from "react-dom"

import {useWebSocket} from 'ahooks';

let ReadyState;
(function (ReadyState) {
  ReadyState[(ReadyState.Connecting = 0)] = 'Connecting';
  ReadyState[(ReadyState.Open = 1)] = 'Open';
  ReadyState[(ReadyState.Closing = 2)] = 'Closing';
  ReadyState[(ReadyState.Closed = 3)] = 'Closed';
})(ReadyState || (ReadyState = {}));


const App = () => {
  const messageHistory = useRef([]);
  const {readyState, sendMessage, latestMessage, disconnect, connect} = useWebSocket(
    'wss://echo.websocket.org',
  );
  messageHistory.current = useMemo(() => messageHistory.current.concat(latestMessage), [
    latestMessage,
  ]);
  return (
    <div>
      {/* send message */}
      <button
        onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
        disabled={readyState !== ReadyState.Open}
        style={{
          marginRight: 8,
        }}
      >
        ✉️ send
      </button>
      {/* disconnect */}
      <button
        onClick={() => disconnect && disconnect()}
        disabled={readyState !== ReadyState.Open}
        style={{
          marginRight: 8,
        }}
      >
        ❌ disconnect
      </button>
      {/* connect */}
      <button onClick={() => connect && connect()} disabled={readyState === ReadyState.Open}>
        📞 connect
      </button>
      <div
        style={{
          marginTop: 8,
        }}
      >
        readyState: {readyState}
      </div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        <p>received message: </p>
        {messageHistory.current.map((message, index) => (
          <p key={index}>{message?.data}</p>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, mountNode);


import ReactDOM from "react-dom"
import React, { useState } from 'react';
import { useInterval } from 'ahooks';

function onChange(time, timeString) {
  console.log(time, timeString);
}

const App = () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <div>count: {count}</div>;
};

ReactDOM.render(<App />, mountNode);


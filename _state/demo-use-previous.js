import {useState} from "react"
import ReactDOM from "react-dom"

import {usePrevious} from 'ahooks';

const nameCompareFunction = (prev, next) => {
  if (!prev) {
    return true;
  }
  if (prev.name !== next.name) {
    return true;
  }
  return false;
};
const jobCompareFunction = (prev, next) => {
  if (!prev) {
    return true;
  }
  if (prev.job !== next.job) {
    return true;
  }
  return false;
};
const App = () => {
  const [state, setState] = useState({
    name: 'Jack',
    job: 'student',
  });
  const [nameInput, setNameInput] = useState('');
  const [jobInput, setJobInput] = useState('');
  const previousName = usePrevious(state, nameCompareFunction);
  const previousJob = usePrevious(state, jobCompareFunction);
  return (
    <>
      <div
        style={{
          margin: '8px 0',
          border: '1px solid #e8e8e8',
          padding: 8,
        }}
      >
        <div>current name: {state.name}</div>
        <div>current job: {state.job}</div>
      </div>
      <div>previous name: {(previousName || {}).name}</div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        previous job: {(previousJob || {}).job}
      </div>
      <div
        style={{
          marginTop: '16px',
        }}
      >
        <input
          style={{
            width: 220,
          }}
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          placeholder="new name"
        />
        <button
          type="button"
          onClick={() => {
            setState(s => ({...s, name: nameInput}));
          }}
          style={{
            marginLeft: 16,
          }}
        >
          update
        </button>
      </div>
      <div
        style={{
          marginTop: '16px',
        }}
      >
        <input
          style={{
            width: 220,
          }}
          value={jobInput}
          onChange={e => setJobInput(e.target.value)}
          placeholder="new job"
        />
        <button
          type="button"
          onClick={() => {
            setState(s => ({...s, job: jobInput}));
          }}
          style={{
            marginLeft: 16,
          }}
        >
          update
        </button>
      </div>
    </>
  );
};

ReactDOM.render(<App/>, mountNode);


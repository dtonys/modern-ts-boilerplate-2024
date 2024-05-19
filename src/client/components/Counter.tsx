import React, { useState } from 'react';
import Button from '@mui/material/Button';

function Counter() {
  const [state, setState] = useState({
    count: 0,
  });

  const inc = () => {
    setState({ ...state, count: state.count + 1 });
  };

  const dec = () => {
    setState({ ...state, count: state.count - 1 });
  };

  return (
    <div>
      <Button variant="contained">Hello World</Button>
      {state.count}
      <button type="button" onClick={inc}>
        {' '}
        Inc{' '}
      </button>
      <button type="button" onClick={dec}>
        {' '}
        Dec{' '}
      </button>
      <button type="button" onClick={dec}>
        {' '}
        Dec{' '}
      </button>
    </div>
  );
}

export default Counter;

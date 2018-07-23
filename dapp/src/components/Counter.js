import React from 'react';

export const Counter = (props) => (
  <div style={{padding: '1em', margin: '1em', border: '1px solid black'}}>
    <h1>Counter: {props.count}</h1>
    <button onClick={() => props.handleAdd()}>Add</button>
    <button onClick={() => props.handleSub()}>Sub</button>
  </div>
); 
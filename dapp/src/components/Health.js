import React from 'react';

export const Health = (props) => (
  <div style={{padding: '1em', margin: '1em', border: '1px solid black'}}>
    <h1>Health</h1>
    <p>{props.health}</p>
    <button onClick={() => props.handleHealth()}>Health</button>
  </div>
); 